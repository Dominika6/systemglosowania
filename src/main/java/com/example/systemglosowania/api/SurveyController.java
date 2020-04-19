package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Survey;
import com.example.systemglosowania.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/survey")
@RestController
public class SurveyController {

    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping("/addAnswer/{userid}/{qid}/{answer}")
    public List<Survey> addAnswer(@PathVariable("userid") UUID userID,
                          @PathVariable("qid") UUID qId,
                          @PathVariable("answer") boolean answer){
        return surveyService.addAnswer(userID, qId, answer);
    }

    @GetMapping("/getMyAnswers/{userid}") //działa
    public List<Survey> getMyAnswers(@PathVariable("userid") UUID userId){
        return surveyService.getMyAnswers(userId);
    }

    @GetMapping("/getResultByQId/{qid}")//działa
    public List<Survey> getResultByQId(@PathVariable("qid") UUID qId){
        return surveyService.getResultByQId(qId);
    }

}



