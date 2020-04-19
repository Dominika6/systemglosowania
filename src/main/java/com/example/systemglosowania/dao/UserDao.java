package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.UUID;

public interface UserDao {

    List<User> insertUser(String email, String name, String password);

//    default int insertUser(User user){
//        UUID userId = UUID.randomUUID();
//        return insertUser(userId, user);
//    }

    List<User> selectAllUsers();

    List<User> selectUserById(UUID userId);

    List<User> deleteUserById(UUID userId);

    List<User> updateUserEmail(UUID userId, String email);

    List<User> updateUserName(UUID userId, String name);
}
