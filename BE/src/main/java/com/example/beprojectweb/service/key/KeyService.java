package com.example.beprojectweb.service.key;

import com.example.beprojectweb.dto.response.key.KeyResponse;
import com.example.beprojectweb.entity.Key;
import com.example.beprojectweb.repository.KeyRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class KeyService implements IKeyService {

    KeyRepository keyRepository;

    @PreAuthorize("hasRole('USER')")
    @Override
    public List<KeyResponse> getKeysByUserId(UUID userId) {
        List<Key> keys = keyRepository.findAll().stream()
                .filter(k -> k.getUserId().equals(userId))
                .sorted((a, b) -> b.getId().compareTo(a.getId())) // sắp xếp mới nhất trước
                .collect(Collectors.toList());

        return keys.stream()
                .map(Key -> new KeyResponse(Key.getId() , Key.getUserId(), Key.getGameName(), Key.getGameKey()))
                .collect(Collectors.toList());
    }
}