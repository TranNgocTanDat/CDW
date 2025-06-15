package com.example.beprojectweb.service.key;

import com.example.beprojectweb.dto.response.key.KeyResponse;

import java.util.List;


public interface IKeyService {

    List<KeyResponse> getKeysByUserId(Long userId);

    List<KeyResponse> getAllKeys();

}
