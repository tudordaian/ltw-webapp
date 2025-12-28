package com.example.backend.controller;

import com.example.backend.entity.Dog;
import com.example.backend.service.DogService;
import com.example.backend.types.DogBreed;
import com.example.backend.types.DogInput;
import com.example.backend.types.DogPage;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

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

    @QueryMapping
    public List<Dog> allDogs() {
        return dogService.getAllDogs();
    }

    @QueryMapping
    public List<Dog> dogsByBreed(@Argument DogBreed breed) {
        return dogService.getDogsByBreed(breed);
    }

    @QueryMapping
    public List<Dog> dogsByColor(@Argument String color) { return dogService.getDogsByColor(color); }

    @QueryMapping
    public List<Dog> dogsWithOwners() {
        return dogService.getDogsWithOwners();
    }

    @QueryMapping
    public DogPage dogsPaginated(@Argument int page, @Argument int size) {
        Page<Dog> dogPage = dogService.getDogsPaginated(page, size);
        return new DogPage(
                dogPage.getContent(),
                (int) dogPage.getTotalElements(),
                dogPage.getTotalPages(),
                dogPage.getNumber(),
                dogPage.getSize()
        );
    }

    @MutationMapping
    public Dog addDog(@Argument DogInput input) { return dogService.addDog(input); }

    @MutationMapping
    public Dog updateDog(@Argument String id, @Argument DogInput input) { return dogService.updateDog(Long.parseLong(id), input); }

    @MutationMapping
    public boolean deleteDog(@Argument String id) { return dogService.deleteDog(Long.parseLong(id)); }

    @MutationMapping
    public Dog assignDogToOwner(@Argument String dogId, @Argument String ownerId) {
        return dogService.assignDogToOwner(Long.parseLong(dogId), Long.parseLong(ownerId));
    }
}
