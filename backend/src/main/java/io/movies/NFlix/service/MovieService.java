package io.movies.NFlix.service;

import io.movies.NFlix.entity.Movie;
import io.movies.NFlix.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepo;

    public List<Movie> allMovies() {
        return movieRepo.findAll();
    }

    public Optional<Movie> movie(String imdbId) {
        return movieRepo.findByImdbId(imdbId);
    }
}
