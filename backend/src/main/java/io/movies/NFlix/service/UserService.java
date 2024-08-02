package io.movies.NFlix.service;

import io.jsonwebtoken.Claims;
import io.movies.NFlix.entity.User;
import io.movies.NFlix.repository.UserRepository;
import io.movies.NFlix.response.Response;
import io.movies.NFlix.utils.JwtUtil;
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
    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<Response> registerUser(User user) {
        try {
            if (userRepo.findByUsername(user.getUsername()) != null) {
                Response response = Response.builder()
                        .message("Username already exists. Please try again")
                        .isSuccessful(false)
                        .build();

                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userRepo.save(user);
            Response response = Response.builder()
                    .message("User registered successfully")
                    .isSuccessful(true)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception error){
            Response response = Response.builder()
                    .message(error.getMessage())
                    .isSuccessful(false)
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public ResponseEntity<Response> loginUser(User user) {
        User fetchedUser = userRepo.findByUsername(user.getUsername());
        if (fetchedUser != null && passwordEncoder.matches(user.getPassword(), fetchedUser.getPassword())) {
            String jwtToken = jwtUtil.generateToken(user.getUsername());
            Response response = Response.builder()
                    .message("Login successful")
                    .isSuccessful(true)
                    .user(fetchedUser)
                    .jwtToken(jwtToken)
                    .build();

            return ResponseEntity.ok(response);
        }
        Response response = Response.builder()
                .message("Invalid username or password")
                .isSuccessful(false)
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public ResponseEntity<Response> verifyJwt(String jwtToken) {
        if (jwtUtil.validateToken(jwtToken)) {
            Claims claims = jwtUtil.extractClaims(jwtToken);
            String username = claims.getSubject();
            User user = userRepo.findByUsername(username);
            if (user != null) {
                Response response = Response.builder()
                        .message("JWT token valid")
                        .isSuccessful(true)
                        .build();

                return ResponseEntity.ok(response);
            } else {
                Response response = Response.builder()
                        .message("User not found")
                        .isSuccessful(false)
                        .build();

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } else {
            Response response = Response.builder()
                    .message("JWT token invalid or expired")
                    .isSuccessful(false)
                    .build();

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    public ResponseEntity<Response> refreshJwt(String oldJwtToken) {
        if (jwtUtil.validateToken(oldJwtToken)) {
            String newJwtToken = jwtUtil.refreshToken(oldJwtToken);
            Response response = Response.builder()
                    .message("JWT token valid")
                    .jwtToken(newJwtToken)
                    .isSuccessful(true)
                    .build();

            return ResponseEntity.ok(response);
        } else {
            Response response = Response.builder()
                    .message("JWT token invalid or expired")
                    .isSuccessful(false)
                    .build();

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
