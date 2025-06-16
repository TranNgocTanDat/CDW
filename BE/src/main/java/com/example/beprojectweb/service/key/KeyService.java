package com.example.beprojectweb.service.key;

import com.example.beprojectweb.dto.response.key.KeyResponse;
import com.example.beprojectweb.entity.Key;
import com.example.beprojectweb.repository.KeyRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class KeyService implements IKeyService {


    final KeyRepository keyRepository;

    @PreAuthorize("hasRole('USER')")
    @Override
    public List<KeyResponse> getKeysByUserId(Long userId) {

        List<Key> keys = keyRepository.findAll().stream()
                .filter(k -> k.getUserId().equals(userId))
                .sorted((a, b) -> b.getId().compareTo(a.getId())) // sắp xếp mới nhất trước
                .collect(Collectors.toList());

        return keys.stream()
                .map(key -> new KeyResponse(key.getId(), key.getUserId(), key.getGameName(), key.getGameKey()))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<KeyResponse> getAllKeys() {
        return keyRepository.findAll().stream()
                .sorted((a, b) -> b.getId().compareTo(a.getId())) // mới nhất trước
                .map(k -> new KeyResponse(k.getId(), k.getUserId(), k.getGameName(), k.getGameKey()))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public boolean checkGameKey(String inputKey) {
        if (inputKey == null) return false;
        return keyRepository.existsByGameKey(inputKey.trim());
    }
}

