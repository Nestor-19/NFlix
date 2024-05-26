package io.movies.NFlix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepo;

    public List<Movie> allMovies() {
        return movieRepo.findAll();
    }
}
