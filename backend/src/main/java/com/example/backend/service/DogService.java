package com.example.backend.service;

import com.example.backend.entity.Dog;
import com.example.backend.repository.DogRepository;
import com.example.backend.types.DogBreed;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DogService {
    private final DogRepository dogRepository;

    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public Dog getDogById(Long id) {
        return dogRepository.findById(id).orElse(null);
    }

    public List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    public List<Dog> getDogsByBreed(DogBreed breed) {
        return dogRepository.findByBreed(breed);
    }

    public List<Dog> getDogsByColor(String color) {
        return dogRepository.findByColor(color);
    }

    public Dog saveDog(Dog dog) {
        return dogRepository.save(dog);
    }

    public boolean deleteDog(Long id) {
        if (dogRepository.existsById(id)) {
            dogRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
