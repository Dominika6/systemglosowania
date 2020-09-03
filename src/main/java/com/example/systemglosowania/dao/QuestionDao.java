package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface QuestionDao {

    List<Question> insertQuestion(String question, Date deadline);

    List<Question> selectAllQuestions();

//    Object selectQuestionById(UUID qid);

    List<Question> deleteQuestionById(UUID qid);

//    List<Question> getResults();

}
