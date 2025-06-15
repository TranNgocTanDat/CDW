package com.example.beprojectweb.dto.response;

import com.example.beprojectweb.entity.Cart;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    UUID id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String avatarUrl;
    String verificationCode;
    LocalDateTime verificationCodeExpireAt;
    LocalDate dob;
    Set<String> roles;

}
