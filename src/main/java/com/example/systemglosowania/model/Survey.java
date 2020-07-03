package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.UUID;

public class Survey {

    @Id
    @NotNull
    private UUID userid;

    @Id
    @NotNull
    private UUID qid;

    private boolean answer;

    protected Survey(){}

    public Survey(boolean answer){
        this.answer = answer;
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
}