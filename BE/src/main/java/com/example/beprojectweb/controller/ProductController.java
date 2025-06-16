package com.example.beprojectweb.controller;

import com.example.beprojectweb.dto.request.product.ProductRequest;
import com.example.beprojectweb.dto.response.APIResponse;
import com.example.beprojectweb.dto.response.product.ProductResponse;
import com.example.beprojectweb.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @PostMapping
    public APIResponse<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        APIResponse apiResponse = new APIResponse<>();
        apiResponse.setResult(productService.createProduct(request));
        return apiResponse;
    }

    @GetMapping("/all")
    public APIResponse<List<ProductResponse>> getAllProducts() {
        return APIResponse.<List<ProductResponse>>builder()
                .result(productService.getAllProducts())
                .build();
    }

    @GetMapping
    public APIResponse<List<ProductResponse>> getProducts(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset) {

        if (limit == null) limit = 10;
        if (offset == null) offset = 0;

        return APIResponse.<List<ProductResponse>>builder()
                .result(productService.getProducts(limit, offset))
                .build();
    }

    @GetMapping("/search")
    public APIResponse<List<ProductResponse>> searchProducts(@RequestParam String keyword) {
        List<ProductResponse> result = productService.searchGames(keyword);
        return APIResponse.<List<ProductResponse>>builder()
                .result(productService.searchGames(keyword))
                .build();
    }

    @GetMapping("/{productId}")
    public APIResponse<ProductResponse> getProductById(@PathVariable Long productId) {
        return APIResponse.<ProductResponse>builder()
                .result(productService.getProductById(productId))
                .build();
    }

    @PutMapping("/{id}")
    public APIResponse<ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        return APIResponse.<ProductResponse>builder()
                .result(productService.updateProduct(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(new APIResponse(200, "Deleted successfully", null));
    }

}
