package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;
import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("postgresSurvey")
public class SurveyDataAccessService implements SurveyDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SurveyDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addSurvey(UUID userID, UUID qID, Survey survey) {
        return 0;

    }

    @Override
    public List<Survey> selectAllSurveys() {
        final String sql = "SELECT userId, qId, answer FROM survey";
        return jdbcTemplate.query(sql, mapSurveyFromDb());
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