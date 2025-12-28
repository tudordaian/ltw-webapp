package com.example.backend.controller;

import com.example.backend.entity.Owner;
import com.example.backend.service.OwnerService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class OwnerController {
    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @QueryMapping
    public Owner ownerById(@Argument String id) {
        return ownerService.getOwnerById(Long.parseLong(id));
    }
}
