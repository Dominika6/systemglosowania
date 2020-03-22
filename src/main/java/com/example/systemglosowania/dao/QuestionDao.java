package com.example.systemglosowania.dao;

import com.example.systemglosowania.model.Question;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionDao {

    int insertQuestion(UUID qId, Question question);

    default int insertQuestion(Question question){
        UUID qId = UUID.randomUUID();
        return insertQuestion(qId, question);
    }

    List<Question> selectAllQuestions();

    Optional<Question> selectQuestionById(UUID qId);

    int deleteQuestionById(UUID qId);

    int updateQuestionById(UUID qId, Question question);
}
