package io.movies.NFlix.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response {
    private String message;
    private boolean isSuccessful;
    private String user;
    private String jwtToken;
}
