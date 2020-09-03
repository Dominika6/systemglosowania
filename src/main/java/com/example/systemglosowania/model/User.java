package com.example.systemglosowania.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

public class User{

    @Id
    @GeneratedValue
    private UUID userid;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String role;

    protected User(){}

    public User(UUID userid, String name, String email, String role, String password) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(UUID userid, String name, String email, String role){
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public User(UUID userid, String name, String email){
        this.userid = userid;
        this.name = name;
        this.email = email;
    }

    public User(UUID userid){
        this.userid = userid;

    }

    @Override
    public String toString(){
        return "User [ userid = ' " + userid + " ', name = ' " + name + " ', email = ' " + email + "', " +
                "role = ' " + role +"']";
    }

    public UUID getId(){
        return userid;
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

    public String getPassword() { return password;}

}

