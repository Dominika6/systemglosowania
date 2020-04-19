package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


public class Question {

    @Id
    @GeneratedValue
    private UUID qId;

    @NotNull
    private String question;

    @NotNull
    private Date deadline;

    // to istnieje tylko ze względu na JPA
    protected Question(){}

    // ten konstruktor jest do tworzenia instancji w bazie
    public Question( UUID qId, String question, Date deadline){
        this.qId = qId;
        this.question = question;
        this.deadline = deadline;
    }

    @Override
    public String toString(){
        return "Question [ qId = ' " + qId + " ', question = ' " + question + " ', deadline = ' " + deadline + " ' ] ";
    }
    // %tF 	ISO 8601 formatted date with “%tY-%tm-%td“. - już nie potrzebne


    public UUID getqId() {
        return qId;
    }

    public String getQuestion() {
        return question;
    }

    public Date getDeadline() {
        return deadline;
    }
}
