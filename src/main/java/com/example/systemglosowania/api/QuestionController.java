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
@CrossOrigin("*")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/addQuestion/{question}/{deadline}")
    public String addQuestion(@PathVariable("question") String questionString,
                                      @PathVariable("deadline") @DateTimeFormat(pattern = "yyyy-MM-dd") Date deadline) {
            questionService.addQuestion(questionString, deadline);
            return "Question added. ";
    }

    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }


//    @GetMapping("/getResultsSurv")
//    public List<Question> getResults(){
//        return questionService.getResults();
//    }


//    @GetMapping("/getQuestionById/{qid}")
//    public Object getQuestionById(@PathVariable("qid") UUID qid){
//        return questionService.getQuestionById(qid);
//    }

    @DeleteMapping("/deleteQuestionById/{qid}")
    public String deleteQuestionById(@PathVariable("qid") UUID qid){
        questionService.deleteQuestionById(qid);
        return "Question deleted. ";
    }
}
