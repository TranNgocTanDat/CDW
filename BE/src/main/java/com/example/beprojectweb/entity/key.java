package com.example.beprojectweb.entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode // 👉 Lombok sẽ tự generate equals() và hashCode()
public class key implements Serializable {
    Long id;
    Long userId;
    String key;
}