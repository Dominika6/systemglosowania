package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.SurveyDao;
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

    public void addAnswer(UUID userID, UUID qId, boolean answer){
        surveyDao.addAnswer(userID, qId, answer);
    }

    public List<Survey> getMyAnswers(UUID userId){
        return surveyDao.getMyAnswers(userId);
    }

    public List<Survey> getResultByQId(UUID qId){
        return surveyDao.getResultByQId(qId);
    }
}