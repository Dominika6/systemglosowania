package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.UUID;

public class Survey {

    @Id
    @NotNull
    private UUID userId;

    @Id
    @NotNull
    private UUID qId;

    private boolean answer;

    protected Survey(){}

    public Survey(boolean answer){
        this.answer = answer;
    }

    public Survey(UUID userId, UUID qId, boolean answer) {
        this.userId = userId;
        this.qId = qId;
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "" + answer + "";
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getqId() {
        return qId;
    }

    public boolean isAnswer() {
        return answer;
    }
}