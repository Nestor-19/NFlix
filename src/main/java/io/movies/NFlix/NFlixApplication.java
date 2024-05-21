package io.movies.NFlix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class NFlixApplication {

	public static void main(String[] args) {
		SpringApplication.run(NFlixApplication.class, args);
	}

	@GetMapping("/")
	public String apiRoot() {
		return "Hi, this is my first Spring boot API endpoint";
	}


}
