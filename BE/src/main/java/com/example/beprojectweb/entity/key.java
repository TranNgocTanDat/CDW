<<<<<<< HEAD
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
=======
package com.example.beprojectweb.entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode
public class key implements Serializable {
    UUID id;
    UUID userId;
    String gameName;
    String key;
>>>>>>> 69320252706cb84eef3f4666440b8312055c7ba3
}