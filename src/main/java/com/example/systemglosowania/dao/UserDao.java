package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {

    void insertUser(String email, String name);

//    default int insertUser(User user){
//        UUID userId = UUID.randomUUID();
//        return insertUser(userId, user);
//    }

    List<User> selectAllUsers();

    Optional<User> selectUserById(UUID userId);

    void deleteUserByEmail(String email);

    int updateUserEmail(UUID userId, String email);

    int updateUserName(UUID userId, String name);
}
