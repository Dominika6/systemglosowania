package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Question;
import com.example.systemglosowania.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
    public List<Question> addQuestion(@PathVariable("question") String questionString,
                                      @PathVariable("deadline") @DateTimeFormat(pattern = "yyyy-MM-dd") Date deadline) {
            return questionService.addQuestion(questionString, deadline);
    }

    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping("/getQuestionById/{qId}")
    public Object getQuestionById(@PathVariable("qId") UUID qId){
        return questionService.getQuestionById(qId);
    }

    @DeleteMapping("/deleteQuestionById/{qId}")
    public List<Question> deleteQuestionById(@PathVariable("qId") UUID qId){
        return questionService.deleteQuestionById(qId);
    }


}
