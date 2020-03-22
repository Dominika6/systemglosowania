package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;

import java.util.List;
import java.util.UUID;

public interface SurveyDao {

    int addSurvey(UUID userID, UUID qID, Survey survey);


    List<Survey> selectAllSurveys();
}