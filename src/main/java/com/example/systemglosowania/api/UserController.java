package com.example.systemglosowania.api;

import com.example.systemglosowania.model.User;
import com.example.systemglosowania.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/user")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/addUser/{email}/{name}/{password}")
    public List<User> addUser(@PathVariable("email")String email,
                        @PathVariable("name") String name,
                        @PathVariable("password") String password){
        return userService.addUser(email, name, password);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{userId}")
    public Object getUserById(@PathVariable("userId") UUID userId){
        return userService.getUserById(userId);
    }

    @DeleteMapping("/deleteUserById/{userId}")
    public List<User> deleteUserByEmail(@PathVariable("userId") UUID userId){
        return userService.deleteUserById(userId);
    }

    @PutMapping("/updateUserEmail/{userId}/{email}")
    public List<User> updateUserEmail(@PathVariable("userId") UUID userId,
                                @PathVariable("email") String emailToUpdate){
        return userService.updateUserEmail(userId, emailToUpdate);
    }

    @PutMapping("/updateUserName/{userId}/{name}")
    public List<User> updateUserName(@PathVariable("userId") UUID userId,
                               @PathVariable("name") String nameToUpdate){
        return userService.updateUserName(userId, nameToUpdate);
    }

}
