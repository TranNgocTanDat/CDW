package com.example.beprojectweb.service;

import com.example.beprojectweb.dto.request.product.ProductRequest;
import com.example.beprojectweb.dto.response.product.ProductResponse;
import com.example.beprojectweb.entity.Category;
import com.example.beprojectweb.entity.Product;
import com.example.beprojectweb.exception.AppException;
import com.example.beprojectweb.exception.ErrorCode;
import com.example.beprojectweb.mapper.ProductMapper;
import com.example.beprojectweb.mapper.UserMapper;
import com.example.beprojectweb.repository.CategoryRepository;
import com.example.beprojectweb.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryRepository categoryRepository;

    public ProductResponse createProduct(ProductRequest request) {
        if (request.getCate_ID() == null) {
            throw new IllegalArgumentException("Category ID must not be null");
        }

        Optional<Product> optionalProduct = productRepository.findByProductName(request.getProductName());

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setStock(existingProduct.getStock() + request.getStock());

            productMapper.updateProduct(existingProduct, request);
            Product savedProduct = productRepository.save(existingProduct);
            return productMapper.toProductResponse(savedProduct); // ✅ trả về ProductResponse
        }

        Category category = categoryRepository.findById(request.getCate_ID())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product newProduct = productMapper.toProduct(request);
        newProduct.setCategory(category);

        Product savedProduct = productRepository.save(newProduct);
        return productMapper.toProductResponse(savedProduct); // ✅ trả về ProductResponse
    }


    public List<ProductResponse> getAllProducts(){
        return productRepository.findAll()
                .stream()
                .map(product -> productMapper.toProductResponse(product))
                .toList();
    }

    public List<ProductResponse> getProducts(int limit, int offset) {
        List<Product> products = productRepository.findProductsWithLimitOffset(limit, offset);
        return products.stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    public List<ProductResponse> searchGames(String keyword) {
        return productRepository.findProductByProductNameContainingIgnoreCase(keyword)
                .stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return productMapper.toProductResponse(product);
    }

    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
        productRepository.deleteById(productId);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        // Tìm sản phẩm theo ID
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_EXISTED));

        // Kiểm tra tên sản phẩm có bị trùng với sản phẩm khác không (nếu cần)
        Optional<Product> productWithSameName = productRepository.findByProductName(request.getProductName());
        if (productWithSameName.isPresent() && !productWithSameName.get().getProductId().equals(id)) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED); // sản phẩm trùng tên với một cái khác
        }

        // Cập nhật thông tin
        productMapper.updateProduct(product, request); // Cập nhật vào object `product`
        Category category = categoryRepository.findById(request.getCate_ID())
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION));
        product.setCategory(category);
        productRepository.save(product);

        return productMapper.toProductResponse(product);
    }
}
