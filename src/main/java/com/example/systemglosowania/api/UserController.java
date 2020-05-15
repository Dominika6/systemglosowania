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

    @PostMapping("/addUser/{email}/{name}/{password}/{role}")
    public String addUser(@PathVariable("email")String email,
                          @PathVariable("name") String name,
                          @PathVariable("password") String password,
                          @PathVariable("role") String role){

        if(email.toLowerCase().contains("@student.uj.edu.pl")){
            if(passwordValidation(password)){
                if(role.toUpperCase().equals("ADMIN") || role.toUpperCase().equals("USER") ) {
                    userService.addUser(email.toLowerCase(), name, password, role.toUpperCase());
                    return "Added correctly. ";
                }else
                    return "You must choose one of the roles: USER or ADMIN";
            }else
                return "The password must contain at least one lower and uppercase letter, one number and cannot contain white space. ";
        }else
            return "To use this program you must have an email with the domain: \"@student.uj.edu.pl\". ";
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

    @PutMapping("/updateUserName/{userid}/{name}")
    public String updateUserName(@PathVariable("userid") UUID userid,
                                 @PathVariable("name") String nameToUpdate){
        userService.updateUserName(userid, nameToUpdate);
        return "Updated";
    }

    @PutMapping("/updatePassword/{userid}/{oldPassword}/{newPassword}")
    public String updatePassword(@PathVariable("userid") UUID userid,
                                 @PathVariable("oldPassword") String oldPassword,
                                 @PathVariable("newPassword") String newPassword){
        if(areThePasswordsTheSame(userid, oldPassword)){
            if(passwordValidation(newPassword)) {
                userService.updatePassword(userid, newPassword);
                return "You have updated your password. ";
            }else
                return "The password must contain at least one lower and uppercase letter, one number and cannot contain white space. ";
        }else{
            return "You entered the current password incorrectly. ";
        }
    }

    public boolean areThePasswordsTheSame(UUID userid, String isThePasswordCorrect){
        return userService.areThePasswordsTheSame(userid, isThePasswordCorrect);
    }

    public boolean passwordValidation(String password) {
        String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$";
        return password.matches(pattern);
    }
}