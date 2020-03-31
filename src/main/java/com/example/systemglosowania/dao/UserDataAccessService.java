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

    // w tym linku samouczek jdbcTemplate:
    // https://mkyong.com/spring/spring-jdbctemplate-querying-examples/

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insertUser(String email, String name) {
        final String sql = "INSERT INTO users (name, email) VALUES ( '" + name + "', '" + email + "')";
        jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT userid, name, email FROM users";
        return jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public Optional<User> selectUserById(UUID userId) {
        return Optional.empty();
    }

    @Override
    public void deleteUserByEmail(String email) {
    }

    @Override
    public int updateUserEmail(UUID userId, String email) {
        return 0;
    }

    @Override
    public int updateUserName(UUID userId, String name) {
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
