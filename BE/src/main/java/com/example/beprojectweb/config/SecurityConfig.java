package com.example.beprojectweb.config;

import com.example.beprojectweb.enums.Role;
import com.example.beprojectweb.service.CustomOAuth2UserService;
import com.example.beprojectweb.service.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${jwt.signerKey}")
    String signerKey;
    private String[] PUBLIC_ENDPOINTS = { "/categories", "/products", "/auth/**"};
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    @Order(1)
    public SecurityFilterChain publicResources(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/uploads/**")
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .sessionManagement(session -> session.disable());

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity, JwtAuthenticationConverter jwtAuthenticationConverter) throws Exception {
        // Cấu hình quyền truy cập api
        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/myInfo").hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/cart", "/cart-items", "/cart/user/**").hasRole(Role.USER.name())
                        .requestMatchers(HttpMethod.GET,"/users", "/users/**").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/categories", "/categories/**", "/products", "/products/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/users/**","/products/**" , "/categories/**").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/categories","/categories/**", "/products/**").permitAll()


                        .requestMatchers(HttpMethod.GET, "/api/keys/user/**").hasRole(Role.USER.name())
                        .requestMatchers("/api/keys/**").hasAnyRole("USER", "ADMIN")

                        .requestMatchers("/api/keys/**").hasRole(Role.USER.name())


                        .anyRequest().authenticated());

        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())));

        httpSecurity.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                        .userService((OAuth2UserService) customOAuth2UserService)

                        .userService(customOAuth2UserService)

                )
                .successHandler(oAuth2SuccessHandler)
        );

        httpSecurity.csrf(csrf -> csrf.disable());
        httpSecurity.cors(Customizer.withDefaults());
        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    JwtDecoder jwtDecoder(){
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");

        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

}
