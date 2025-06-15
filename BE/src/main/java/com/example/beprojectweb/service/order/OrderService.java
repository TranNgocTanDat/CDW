package com.example.beprojectweb.service.order;

import com.example.beprojectweb.dto.response.order.OrderResponse;
import com.example.beprojectweb.dto.response.order.PaymentMethodResponse;
import com.example.beprojectweb.entity.*;
import com.example.beprojectweb.enums.OrderStatus;
import com.example.beprojectweb.enums.PaymentMethod;
import com.example.beprojectweb.mapper.OrderMapper;
import com.example.beprojectweb.repository.CartRepository;
import com.example.beprojectweb.repository.KeyRepository;
import com.example.beprojectweb.repository.OrderRepository;
import com.example.beprojectweb.repository.UserRepository;
import com.example.beprojectweb.service.EmailService;
import com.example.beprojectweb.service.cart.CartService;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {
    EmailService emailService;
    UserRepository userRepository;
    CartRepository cartRepository;
    OrderRepository orderRepository;
    CartService cartService;
    OrderMapper orderMapper;
    KeyRepository keyRepository;
    @PreAuthorize("hasRole('USER')")
    @Override
    public OrderResponse createOrder() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Tính tổng tiền
        BigDecimal totalPrice = cart.getCartItems().stream()
                .map(item -> {
                    System.out.println(">>> Sản phẩm: " + item.getProduct().getProductName()
                            + " | Giá: " + item.getProduct().getPrice());
                    return item.getProduct().getPrice();
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);



        Order order = Order.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .totalPrice(totalPrice)
                .build();

        Set<OrderItem> orderItems = cart.getCartItems().stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .totalPrice(product.getPrice())
                    .build();
        }).collect(Collectors.toSet());

        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        return orderMapper.toOrderResponse(savedOrder);
    }

    @PreAuthorize("hasRole('USER')")
    @Override
    public PaymentMethodResponse choosePaymentMethod(Long orderId, PaymentMethod method) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Can't choose payment method for non-pending order");
        }

        order.setPaymentMethod(method);
        orderRepository.save(order);

        return new PaymentMethodResponse(order.getId(), method);
    }

    @PreAuthorize("hasRole('USER')")
    @Override
    public OrderResponse confirmPayment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Order already paid or cancelled");
        }

        if (order.getPaymentMethod() == null) {
            throw new RuntimeException("Payment method not selected");
        }

        order.setStatus(OrderStatus.PAID);
        Order saved = orderRepository.save(order);

        // Tạo Key và gửi email cho từng game
        Set<OrderItem> orderItems = saved.getOrderItems();
        UUID userId = saved.getUser().getId();
        String userEmail = saved.getUser().getEmail();

        for (OrderItem item : orderItems) {
            String gameName = item.getProduct().getProductName();
            String hashKey = generateHashedKey(userId, gameName);

            Key newKey = Key.builder()
                    .userId(userId)
                    .gameName(gameName)
                    .gameKey(hashKey)
                    .build();

            keyRepository.save(newKey);

            // Gửi email chứa key
            String subject = "Your Game Key for " + gameName;
            String content = "<h3>Thank you for your purchase!</h3>" +
                    "<p><strong>Game:</strong> " + gameName + "</p>" +
                    "<p><strong>Key:</strong> <code>" + hashKey + "</code></p>" +
                    "<p>Enjoy your game 🎮!</p>";

            try {
                emailService.sendVerificationEmail(userEmail, subject, content);
            } catch (MessagingException e) {
                e.printStackTrace(); // Có thể log bằng logger thay vì print
            }
        }

        // Xoá giỏ hàng
        cartService.clearCart(saved.getUser().getCart().getId());

        return orderMapper.toOrderResponse(saved);
    }

    private String generateHashedKey(UUID userId, String gameName) {
        String raw = userId + "-" + gameName + "-" + System.nanoTime();
        return Integer.toHexString(raw.hashCode()); // Đơn giản, đủ dùng nếu không cần mã hóa mạnh
    }

    @Override
    public List<OrderResponse> getAllOrder() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toOrderResponse)
                .toList();
    }
}
