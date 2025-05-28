package com.example.beprojectweb.service.order;

import com.example.beprojectweb.dto.response.order.OrderResponse;
import com.example.beprojectweb.dto.response.order.PaymentMethodResponse;
import com.example.beprojectweb.entity.*;
import com.example.beprojectweb.enums.OrderStatus;
import com.example.beprojectweb.enums.PaymentMethod;
import com.example.beprojectweb.mapper.OrderMapper;
import com.example.beprojectweb.repository.CartRepository;
<<<<<<< HEAD
=======
import com.example.beprojectweb.repository.KeyRepository;
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
import com.example.beprojectweb.repository.OrderRepository;
import com.example.beprojectweb.repository.UserRepository;
import com.example.beprojectweb.service.cart.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
<<<<<<< HEAD
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
=======
import java.security.Key;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
<<<<<<< HEAD
public class OrderService implements IOrderService{
    UserRepository userRepository;
    CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final OrderMapper orderMapper;
=======
public class OrderService implements IOrderService {

    UserRepository userRepository;
    CartRepository cartRepository;
    OrderRepository orderRepository;
    CartService cartService;
    OrderMapper orderMapper;
    KeyRepository keyRepository;
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3

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

<<<<<<< HEAD
        // Tính tổng tiền
        BigDecimal totalPrice = cart.getCartItems().stream()
                .map(item -> {
                    System.out.println(">>> Sản phẩm: " + item.getProduct().getProductName()
                            + " | Giá: " + item.getProduct().getPrice());
                    return item.getProduct().getPrice();
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        // Tạo đơn hàng
=======
        BigDecimal totalPrice = cart.getCartItems().stream()
                .map(item -> item.getProduct().getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
        Order order = Order.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .totalPrice(totalPrice)
                .build();

<<<<<<< HEAD
        // Convert CartItem → OrderItem
=======
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
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

<<<<<<< HEAD
        // Clear cart
//        cartService.clearCart(user);

=======
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
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

<<<<<<< HEAD
        // Xoá giỏ hàng sau khi thanh toán
        cartService.clearCart(order.getUser().getCart().getId());
=======
        // Tạo key cho từng game
        Set<OrderItem> orderItems = saved.getOrderItems();
        UUID userId = saved.getUser().getId();

        for (OrderItem item : orderItems) {
            String gameName = item.getProduct().getProductName();
            String hashKey = generateHashedKey(userId, gameName);

            key newKey = key.builder()
                    .userId(userId)
                    .gameName(gameName)
                    .key(hashKey)
                    .build();

            keyRepository.save(newKey);
        }

        // Xoá giỏ hàng
        cartService.clearCart(saved.getUser().getCart().getId());
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3

        return orderMapper.toOrderResponse(saved);
    }

<<<<<<< HEAD
=======
    private String generateHashedKey(UUID userId, String gameName) {
        String raw = userId + "-" + gameName + "-" + System.nanoTime();
        return Integer.toHexString(raw.hashCode()); // Đơn giản, đủ dùng nếu không cần mã hóa mạnh
    }

>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
    @Override
    public List<OrderResponse> getAllOrder() {
        return orderRepository.findAll()
                .stream()
<<<<<<< HEAD
                .map(order -> orderMapper.toOrderResponse(order))
=======
                .map(orderMapper::toOrderResponse)
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
                .toList();
    }
}
