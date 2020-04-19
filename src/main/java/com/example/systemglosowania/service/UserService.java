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

    // TODO setDomain() - dla admina przy tworzeniu grupy
    // a może ustawić konkretną w kodzie? TAK

    public List<User> addUser(String email, String name, String password) {
        return userDao.insertUser(email, name, password);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public List<User> getUserById(UUID userId) {
        return userDao.selectUserById(userId);
    }

    public List<User> deleteUserById(UUID userId) {
        return userDao.deleteUserById(userId);
    }

    //TODO editAccount: ale co z haslem?
    public List<User> updateUserEmail(UUID userId, String newEmail) {
        return userDao.updateUserEmail(userId, newEmail);
    }

    public List<User> updateUserName(UUID userId, String newName) {
        return userDao.updateUserName(userId, newName);
    }

}
