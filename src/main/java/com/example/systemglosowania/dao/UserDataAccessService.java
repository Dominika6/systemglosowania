package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
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
    public void insertUser(String email, String name, String password) {
        final String sql = "INSERT INTO users (name, email, password) VALUES ( '" + name + "', '" + email + "', '"+ password +"')";
        jdbcTemplate.query(sql, mapUserWithPasswordFomDb());
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT userid, name, email FROM users";
        return jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public List<User> selectUserById(UUID userId) {
        final String sql = "SELECT userid, name, email FROM users WHERE userid='"+ userId + "'";
        return jdbcTemplate.query(sql, mapUserFomDb());
    }

    //mozna zamienić na deleteUserByEmail
    @Override
    public void deleteUserById(UUID userId) {
        final String sql = "DELETE FROM survey WHERE userid = '" + userId + "'; " +
                "DELETE FROM users WHERE userid='" + userId + "'";
        jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public int updateUserEmail(UUID userId, String email) {
        final String sql = "UPDATE users SET email = '" + email + "' WHERE userid = '" + userId + "' ";
        jdbcTemplate.query(sql, mapUserFomDb());
        return 1;
    }

    @Override
    public int updateUserName(UUID userId, String name) {
        final String sql = "UPDATE users SET name = '" + name + "' WHERE userid = '" + userId + "' ";
        jdbcTemplate.query(sql, mapUserFomDb());
        return 1;
    }

    private RowMapper<User> mapUserFomDb() {
        return (resultSet, i) -> {
            String userIdString = resultSet.getString("userId");
            UUID userId = UUID.fromString(userIdString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");

            return new User(userId, name, email);
        };
    }

    private RowMapper<User> mapUserWithPasswordFomDb() {
        return (resultSet, i) -> {
            String userIdString = resultSet.getString("userId");
            UUID userId = UUID.fromString(userIdString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");

            return new User(userId, name, email, password);
        };
    }
}
