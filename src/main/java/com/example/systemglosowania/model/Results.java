package com.example.systemglosowania.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@JsonSerialize
@Getter
@Setter
public class Results {

    private UUID qid;
    private int tru;
    private int fals;
    private String question;
    private Date deadline;

    public Results(){}

    public Results(UUID qid, String question, Date deadline, int tru, int fals){
        this.qid = qid;
        this.question = question;
        this.deadline = deadline;
        this.tru = tru;
        this.fals = fals;
    }
}