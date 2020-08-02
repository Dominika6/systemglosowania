package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;
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

    @Override
    public List<Survey> getTrueFalseByQid(UUID qid) {
//        final String sql ="select answer, qid, count(answer) ile from survey where qid='"+ qid +"' group by answer, qid";
//        return jdbcTemplate.query(sql, mapResults());
//        List list = new ArrayList(2);
        final String sqlT = "select count(*) tru from survey where qid='"+ qid +"' and answer='t'";
        List<Integer> item1 = jdbcTemplate.query(sqlT, mapTrueFromDb());
        final String sqlF = "select count(*) fals from survey where qid='"+ qid +"' and answer='f'";
        List<Integer> item2 = jdbcTemplate.query(sqlF, mapFalseFromDb());
//        final String sqlF = "select answer, count(answer) fals from survey where qid='"+ qid +"' and answer='f' group by answer";
//        List<Results> item2 = jdbcTemplate.query(sqlF, mapResults());
//        item1.addAll(item2);
//        list.add(item2);
//        System.out.println("TUTAJ: " + item1.get(0) + item2.get(0));
//        int tru = item1.get(0);
//        int fals = item2.get(0);
//        Results result = new Results(qid, tru, fals);     //TU SIĘ ZATRZYMAŁAM, COŚ NIE DZIAŁĄ
//        List<Results> lista = new ArrayList<>(Collections.emptyList());
//        lista.add(result);
        Survey survey = new Survey(item1.get(0), item2.get(0));
        List<Survey> list_of_survey = new ArrayList<Survey>(Collections.emptyList());
        list_of_survey.add(survey);
        return list_of_survey;
    }

    @Override
    public List<Survey> getAllQuestionsWithAnswers(){
//        wyciągamy z bazy wszystkie pytania
        final String sqlQ = "select qid, question, deadline from questions";
        List<Question> questions = jdbcTemplate.query(sqlQ, mapQuestionFromDb());
//        dla każdego sprawdzamy w tab surveys wyniki
        for (int i=0; i < questions.size(); i++){
//            System.out.println("i: " + questions.get(i).qid);
            final String sqlT = "select qid, count(*) tru from survey where qid='"+ questions.get(i).qid +"' and answer='t'";
            List<Integer> item1 = jdbcTemplate.query(sqlT, mapTrueFromDb());
            final String sqlF = "select count(*) fals from survey where qid='"+ questions.get(i).qid +"' and answer='f'";
            List<Integer> item2 = jdbcTemplate.query(sqlF, mapFalseFromDb());
        }
        
        return null;
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

    private RowMapper<Integer> mapTrueFromDb(){
        return ((resultSet, i) -> resultSet.getInt("tru"));
    }
    private RowMapper<Integer> mapFalseFromDb(){
        return ((resultSet, i) -> resultSet.getInt("fals"));
    }

//    private RowMapper<Results> mapResultsFromDb(){
//        return (((resultSet, i) -> {
//            String qidString = resultSet.getString("qid");
//            UUID qid = UUID.fromString(qidString);
//            int tru = resultSet.getInt("tru");
//            int fals = resultSet.getInt("fals");
//
//        }));
//    }


    private RowMapper<Question> mapQuestionFromDb() {
        return ((resultSet, i) -> {
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
            String question = resultSet.getString("question");
            Date deadline = resultSet.getDate("deadline");

            return new Question( qid, question, deadline);
        });
    }
    
    
    private RowMapper<Results> mapResults(){
        return (((resultSet, i) -> {
            String qidString = resultSet.getString("qid");
            UUID qid = UUID.fromString(qidString);
//            String answer = resultSet.getString("answer");
            int tru = resultSet.getInt("tru");
            int fals = resultSet.getInt("fals");
            return new Results(qid, tru, fals);
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





