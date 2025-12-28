package com.example.backend.controller;

import com.example.backend.entity.Dog;
import com.example.backend.service.DogService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class DogController {
    private final DogService dogService;

    public DogController(DogService dogService) {
        this.dogService = dogService;
    }

    @QueryMapping
    public Dog dogById(@Argument String id) {
        return dogService.getDogById(Long.parseLong(id));
    }
}
