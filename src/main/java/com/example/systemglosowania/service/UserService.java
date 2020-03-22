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

    public int addUser(User user) {
        return userDao.insertUser(user);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public Optional<User> getUserById(UUID userId) {
        return userDao.selectUserById(userId);
    }

    public int deleteUserById(UUID userId) {
        return userDao.deleteUserById(userId);
    }

    public int updateUser(UUID userId, User newUser) {
        return userDao.updateUserById(userId, newUser);
    }
}
