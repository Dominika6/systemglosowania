package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgresQuestion")
public class QuestionDataAccessService implements QuestionDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public QuestionDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertQuestion(UUID qId, Question question){
        return 0;
    }

    @Override
    public List<Question> selectAllQuestions() {
        final String sql = "SELECT qId, question, deadline FROM questions";
        return jdbcTemplate.query(sql, mapQuestionFromDb());
    }


    @Override
    public Optional<Question> selectQuestionById(UUID qId) {
        return Optional.empty();
    }

    @Override
    public int deleteQuestionById(UUID qId){
        return 0;
    }

    @Override
    public int updateQuestionById(UUID qId, Question question){
        return 0;
    }

    private RowMapper<Question> mapQuestionFromDb() {
        return ((resultSet, i) -> {
            String qIdString = resultSet.getString("qId");
            UUID qId = UUID.fromString(qIdString);
            Date deadline = resultSet.getDate("deadline");
            String question = resultSet.getString("deadline");

            return new Question( qId, question, deadline);
        });
    }

}
