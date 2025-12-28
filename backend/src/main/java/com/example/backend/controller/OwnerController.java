package com.example.backend.controller;

import com.example.backend.entity.Owner;
import com.example.backend.service.OwnerService;
import com.example.backend.types.OwnerInput;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class OwnerController {
    private final OwnerService ownerService;

    private static final String TEST_USERNAME = "tudor";
    private static final String TEST_PASSWORD = "pass";

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @QueryMapping
    public Owner ownerById(@Argument String id) {
        return ownerService.getOwnerById(Long.parseLong(id));
    }

    @QueryMapping
    public List<Owner> allOwners() {
        return ownerService.getAllOwners();
    }

    @MutationMapping
    public Owner addOwner(@Argument OwnerInput input) {
        return ownerService.addOwner(input);
    }

    @MutationMapping
    public boolean login(@Argument String username, @Argument String password) {
        return TEST_USERNAME.equals(username) && TEST_PASSWORD.equals(password);
    }
}
