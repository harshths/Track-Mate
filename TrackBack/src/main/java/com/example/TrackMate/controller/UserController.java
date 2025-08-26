package com.example.TrackMate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TrackMate.models.User;
import com.example.TrackMate.repo.UserRepo;
import com.example.TrackMate.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    // api/users/register // register new user..
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // api/users/login // login user..
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.loginUser(user.getEmail(), user.getPassword());
    }

    // @GetMapping("/{id}")
    // public User getUser(@PathVariable Long id) {
    //     return userService.getUserById(id);
    // }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepo.findById(id).orElse(null);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

}
