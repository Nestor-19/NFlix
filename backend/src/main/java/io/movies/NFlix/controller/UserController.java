package io.movies.NFlix.controller;

import io.movies.NFlix.entity.User;
import io.movies.NFlix.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class UserController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists. Please try again");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception error){
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }


}
