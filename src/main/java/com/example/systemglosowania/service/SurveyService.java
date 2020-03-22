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

    public int addAnswer(UUID userID, UUID qId, Survey survey){
        return surveyDao.addSurvey(userID, qId, survey);
    }

    public List<Survey> getAllUsers() {
        return surveyDao.selectAllSurveys();
    }
}