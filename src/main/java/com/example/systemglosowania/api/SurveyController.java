package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Survey;
import com.example.systemglosowania.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/survey")
@RestController
@CrossOrigin("*")
public class SurveyController {

    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

//    @PostMapping("/addAnswer")  //nie dostaje tu danych
//    public void addAnswer(@RequestBody Survey survey){
//        System.out.println(survey.getUserid() + " " + survey.getQid() + " " + survey.getAnswer());
//        surveyService.addAnswer(survey.getUserid(), survey.getQid(), survey.getAnswer());
//        }
//    }

//  @PostMapping("/addAnswer/{userid}/{qid}/{answer}")
//                          (@PathVariable("userid") UUID userid,
//                          @PathVariable("qid") UUID qid,
//                          @PathVariable("answer") boolean answer)
//    (@RequestBody("userid") UUID userid, //ogarnąć jaka to ma być składnia
//    @RequestBody("qid") UUID qid,
//    @RequestBody("answer") boolean answer)

    @PostMapping("/addAnswer/{userid}/{qid}/{answer}") //tu nie jest dobrze jak mam answer - coś przekazane postem
                                                        //obiekt przekazany postem -inna metoda zamiast PathVariable
    public String addAnswer(@PathVariable("userid") String userids,
                          @PathVariable("qid") String qids,
                          @PathVariable("answer") String answers) {
        UUID userid = UUID.fromString(userids);
        UUID qid = UUID.fromString(qids);
        boolean answer = Boolean.parseBoolean(answers);
        System.out.println(answer);
        if (ifAnswerExists(userid, qid)){
             surveyService.addAnswer(userid, qid, answer);
             return "Answer added. ";
        }else{
            return "You have already answered this question. ";
        }
    }

    @GetMapping("/getMyAnswers/{userid}")
    public List<Survey> getMyAnswers(@PathVariable("userid") String userids){
        UUID userid = UUID.fromString(userids);
        return surveyService.getMyAnswers(userid);
    }

    @GetMapping("/getResultByQId/{qid}")
    public List<Survey> getResultByQId(@PathVariable("qid") UUID qid){
        return surveyService.getResultByQid(qid);
    }

    public boolean ifAnswerExists(UUID userid, UUID qid){
        List<Survey> lista = surveyService.ifAnswerExists(userid, qid);
        String answers = lista.toString();
        return answers.replace("[", "").replace("]", "").isEmpty();
    }
}



