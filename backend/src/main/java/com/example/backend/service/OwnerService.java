package com.example.backend.service;

import com.example.backend.entity.Owner;
import com.example.backend.repository.OwnerRepository;
import com.example.backend.types.OwnerInput;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;

    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public Owner getOwnerById(Long id) {
        return ownerRepository.findById(id).orElse(null);
    }

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    public Owner addOwner(OwnerInput ownerInput) {
        Owner owner = new Owner();
        owner.setFirstName(ownerInput.getFirstName());
        owner.setLastName(ownerInput.getLastName());
        owner.setAge(ownerInput.getAge());
        return ownerRepository.save(owner);
    }

    public Owner saveOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    public boolean deleteOwner(Long id) {
        if (ownerRepository.existsById(id)) {
            ownerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
