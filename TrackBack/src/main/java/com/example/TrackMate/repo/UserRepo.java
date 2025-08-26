package com.example.TrackMate.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TrackMate.models.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
    User findByEmail(String email);
}
