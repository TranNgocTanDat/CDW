package com.example.beprojectweb.repository;

import com.example.beprojectweb.entity.Order;
import com.example.beprojectweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
