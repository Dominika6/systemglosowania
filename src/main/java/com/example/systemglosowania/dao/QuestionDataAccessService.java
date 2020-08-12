package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;
import com.example.systemglosowania.model.Survey;
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
    public List<Question> selectAllQuestions() {
        final String sql = "SELECT qid, question, deadline FROM questions";
        return jdbcTemplate.query(sql, mapQuestionFromDb());
    }

    @Override
    public List<Question> getResults() {
        final String sqlR = "select qid as qid, question as question, deadline as deadline, count(answer) filter ( where answer='t') as tru, " +
                "count(answer) filter ( where answer='f') as fals from questions natural join survey group by qid order by deadline";

        return jdbcTemplate.query(sqlR, mapResults());
    }


    @Override
    public List<Question> insertQuestion(String question, Date deadline){
        final String sql = "INSERT INTO questions (question , deadline) VALUES ('"+ question + "','" + deadline + "') RETURNING qid, question, deadline";
        return jdbcTemplate.query(sql, mapQuestionFromDb());

    }

    @Override
    public Object selectQuestionById(UUID qid) {
        final String sql = "SELECT qid, question, deadline FROM questions WHERE qid = '" + qid + "'";
        return jdbcTemplate.query(sql, mapQuestionFromDb());
    }

    @Override
    public List<Question> deleteQuestionById(UUID qid){
        final String sql1 = "DELETE FROM survey WHERE qid = '" + qid + "' RETURNING userid, qid, answer";
        jdbcTemplate.query(sql1, mapSurveyFromDb());
        final String sql2 = "DELETE FROM questions WHERE qid = '" + qid + "' RETURNING qid, question, deadline";
        return jdbcTemplate.query(sql2, mapQuestionFromDb());

    }

    private RowMapper<Question> mapQuestionFromDb() {
        return ((resultSet, i) -> {
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
            String question = resultSet.getString("question");
            Date deadline = resultSet.getDate("deadline");

            return new Question( qid, question, deadline);
        });
    }

    private RowMapper<Survey> mapSurveyFromDb() {
        return ((resultSet, i) -> {
            String useridString = resultSet.getString("userid");
            UUID userid = UUID.fromString(useridString);
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
            boolean answer = resultSet.getBoolean("answer");

            return new Survey(userid, qid, answer);
        });
    }

    private RowMapper<Question> mapResults() {
        return (((resultSet, i) -> {
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
            String question = resultSet.getString("question");
            Date deadline = resultSet.getDate("deadline");
            int tru = resultSet.getInt("tru");
            int fals = resultSet.getInt("fals");
            return new Question(qid, question, deadline, tru, fals);
        }));
    }

}
