package com.example.systemglosowania.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class User {

    private final UUID userId;

    @NotBlank
    private final String name;

    @NotBlank
    private final String email;

    public User(@JsonProperty("userId") UUID userId,
                @JsonProperty("name") String name,
                @JsonProperty("email") String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public UUID getId(){
        return userId;
    }


    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}

