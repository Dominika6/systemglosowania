package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Survey;

import java.util.List;
import java.util.UUID;

public interface SurveyDao {

    List<Survey> addAnswer(UUID userID, UUID qID, boolean answer);

    List<Survey> getMyAnswers(UUID userId);

    List<Survey> getResultByQId(UUID qId);

    List<Survey> ifAnswerExists (UUID userid, UUID qid);
}