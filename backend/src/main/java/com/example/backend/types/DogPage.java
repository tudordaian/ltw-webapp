package com.example.backend.types;

import com.example.backend.entity.Dog;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DogPage {
    private List<Dog> content;
    private int totalElements;
    private int totalPages;
    private int pageNumber;
    private int pageSize;

    public DogPage(List<Dog> content, int totalElements, int totalPages, int pageNumber, int pageSize) {
        this.content = content;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
