package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.UserDao;
import com.example.systemglosowania.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(@Qualifier("postgresUser") UserDao userDao) {
        this.userDao = userDao;
    }

    public User ifEmailPasswordCorrect(String email, String password){
        return userDao.ifEmailPasswordCorrect(email, password);
    }

    public List<User> addUser(String email, String name, String password, String role) {
        return userDao.insertUser(email, name, password, role);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public List<User> getUserById(UUID userid) {
        return userDao.selectUserById(userid);
    }

    public List<User> deleteUserById(UUID userid) {
        return userDao.deleteUserById(userid);
    }

    public List<User> updateUserEmail(UUID userid, String newEmail) {
        return userDao.updateUserEmail(userid, newEmail);
    }

    public List<User> updateUserName(UUID userid, String newName) {
        return userDao.updateUserName(userid, newName);
    }

    public List<User> updatePassword(UUID userid, String newPassword){
        return userDao.updatePassword(userid, newPassword);
    }

    public boolean areThePasswordsTheSame(UUID userid, String isThePasswordCorrect){
        return userDao.areThePasswordsTheSame(userid, isThePasswordCorrect);
    }
}
