package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface QuestionDao {

    List<Question> insertQuestion(String question, Date deadline);

    List<Question> selectAllQuestions();

    Object selectQuestionById(UUID qId);

    List<Question> deleteQuestionById(UUID qId);

//    int updateQuestionById(UUID qId, Question question);
}
