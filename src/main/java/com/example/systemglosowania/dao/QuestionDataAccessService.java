package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository("postgresQuestion")
public class QuestionDataAccessService implements QuestionDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public QuestionDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insertQuestion(String questionString, Date deadline){
        // czy taki przerywany String to poprawny zapis w tym przypadku?
        final String sql = "INSERT INTO questions (question , deadline) VALUES (' "+ questionString +"','"+ deadline+"')";
        jdbcTemplate.query(sql, mapQuestionFromDb()); //TO DO
    }

    @Override
    public List<Question> selectAllQuestions() {
        final String sql = "SELECT * FROM questions";
        return jdbcTemplate.query(sql, mapQuestionFromDb());
    }


    @Override
    public Question selectQuestionById(UUID qId) {
        final String sql = "SELECT question, deadline FROM questions WHERE qid = ?";
        return (Question) jdbcTemplate.query(sql, new Object[]{qId}, mapQuestionFromDb());
    }

    @Override
    public boolean deleteQuestionById(UUID qId){
        final String sql = "DELETE FROM questions WHERE qid = " + qId + " ";
        return true;
    }

    private RowMapper<Question> mapQuestionFromDb() {
        return ((resultSet, i) -> {
            String qIdString = resultSet.getString("qId");
            UUID qId = UUID.fromString(qIdString);
            String question = resultSet.getString("question");
            Date deadline = resultSet.getDate("deadline");


            return new Question( qId, question, deadline);
        });
    }

}
