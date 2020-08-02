package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Survey {

    @Id
    @NotNull
    private UUID userid;

    @Id
    @NotNull
    private UUID qid;

    private boolean answer;
    private int tru;
    private int fals;
    private Date deadline;
    private String question;

    protected Survey(List<Integer> item1, List<Integer> item2){}

    public Survey(boolean answer){
        this.answer = answer;
    }

    public Survey(UUID qid, String question, Date deadline, int tru, int fals){
        this.qid = qid;
        this.question = question;
        this.deadline = deadline;
        this.tru = tru;
        this.fals = fals;
    }

 public Survey(int tru, int fals){
        this.tru = tru;
        this.fals = fals;
    }

    public Survey(UUID userid, UUID qid, boolean answer) {
        this.userid = userid;
        this.qid = qid;
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "" + answer + "";
    }

    public UUID getUserid() {
        return userid;
    }

    public UUID getQid() {
        return qid;
    }

    public boolean getAnswer() {
        return answer;
    }

    public int getTru(){return tru;}
    public int getFals(){return fals;}
}