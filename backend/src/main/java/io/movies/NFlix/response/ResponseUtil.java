package io.movies.NFlix.response;

import io.movies.NFlix.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {
    public static ResponseEntity<Response> createResponse(String message, boolean isSuccessful, HttpStatus status) {
        return createResponse(message, isSuccessful, status, null, null);
    }

    public static ResponseEntity<Response> createResponse(String message, boolean isSuccessful, HttpStatus status, User user) {
        return createResponse(message, isSuccessful, status, user, null);
    }

    public static ResponseEntity<Response> createResponse(String message, boolean isSuccessful, HttpStatus status, String jwtToken) {
        return createResponse(message, isSuccessful, status, null, jwtToken);
    }

    public static ResponseEntity<Response> createResponse(String message, boolean isSuccessful, HttpStatus status, User user, String jwtToken) {
        Response.ResponseBuilder responseBuilder = Response.builder()
                .message(message)
                .isSuccessful(isSuccessful);

        if (user != null) {
            responseBuilder.user(user);
        }

        if (jwtToken != null) {
            responseBuilder.jwtToken(jwtToken);
        }

        return ResponseEntity.status(status).body(responseBuilder.build());
    }
}
