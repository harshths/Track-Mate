package com.example.TrackMate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TrackMate.models.User;
import com.example.TrackMate.repo.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user){
        return userRepo.save(user);
    }

    public User loginUser(String email, String password){
        User user = userRepo.findByEmail(email);
        if(user != null && user.getPassword().equals(password)){
            return user;
        }

        return null;
    }

    public User getUserById(Long id){
        return userRepo.findById(id).orElse(null);
    }
}
