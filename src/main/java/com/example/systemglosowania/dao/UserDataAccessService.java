package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;
import com.example.systemglosowania.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Repository("postgresUser")
public class UserDataAccessService implements UserDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



  @Override
    public User ifEmailPasswordCorrect(String email, String password){

        final String sql = "SELECT password FROM users WHERE email='" + email + "'";
        List<String> cryptPass = jdbcTemplate.query(sql, mapCryptPasswordFromDb());

        System.out.println("crypt: " + cryptPass);
        String formatPass = cryptPass.toString().replace("[", "").replace("]", "");
        if(!formatPass.equals("")) {
            final String sql2 = "SELECT crypt ('" + password + "', '" + formatPass + "' ) AS password";
            List<String> newCrypt = jdbcTemplate.query(sql2, mapCryptPasswordFromDb());
            String isCorrect = newCrypt.toString().replace("[", "").replace("]", "");

            if (formatPass.equals(isCorrect)) { //czyli poprawne dane logowania
                System.out.println("Poprawne dane");
                final String sql3 = "SELECT userid, name, email, role FROM users WHERE email='" + email + "'";
                List<User> lista =  jdbcTemplate.query(sql3, mapUserWithRoleFromDb());
                List<User> pierwszyUser = new java.util.ArrayList<>(List.of());
                pierwszyUser.add(lista.get(0));
                return pierwszyUser.get(0);
            } else {
                return null;
            }
        }else
            return null;

    }

//
//
//  @Override
//    public List<UUID> ifEmailPasswordCorrect(String email, String password){
//
//        final String sql = "SELECT password FROM users WHERE email='" + email + "'";
//        List<String> cryptPass = jdbcTemplate.query(sql, mapCryptPasswordFromDb());
//
//        List<UUID> listanull = List.of();
//
//        String pustyjakzlymail = cryptPass.toString().replace("[", "").replace("]", "");
//
//
//        if(cryptPass.toString().length() == 0){
//            return listanull;
//        }
//        if(pustyjakzlymail.length() == 0){
//            return listanull;
//        }
//
//        String formatPass = cryptPass.toString().replace("[", "").replace("]", "");
//        final String sql2 = "SELECT crypt ('" + password + "', '" + formatPass + "' ) AS password";
//        List<String> newCrypt = jdbcTemplate.query(sql2, mapCryptPasswordFromDb());
//        String isCorrect = newCrypt.toString().replace("[", "").replace("]", "");
//
//        if(formatPass.equals(isCorrect)){
//            final String sql3 = "SELECT userid FROM users WHERE email='" + email + "'";
//            return jdbcTemplate.query(sql3, mapUseridFromDb());
//        }
//        return listanull;
//
//    }
//

    @Override
    public List<User> insertUser(String email, String name, String password, String role) {
        final String sql = "INSERT INTO users (name, email, password, role) " +
                "VALUES ( '" + name + "', '" + email + "', crypt( '" + password + "', gen_salt('md5'))," +
                " '" + role + "') RETURNING userid, name, email, role";
        return jdbcTemplate.query(sql, mapUserWithRoleFromDb());
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT userid, name, email, role FROM users";
        return jdbcTemplate.query(sql, mapUserWithRoleFromDb());
    }

    @Override
    public List<User> selectUserById(UUID userid) {
        final String sql = "SELECT userid, name, email, role FROM users WHERE userid='" + userid + "'";
        return jdbcTemplate.query(sql, mapUserWithRoleFromDb());
    }

    @Override
    public List<User> deleteUserById(UUID userid) {
        final String sql1 = "DELETE FROM survey WHERE userid = '" + userid + "' RETURNING userid, qid, answer";
        jdbcTemplate. query(sql1, mapSurveyFromDb());
        final String sql2 = "DELETE FROM users WHERE userid='" + userid + "' RETURNING userid, name, email";
        return jdbcTemplate.query(sql2, mapUserFromDb());
    }

    @Override
    public List<User> updateUserEmail(UUID userid, String email) {
        final String sql = "UPDATE users SET email = '" + email + "' WHERE userid = '" + userid + "' " +
                "RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFromDb());
    }

    @Override
    public List<User> updateUserName(UUID userid, String name) {
        final String sql = "UPDATE users SET name = '" + name + "' WHERE userid = '" + userid + "' " +
                "RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFromDb());
    }

    @Override
    public List<User> updatePassword(UUID userid, String password){
        final String sql = "UPDATE users SET password = crypt( '" + password + "', gen_salt('md5')) " +
                "WHERE userid = '" + userid + "' RETURNING userid, name, email";
        return jdbcTemplate.query(sql, mapUserFromDb());
    }

    @Override
    public boolean areThePasswordsTheSame(UUID userid, String isThePasswordCorrect){
        final String sql1 = "SELECT password FROM users WHERE userid = '" + userid + "' ";
        List<String> cryptOldPass = jdbcTemplate.query(sql1, mapCryptPasswordFromDb());
        String oldFormat = cryptOldPass.toString().replace("[", "").replace("]", "");

        final String sql2 = "SELECT crypt ('" + isThePasswordCorrect + "', '" + oldFormat + "' ) AS password";
        List<String> newCrypt = jdbcTemplate.query(sql2, mapCryptPasswordFromDb());
        String newFormat = newCrypt.toString().replace("[", "").replace("]", "");

        return oldFormat.equals(newFormat);
    }

    private RowMapper<String> mapCryptPasswordFromDb(){
        return (resultSet, i) -> resultSet.getString("password");
    }
//
//    private RowMapper<UUID> mapUseridFromDb(){
//        return (resultSet, i) -> {
//            String useridString = resultSet.getString("userid");
//            return UUID.fromString(useridString);
//        };
//    }

    private RowMapper<User> mapUserFromDb() {
        return (resultSet, i) -> {
            String useridString = resultSet.getString("userid");
            UUID userid = UUID.fromString(useridString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");

            return new User(userid, name, email);
        };
    }
    private RowMapper<User> mapUserWithRoleFromDb() {
        return (resultSet, i) -> {
            String useridString = resultSet.getString("userid");
            UUID userid = UUID.fromString(useridString);
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");
            String role = resultSet.getString("role");

            return new User(userid, name, email, role);
        };
    }

    private RowMapper<Survey> mapSurveyFromDb() {
        return ((resultSet, i) -> {
            String useridString = resultSet.getString("userid");
            UUID userid = UUID.fromString(useridString);
            String qIdString = resultSet.getString("qId");
            UUID qId = UUID.fromString(qIdString);
            boolean answer = resultSet.getBoolean("answer");

            return new Survey(userid, qId, answer);
        });
    }
}
