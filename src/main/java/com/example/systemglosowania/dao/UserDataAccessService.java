package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgresUser")
public class UserDataAccessService implements UserDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertUser(UUID userId, User user) {
        return 0;
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT userId, name, email FROM users";
        return jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public Optional<User> selectUserById(UUID userId) {
        return Optional.empty();
    }

    @Override
    public int deleteUserById(UUID userId) {
        return 0;
    }

    @Override
    public int updateUserById(UUID userId, User user) {
        return 0;
    }

    private RowMapper<User> mapUserFomDb() {
        return (resultSet, i) -> {
            String userIdString = resultSet.getString("userId");
            UUID userId = UUID.fromString(userIdString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");

            return new User( userId, name, email);
        };
    }
}
