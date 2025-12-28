package com.example.backend.service;

import com.example.backend.entity.Dog;
import com.example.backend.entity.Owner;
import com.example.backend.repository.DogRepository;
import com.example.backend.repository.OwnerRepository;
import com.example.backend.types.DogBreed;
import com.example.backend.types.DogInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DogService {
    private final DogRepository dogRepository;
    private final OwnerRepository ownerRepository;

    public DogService(DogRepository dogRepository, OwnerRepository ownerRepository) {
        this.dogRepository = dogRepository;
        this.ownerRepository = ownerRepository;
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

    public Page<Dog> getDogsPaginated(int page, int size) {
       return dogRepository.findAll(PageRequest.of(page, size));
    }

    public Dog addDog(DogInput dogDto) {
        Dog dogEntity = convertDtoToEntity(dogDto);
        return dogRepository.save(dogEntity);
    }

    public Dog updateDog(Long id, DogInput dogDto) {
        Dog existingDog = dogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dog not found with id: " + id));

        existingDog.setName(dogDto.getName());
        existingDog.setAge(dogDto.getAge());
        existingDog.setColor(dogDto.getColor());
        existingDog.setBreed(dogDto.getBreed());
        existingDog.setFavouriteFood(dogDto.getFavouriteFood());

        if (dogDto.getOwnerId() != null) {
            Owner owner = ownerRepository.findById(dogDto.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Owner not found with owner_id: " + dogDto.getOwnerId()));
            existingDog.setOwner(owner);
        } else {
            existingDog.setOwner(null);
        }
        return dogRepository.save(existingDog);
    }

    public List<Dog> getDogsWithOwners() {
        return dogRepository.findAll().stream()
                .filter(dog -> dog.getOwner() != null)
                .toList();
    }

    public boolean deleteDog(Long id) {
        if (dogRepository.existsById(id)) {
            dogRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Dog convertDtoToEntity(DogInput dogInput) {
        Dog dog = new Dog();
        dog.setName(dogInput.getName());
        dog.setAge(dogInput.getAge());
        dog.setColor(dogInput.getColor());
        dog.setBreed(dogInput.getBreed());
        dog.setFavouriteFood(dogInput.getFavouriteFood());

        if (dogInput.getOwnerId() != null) {
            Owner owner = ownerRepository.findById(dogInput.getOwnerId())
                            .orElseThrow(() -> new RuntimeException("Owner not found with id: " + dogInput.getOwnerId()));
            dog.setOwner(owner);
        }

        return dog;
    }

    public Dog assignDogToOwner(Long dogId, Long ownerId) {
        Dog dog = dogRepository.findById(dogId)
                .orElseThrow(() -> new RuntimeException("Dog not found with id: " + dogId));
        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found with id: " + ownerId));

        dog.setOwner(owner);
        return dogRepository.save(dog);
    }


}
