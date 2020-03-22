package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.QuestionDao;
import com.example.systemglosowania.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionDao questionDao;

    @Autowired
    public QuestionService(@Qualifier("postgresQuestion") QuestionDao questionDao){
        this.questionDao = questionDao;
    }

    public int addQuestion(Question question){
        return questionDao.insertQuestion(question);
    }

    public List<Question> getAllQuestions(){
        return questionDao.selectAllQuestions();
    }

    public Optional<Question> getQuestionById(UUID qId){
        return questionDao.selectQuestionById(qId);
    }

    public int deleteQuestionById(UUID qId){
        return questionDao.deleteQuestionById(qId);
    }

    public int updateQuestion(UUID qId, Question newQuestion){
        return questionDao.updateQuestionById(qId, newQuestion);
    }
}