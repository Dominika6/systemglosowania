package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {

    int insertUser(UUID userId, User user);

    default  int insertUser(User user){
        UUID userId = UUID.randomUUID();
        return insertUser(userId, user);
    }

    List<User> selectAllUsers();

    Optional<User> selectUserById(UUID userId);

    int deleteUserById(UUID userId);

    int updateUserById(UUID userId, User user);
}
