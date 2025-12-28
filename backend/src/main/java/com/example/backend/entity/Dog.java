package com.example.backend.entity;

import com.example.backend.types.DogBreed;
import com.example.backend.types.Food;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "dogs")
@Getter
@Setter
public class Dog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;

    @Enumerated(EnumType.STRING)
    private DogBreed breed;

    private String color;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Food> favouriteFood;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    public Dog() {}

}
