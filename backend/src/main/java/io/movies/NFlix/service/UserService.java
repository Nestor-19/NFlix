package io.movies.NFlix.service;

import io.movies.NFlix.entity.User;
import io.movies.NFlix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> registerUser(User user) {
        try {
            if (userRepo.findByUsername(user.getUsername()).isPresent()) {
                System.out.println("User already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists. Please try again");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userRepo.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception error){
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }
}
