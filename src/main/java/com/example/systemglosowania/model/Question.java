package com.example.systemglosowania.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.UUID;

public class Question {

    private final UUID qId;

    @NotBlank
    private final String question;

    @NotBlank
    private final Date deadline;

    public Question(@JsonProperty("qId") UUID qId,
                    @JsonProperty("question") String question,
                    @JsonProperty("deadline")Date deadline){
        this.qId = qId;
        this.question = question;
        this.deadline = deadline;
    }


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
