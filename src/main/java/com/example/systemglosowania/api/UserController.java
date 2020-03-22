package com.example.systemglosowania.api;

import com.example.systemglosowania.model.User;
import com.example.systemglosowania.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@Valid @NonNull @RequestBody User user){
        userService.addUser(user);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    public Object getUserById(@PathVariable("userId") UUID userId){
        return userService.getUserById(userId)
                .orElse(null);
    }

    @DeleteMapping(path = "{userId")
    public void deleteUserById(@PathVariable("userId")UUID userId){
        userService.deleteUserById(userId);
    }

    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") UUID userId, @Valid @NonNull @RequestBody User userToUpdate){
        userService.updateUser(userId, userToUpdate);
    }

}
