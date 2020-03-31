package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;

import java.util.List;
import java.util.UUID;

public interface SurveyDao {

    void addAnswer(UUID userID, UUID qID, boolean answer);

    List<Survey> getMyAnswers(UUID userId);

    List<Survey> getResultByQId(UUID qId);
}