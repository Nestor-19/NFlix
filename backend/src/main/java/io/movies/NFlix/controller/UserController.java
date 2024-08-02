package io.movies.NFlix.controller;

import io.movies.NFlix.dto.JwtRequestDto;
import io.movies.NFlix.entity.User;
import io.movies.NFlix.response.Response;
import io.movies.NFlix.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @PostMapping("/verifyJWT")
    public ResponseEntity<Response> verifyJwt(@RequestBody JwtRequestDto jwtRequestDto) {
        return userService.verifyJwt(jwtRequestDto.getJwtToken());
    }

    @PostMapping("/refreshJWT")
    public ResponseEntity<Response> refreshJwt(@RequestBody JwtRequestDto jwtRequestDto) {
        return userService.refreshJwt(jwtRequestDto.getJwtToken());
    }
}
