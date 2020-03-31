package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionDao {

    void insertQuestion(String question, Date deadline);

//
//    int insertQuestion(UUID qId, Question question);
//
//    default int insertQuestion(Question question){
//        UUID qId = UUID.randomUUID();
//        return insertQuestion(qId, question);
//    }

    List<Question> selectAllQuestions();

    Object selectQuestionById(UUID qId);

    boolean deleteQuestionById(UUID qId);

//    int updateQuestionById(UUID qId, Question question);
}
