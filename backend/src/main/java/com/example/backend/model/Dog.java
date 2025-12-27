package com.example.backend.model;

import java.util.List;

public record Dog(
   Long id,
   String name,
   Integer age,
   DogBreed breed,
   String color,
   List<Food> favouriteFood,
   Owner owner
) {}
