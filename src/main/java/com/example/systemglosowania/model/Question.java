package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

public class Question {

    @Id
    @GeneratedValue
    public UUID qid;

    @NotNull
    private String question;

    @NotNull
    private Date deadline;

    protected Question(){}

    public Question( UUID qid, String question, Date deadline){
        this.qid = qid;
        this.question = question;
        this.deadline = deadline;
    }

    @Override
    public String toString(){
        return "Question [ qid = ' " + qid + " ', question = ' " + question + " ', deadline = ' " + deadline + " ' ] ";
    }

    public UUID getQid() {
        return qid;
    }

    public String getQuestion() {
        return question;
    }

    public Date getDeadline() {
        return deadline;
    }
}
