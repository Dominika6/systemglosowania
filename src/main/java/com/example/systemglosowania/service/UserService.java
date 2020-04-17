package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.UserDao;
import com.example.systemglosowania.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public void addUser(String email, String name, String password) {
        userDao.insertUser(email, name, password);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public List<User> getUserById(UUID userId) {
        return userDao.selectUserById(userId);
    }

    public void deleteUserById(UUID userId) {
        userDao.deleteUserById(userId);
    }

    // /editAccount: ale co z haslem?
    public int updateUserEmail(UUID userId, String newEmail) {
        return userDao.updateUserEmail(userId, newEmail);
    }

    public int updateUserName(UUID userId, String newName) {
        return userDao.updateUserName(userId, newName);
    }

}
