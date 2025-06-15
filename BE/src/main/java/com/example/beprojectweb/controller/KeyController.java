package com.example.beprojectweb.controller;

import com.example.beprojectweb.dto.response.key.KeyResponse;
import com.example.beprojectweb.service.key.IKeyService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/keys")
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class KeyController {

    final IKeyService keyService;

    // Endpoint lấy danh sách key của user theo userId
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<KeyResponse>> getKeysByUserId(@PathVariable Long userId) {
        List<KeyResponse> keys = keyService.getKeysByUserId(userId);
        return ResponseEntity.ok(keys);
    }

    // Endpoint lấy tất cả keys (chỉ admin được truy cập)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<KeyResponse>> getAllKeys() {
        return ResponseEntity.ok(keyService.getAllKeys());
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkKey(@RequestParam("key") String key) {
        boolean exists = keyService.checkGameKey(key);
        return ResponseEntity.ok(exists);
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Giả sử userId được lưu trong claim "userId" của JWT
        // Phần này có thể thay đổi tùy cấu trúc token của bạn
        Object principal = authentication.getPrincipal();
        if (principal instanceof org.springframework.security.oauth2.jwt.Jwt jwt) {
            return Long.valueOf(jwt.getClaimAsString("userId"));
        }
        throw new RuntimeException("User ID not found in token");
    }
}
