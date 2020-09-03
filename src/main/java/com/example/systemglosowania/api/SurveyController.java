package com.example.systemglosowania.api;

import com.example.systemglosowania.model.Results;
import com.example.systemglosowania.model.Survey;
import com.example.systemglosowania.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/addAnswer/{userid}/{qid}/{answer}")
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

//    @GetMapping("/getResultByQId/{qid}")
//    public List<Survey> getResultByQId(@PathVariable("qid") UUID qid){
//        return surveyService.getResultByQid(qid);
//    }


//    @GetMapping("/getResultsSurv")
//    public List<Survey> getResults(){
//        return surveyService.getResults();
//    }
//

    @GetMapping("/getResult")
    public List<Results> getResult(){
        return surveyService.getResult();
    }

    public boolean ifAnswerExists(UUID userid, UUID qid){
        List<Survey> lista = surveyService.ifAnswerExists(userid, qid);
        String answers = lista.toString();
        return answers.replace("[", "").replace("]", "").isEmpty();
    }

//    @GetMapping("/ifAnswerExist/{userid}/{qid}")
//    public String ifAnswerExist(@PathVariable("userid") UUID userid,
//                                @PathVariable("qid") UUID qid){
//        String answer = surveyService.ifAnswerExists(userid, qid).toString();
//        return answer.replace("[", "").replace("]", "");
//    }
//    @GetMapping("/ifExist/{userid}/{qid}")
//    public Boolean ifExist(@PathVariable("userid") UUID userid,
//                                @PathVariable("qid") UUID qid){
//        return ifAnswerExists(userid, qid);
//    }
}



