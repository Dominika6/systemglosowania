package com.example.systemglosowania.dao;


import com.example.systemglosowania.model.Results;
import com.example.systemglosowania.model.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository("postgresSurvey")
public class SurveyDataAccessService implements SurveyDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SurveyDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Survey> addAnswer(UUID userid, UUID qid, boolean answer) {
        final String sql = "INSERT INTO survey (userid, qid, answer) VALUES('" + userid + "','"+ qid +"','"+ answer +"') RETURNING userid, qid, answer";
        return jdbcTemplate.query(sql,mapSurveyFromDb());
    }

    @Override
    public List<Survey> getMyAnswers(UUID userid) {
        final String sql = "SELECT userid, qid, answer FROM survey WHERE userid = '"+ userid+"'";
        return jdbcTemplate.query(sql, mapSurveyFromDb());
    }

    @Override
    public List<Survey> getResultByQid(UUID qid) {
        final String sql = "SELECT userid, qid, answer FROM survey WHERE qid = '"+ qid +"'";
        return jdbcTemplate.query(sql, mapSurveyFromDb());
    }


// @Override
//    public List<Survey> getResults() {
//        final String sqlR = "select qid as qid, question as question, deadline as deadline, count(answer) filter ( where answer='t') as tru, " +
//                "count(answer) filter ( where answer='f') as fals from questions natural join survey group by qid order by deadline";
//
//     return jdbcTemplate.query(sqlR, mapResults());
//    }


 @Override
    public List<Results> getResult() {
            List<Results> list;

            final String sql = "select qid as qid, question as question, deadline as deadline, count(answer) filter ( where answer='t') as tru, " +
                    "count(answer) filter ( where answer='f') as fals from questions natural join survey group by qid order by deadline";

            list = jdbcTemplate.query(sql, mapResult());
            return list;
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

//
//    private RowMapper<Survey> mapResults() {
//        return (((resultSet, i) -> {
//            String qidString = resultSet.getString("qid");
//            UUID qid = UUID.fromString(qidString);
//            String question = resultSet.getString("question");
//            Date deadline = resultSet.getDate("deadline");
//            int tru = resultSet.getInt("tru");
//            int fals = resultSet.getInt("fals");
//            return new Survey(qid, question, deadline, tru, fals);
//        }));
//    }


    private RowMapper<Results> mapResult() {
        return (((resultSet, i) -> {
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
            String question = resultSet.getString("question");
            Date deadline = resultSet.getDate("deadline");
            int tru = resultSet.getInt("tru");
            int fals = resultSet.getInt("fals");
            return new Results(qid, question, deadline, tru, fals);
        }));
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
}





