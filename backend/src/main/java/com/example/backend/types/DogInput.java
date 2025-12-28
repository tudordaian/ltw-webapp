package com.example.backend.types;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class DogInput {
    private String name;
    private Integer age;
    private DogBreed breed;
    private String color;
    private List<Food> favouriteFood;
    private Long ownerId;
}
