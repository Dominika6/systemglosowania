package com.example.systemglosowania.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name="users")
public class User {

    @Id
    @Column(name="userid")
    @GeneratedValue
    private UUID userId;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="email")
    private String email;

    protected User(){}

    public User(UUID userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    @Override
    public String toString(){
        return "User [ userId = ' " + userId + " ', name = ' " + name + " ', email = ' " + email + " ' ]";
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

