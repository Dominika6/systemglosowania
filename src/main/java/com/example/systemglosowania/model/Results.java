package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.Id;
import java.util.UUID;

public class Results {

//    @Id
//    @NotNull
//    private UUID userid;

    @Id
    @NotNull
    private UUID qid;

//    private boolean answer;
    private int tru;
    private int fals;
//    private int ile;


    protected Results(){}

//    public Results(boolean answer){
//        this.answer = answer;
//    }

//    public Results(UUID qid, String tru, String fals, int ile){
//        this.qid = qid;
//        this.tru = tru;
//        this.fals = fals;
//        this.ile = ile;
//    }

    public Results(UUID qid, int tru, int fals) {
//        this.userid = userid;
        this.qid = qid;
        this.tru = tru;
        this.fals = fals;
//        this.answer = answer;
    }

//    @Override
//    public String toString() {
//        return "" + answer + "";
//    }
//
//    public UUID getUserid() {
//        return userid;
//    }
//
    public UUID getQid() {
        return qid;
    }
//
//    public boolean getAnswer() {
//        return answer;
//    }

//    public String getAnswer(){return answer;}
//    public int getIle(){return ile;}
}