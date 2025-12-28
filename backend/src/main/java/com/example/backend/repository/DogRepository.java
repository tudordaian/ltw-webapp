package com.example.backend.repository;

import com.example.backend.entity.Dog;
import com.example.backend.types.DogBreed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {
    List<Dog> findByBreed(DogBreed breed);
    List<Dog> findByColor(String data);
}
