package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;
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

    @Override //TODO komunikat, że podany email jest już w bazie
    public List<User> insertUser(String email, String name, String password) {
        final String sql = "INSERT INTO users (name, email, password) VALUES ( '" + name + "', '" + email + "', '"+ password +"') RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFomDb());
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
    public List<User> deleteUserById(UUID userId) {
        final String sql1 = "DELETE FROM survey WHERE userid = '" + userId + "' RETURNING userid, qid, answer";
        jdbcTemplate. query(sql1, mapSurveyFromDb());
        final String sql2 = "DELETE FROM users WHERE userid='" + userId + "' RETURNING userid, name, email";
        return jdbcTemplate.query(sql2, mapUserFomDb());
    }

    @Override
    public List<User> updateUserEmail(UUID userId, String email) {
        final String sql = "UPDATE users SET email = '" + email + "' WHERE userid = '" + userId + "' RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFomDb());
    }

    @Override
    public List<User> updateUserName(UUID userId, String name) {
        final String sql = "UPDATE users SET name = '" + name + "' WHERE userid = '" + userId + "' RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFomDb());

    }

    private RowMapper<User> mapUserFomDb() {
        return (resultSet, i) -> {
            String userIdString = resultSet.getString("userid");
            UUID userid = UUID.fromString(userIdString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");

            return new User(userid, name, email);
        };
    }

    private RowMapper<User> mapUserWithPasswordFomDb() {
        return (resultSet, i) -> {
            String userIdString = resultSet.getString("userid");
            UUID userid = UUID.fromString(userIdString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");

            return new User(userid, name, email, password);
        };
    }

    private RowMapper<Survey> mapSurveyFromDb() {
        return ((resultSet, i) -> {
            String userIdString = resultSet.getString("userId");
            UUID userId = UUID.fromString(userIdString);
            String qIdString = resultSet.getString("qId");
            UUID qId = UUID.fromString(qIdString);
            boolean answer = resultSet.getBoolean("answer");

            return new Survey(userId, qId, answer);
        });
    }
}
