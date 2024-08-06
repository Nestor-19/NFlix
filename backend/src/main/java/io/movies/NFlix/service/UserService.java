package io.movies.NFlix.service;

import io.jsonwebtoken.Claims;
import io.movies.NFlix.entity.Movie;
import io.movies.NFlix.entity.User;
import io.movies.NFlix.repository.MovieRepository;
import io.movies.NFlix.repository.UserRepository;
import io.movies.NFlix.response.Response;
import io.movies.NFlix.response.ResponseUtil;
import io.movies.NFlix.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private MovieRepository movieRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<Response> registerUser(User user) {
            if (userRepo.findByUsername(user.getUsername()) != null) {
                return ResponseUtil.createResponse("Username already exists. Please try again", false, HttpStatus.CONFLICT);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setWatchList(new ArrayList<>());
            User createdUser = userRepo.save(user);

            return ResponseUtil.createResponse("User registered successfully", true, HttpStatus.CREATED);
    }

    public ResponseEntity<Response> loginUser(User user) {
        User fetchedUser = userRepo.findByUsername(user.getUsername());
        if (fetchedUser != null && passwordEncoder.matches(user.getPassword(), fetchedUser.getPassword())) {
            String jwtToken = jwtUtil.generateToken(user.getUsername());
            return ResponseUtil.createResponse("Login successful", true, HttpStatus.OK, fetchedUser, jwtToken);
        }

        return ResponseUtil.createResponse("Invalid username or password", false, HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<Response> verifyJwt(String jwtToken) {
        if (jwtUtil.validateToken(jwtToken)) {
            Claims claims = jwtUtil.extractClaims(jwtToken);
            String username = claims.getSubject();
            User user = userRepo.findByUsername(username);
            if (user != null) {
                return ResponseUtil.createResponse("JWT token valid", true, HttpStatus.OK);
            }
                return ResponseUtil.createResponse("User not found", false, HttpStatus.NOT_FOUND);
        }
            return ResponseUtil.createResponse("JWT token invalid or expired", false, HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<Response> refreshJwt(String oldJwtToken) {
        if (jwtUtil.validateToken(oldJwtToken)) {
            String newJwtToken = jwtUtil.refreshToken(oldJwtToken);
            return ResponseUtil.createResponse("JWT token valid", true, HttpStatus.OK, null, newJwtToken);
        }
        return ResponseUtil.createResponse("JWT token invalid or expired", false, HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<Response> addMovieToWatchList(String username, String jwtToken, String movieId) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            Response response = Response.builder()
                    .message("User not found")
                    .isSuccessful(false)
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (!jwtUtil.validateToken(jwtToken)) {
            Response response = Response.builder()
                    .message("JWT token invalid or expired")
                    .isSuccessful(false)
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Movie movie = movieRepo.findByImdbId(movieId).orElse(null);
        if (movie == null) {
            Response response = Response.builder()
                    .message("Movie not found")
                    .isSuccessful(false)
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        user.getWatchList().add(movieId);
        userRepo.save(user);

        Response response = Response.builder()
                .message("Movie added to watchlist")
                .isSuccessful(true)
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Response> getUserWatchList(String username, String jwtToken) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            Response response = Response.builder()
                    .message("User not found")
                    .isSuccessful(false)
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (!jwtUtil.validateToken(jwtToken)) {
            Response response = Response.builder()
                    .message("JWT token invalid or expired")
                    .isSuccessful(false)
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Response response = Response.builder()
                .message("Fetched watchList for " + username)
                .user(user)
                .isSuccessful(true)
                .build();
        return ResponseEntity.ok(response);
    }
}
