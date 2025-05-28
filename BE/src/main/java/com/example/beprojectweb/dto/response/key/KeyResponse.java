package com.example.beprojectweb.dto.response.key;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class KeyResponse {
    private UUID id;
    private UUID userId;
    private String gameName;
    private String key;
}
