package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.SurveyDao;
import com.example.systemglosowania.model.Results;
import com.example.systemglosowania.model.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SurveyService {

    private final SurveyDao surveyDao;

    @Autowired
    public SurveyService(@Qualifier("postgresSurvey") SurveyDao surveyDao) {
        this.surveyDao = surveyDao;
    }

    public List<Survey> addAnswer(UUID userid, UUID qid, boolean answer){
        return surveyDao.addAnswer(userid, qid, answer);
    }

    public List<Survey> getMyAnswers(UUID userid){
        return surveyDao.getMyAnswers(userid);
    }

    public List<Survey> getResultByQid(UUID qid){
        return surveyDao.getResultByQid(qid);
    }

    public List<Survey> getTrueFalseByQid(UUID qid){
        return surveyDao.getTrueFalseByQid(qid);
    }

    public List<Survey> getAllQuestionsWithAnswers(){
        return surveyDao.getAllQuestionsWithAnswers();
    }

    public List<Survey> ifAnswerExists (UUID userid, UUID qid){
        return surveyDao.ifAnswerExists(userid, qid);
    }
}