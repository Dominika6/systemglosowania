package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.UUID;

//@Entity
//@Table(name="survey")
public class Survey {

    @Id
    @NotNull
//    @Column(name="userid")
    private UUID userId;

    @Id
    @NotNull
//    @Column(name="qid")
    private UUID qId;

//    @Column(name="answer")
    private boolean answer;

    protected Survey(){}

    public Survey(UUID userId, UUID qId, boolean answer) {
        this.userId = userId;
        this.qId = qId;
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Survey [ userId = ' " + userId +" ', qId = ' " + userId + " ', answer= ' " + answer + " ' ]";
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