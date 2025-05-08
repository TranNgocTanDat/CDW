//package com.example.beprojectweb.service;
//
//import com.example.beprojectweb.dto.request.AuthenticationRequest;
//import com.example.beprojectweb.dto.response.AuthenticationResponse;
//import com.example.beprojectweb.entity.User;
//import com.example.beprojectweb.exception.AppException;
//import com.example.beprojectweb.exception.ErrorCode;
//import com.example.beprojectweb.repository.UserRepository;
//import com.nimbusds.jose.*;
//import com.nimbusds.jose.crypto.MACSigner;
//import com.nimbusds.jwt.JWTClaimsSet;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.experimental.NonFinal;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Date;
//
//@Service
//@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//public class AuthenticationService {
//    UserRepository userRepository;
//    PasswordEncoder passwordEncoder;
//
//    @NonFinal
//    @Value("${jwt.signerKey}")
//    protected String signerKey;
//
//    //check login
//    public AuthenticationResponse authenticate(AuthenticationRequest request){
//        //check user
//        var user = userRepository.findUsersByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTS));
//
//        //sử dụng matches để kiểm tra pass nhập vào đúng với pass trong db
//        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
//
//        //kiểm tra đăng nhập
//        if(!authenticated)
//            throw new AppException(ErrorCode.UNATHENTICATIED);
//        //sucess
//        var token = generateToken(user);
//
//        return AuthenticationResponse.builder()
//                .token(token)
//                .authenticated(true)
//                .build();
//
//    }
//
//    public String generateToken(User user){
//        //Create Header
//        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
//
//        //create Payload
//        //claim
//        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
//                .subject(user.getUsername()) //user login
//                .issuer("beproject")
//                .issueTime(new Date()) //thời gian tạo token
//                .expirationTime(new Date(
//                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
//                ))
//                .build();
//
//        //Payload
//        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
//
//        //JWSObject
//        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
//
//        //ký token
//        try {
//            jwsObject.sign(new MACSigner(signerKey.getBytes()));
//            return jwsObject.serialize();
//        } catch (JOSEException e) {
//
//            throw new RuntimeException(e);
//        }
//    }
//}
