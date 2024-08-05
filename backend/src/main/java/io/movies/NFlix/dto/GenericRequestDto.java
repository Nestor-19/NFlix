package io.movies.NFlix.dto;

import lombok.Data;

import java.util.Map;

@Data
public class GenericRequestDto {
    private String jwtToken;
    private Map<String, String> data;
}
