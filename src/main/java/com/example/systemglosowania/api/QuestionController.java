package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Question;
import com.example.systemglosowania.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/questions")
@RestController
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/addQuestion/{question}/{deadline}")
    public void addQuestion(@PathVariable("question") String questionString,
                            @PathVariable("deadline") Date deadline){
        questionService.addQuestion(questionString, deadline);
    }

    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping("/getQuestionById/{qId}")
    public Question getQuestionById(@PathVariable("qId") UUID qId){
        return questionService.getQuestionById(qId);
    }


    @DeleteMapping("/deleteQuestionById/{qId}")
    public void deleteQuestionById(@PathVariable("qId") UUID qId){
        questionService.deleteQuestionById(qId);
    }



}
