package io.movies.NFlix.response;

import io.movies.NFlix.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response {
    private String message;
    private boolean isSuccessful;
    private User user;
    private String jwtToken;
}
