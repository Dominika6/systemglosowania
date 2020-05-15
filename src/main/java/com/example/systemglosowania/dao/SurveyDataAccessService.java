package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
    public List<Survey> addAnswer(UUID userId, UUID qId, boolean answer) {
        final String sql = "INSERT INTO survey (userid, qid, answer) VALUES('" + userId + "','"+ qId +"','"+ answer +"') RETURNING userid, qid, answer";
        return jdbcTemplate.query(sql,mapSurveyFromDb());
    }

    @Override
    public List<Survey> getMyAnswers(UUID userId) {
        final String sql = "SELECT userid, qid, answer FROM survey WHERE userid = '"+ userId+"'";
        return jdbcTemplate.query(sql, mapSurveyFromDb());
    }

    @Override
    public List<Survey> getResultByQId(UUID qId) {
        final String sql = "SELECT userid, qid, answer FROM survey WHERE qid = '"+ qId +"'";
        return jdbcTemplate.query(sql, mapSurveyFromDb());
    }

    @Override
    public List<Survey> ifAnswerExists(UUID userid, UUID qid) {
        final String sql = "select answer from survey where userid = '" + userid + "'and qid= '" + qid + "'";
        return jdbcTemplate.query(sql, mapAnswerFromDb());
    }

    private RowMapper<Survey> mapAnswerFromDb(){
        return ((resultSet, i) -> {
            boolean answers = resultSet.getBoolean("answer");
            return new Survey(answers);
        });
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





