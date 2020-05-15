package com.example.systemglosowania.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

public class User
{
    @Id
    @GeneratedValue
    private UUID userId;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String role;

    protected User(){}

    public User(UUID userId, String name, String email, String role, String password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(UUID userId, String name, String email, String role){
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public User(UUID userId, String name, String email){
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    @Override
    public String toString(){
        return "User [ userId = ' " + userId + " ', name = ' " + name + " ', email = ' " + email + "', " +
                "role = ' " + role +"']";
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

    public String getRole(){
        return role;
    }

}

