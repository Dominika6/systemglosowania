package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.UUID;

public interface UserDao {

    User ifEmailPasswordCorrect(String email, String password);

    List<User> insertUser(String email, String name, String password, String role);

    List<User> selectAllUsers();

    List<User> selectUserById(UUID userid);

    List<User> deleteUserById(UUID userid);

    List<User> updateUserEmail(UUID userid, String email);

    List<User> updateUserName(UUID userid, String name);

    List<User> updatePassword(UUID userid, String password);

    boolean areThePasswordsTheSame( UUID userid, String isThePasswordCorrect);
}
