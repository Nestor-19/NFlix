package io.movies.NFlix.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "users")
@Data
@Builder
public class User {
    @Id
    private String id;
    @Indexed
    private String username;
    private String password;
    @DocumentReference
    private List<Movie> watchList;
}
