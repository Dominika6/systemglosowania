package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.UUID;

public interface UserDao {

    List<User> insertUser(String email, String name, String password, String role);

    List<User> selectAllUsers();

    List<User> selectUserById(UUID userId);

    List<User> deleteUserById(UUID userId);

    List<User> updateUserEmail(UUID userId, String email);

    List<User> updateUserName(UUID userId, String name);

    List<User> updatePassword(UUID userid, String password);

    boolean areThePasswordsTheSame( UUID userid, String isThePasswordCorrect);
}
