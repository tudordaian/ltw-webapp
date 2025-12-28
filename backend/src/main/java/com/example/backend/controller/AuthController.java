package com.example.backend.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {

    private static final String TEST_USERNAME = "tudor";
    private static final String TEST_PASSWORD = "pass";

    @MutationMapping
    public boolean login(@Argument String username, @Argument String password) {
        return TEST_USERNAME.equals(username) && TEST_PASSWORD.equals(password);
    }
}
