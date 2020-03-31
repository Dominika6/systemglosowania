package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.UUID;

public interface UserDao {

    void insertUser(String email, String name);

//    default int insertUser(User user){
//        UUID userId = UUID.randomUUID();
//        return insertUser(userId, user);
//    }

    List<User> selectAllUsers();

    List<User> selectUserById(UUID userId);

    void deleteUserById(UUID userId);

    int updateUserEmail(UUID userId, String email);

    int updateUserName(UUID userId, String name);
}
