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
    public String addAnswer(@PathVariable("userid") UUID userid,
                          @PathVariable("qid") UUID qid,
                          @PathVariable("answer") boolean answer){
        if (ifAnswerExists(userid, qid)){
             surveyService.addAnswer(userid, qid, answer);
             return "Answer added. ";
        }else{
            return "You have already answered this question. ";
        }
    }

    @GetMapping("/getMyAnswers/{userid}")
    public List<Survey> getMyAnswers(@PathVariable("userid") UUID userId){
        return surveyService.getMyAnswers(userId);
    }

    @GetMapping("/getResultByQId/{qid}")
    public List<Survey> getResultByQId(@PathVariable("qid") UUID qId){
        return surveyService.getResultByQId(qId);
    }

    public boolean ifAnswerExists(UUID userid, UUID qid){
        List<Survey> lista = surveyService.ifAnswerExists(userid, qid);
        String answers = lista.toString();
        return answers.replace("[", "").replace("]", "").isEmpty();
    }
}



