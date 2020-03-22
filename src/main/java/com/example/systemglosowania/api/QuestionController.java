package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Question;
import com.example.systemglosowania.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/question")
@RestController
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public void addQuestion(@Valid @NonNull @RequestBody Question question){
        questionService.addQuestion(question);
    }

    @GetMapping
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping(path = "{qId}")
    public Question getQuestionById(@PathVariable("qId")UUID qId){
        return questionService.getQuestionById(qId)
                .orElse(null);
    }

    @DeleteMapping(path = "{qId}")
    public void deleteQuestionById(@PathVariable("qId") UUID qId, @Valid @NonNull @RequestBody Question questionToUpdate){
        questionService.updateQuestion(qId, questionToUpdate);
    }

}
