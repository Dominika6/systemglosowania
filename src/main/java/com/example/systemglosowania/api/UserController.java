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

    @PostMapping("/addUser/{email}/{name}")
    public void addUser(@PathVariable("email")String email,
                        @PathVariable("name") String name){
        userService.addUser(email, name);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{userId}")
    public Object getUserById(@PathVariable("userId") UUID userId){
        return userService.getUserById(userId)
                .orElse(null);
    }

    @DeleteMapping("/deleteUserByEmail{email}")
    public void deleteUserByEmail(@PathVariable("email") String email){
        userService.deleteUserByEmail(email);
    }

    @PutMapping("/updateUserEmail/{userId}/{email}")
    public void updateUserEmail(@PathVariable("userId") UUID userId,
                                @PathVariable("email") String emailToUpdate){
        userService.updateUserEmail(userId, emailToUpdate);
    }

    @PutMapping("/updateUserName/{userId}/{name}")
    public void updateUserName(@PathVariable("userId") UUID userId,
                               @PathVariable("name") String nameToUpdate){
        userService.updateUserName(userId, nameToUpdate);
    }

//    @PutMapping("/updateUser/{userId}")
//    public void updateUser(@PathVariable("userId") UUID userId, @Valid @NonNull @RequestBody User userToUpdate){
//        userService.updateUser(userId, userToUpdate);
//    }

}
