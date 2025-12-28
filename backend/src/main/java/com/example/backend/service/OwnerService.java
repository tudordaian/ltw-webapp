package com.example.backend.service;

import com.example.backend.entity.Owner;
import com.example.backend.repository.OwnerRepository;
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
