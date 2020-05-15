package com.example.systemglosowania.service;

import com.example.systemglosowania.dao.QuestionDao;
import com.example.systemglosowania.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionDao questionDao;

    @Autowired
    public QuestionService(@Qualifier("postgresQuestion") QuestionDao questionDao){
        this.questionDao = questionDao;
    }

    public List<Question> addQuestion(String questionString, Date deadline){
        return questionDao.insertQuestion(questionString, deadline);
    }

    public List<Question> getAllQuestions(){
        return questionDao.selectAllQuestions();
    }

    public Object getQuestionById(UUID qId){
        return questionDao.selectQuestionById(qId);
    }

    public List<Question> deleteQuestionById(UUID qId){
        return questionDao.deleteQuestionById(qId);
    }

}
