package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Results;
import com.example.systemglosowania.model.Survey;

import java.util.List;
import java.util.UUID;

public interface SurveyDao {

    List<Survey> addAnswer(UUID userid, UUID qid, boolean answer);

    List<Survey> getMyAnswers(UUID userid);

    List<Survey> getResultByQid(UUID qid);

    List<Results> getResult();

    List<Survey> ifAnswerExists (UUID userid, UUID qid);
}