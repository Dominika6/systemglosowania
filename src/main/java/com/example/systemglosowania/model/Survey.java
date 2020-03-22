package com.example.systemglosowania.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Survey {

    private final UUID userId;

    private final UUID qId;

    private final boolean answer;

    public Survey(@JsonProperty("userId") UUID userId,
                  @JsonProperty("qId") UUID qId,
                  @JsonProperty("answer") boolean answer) {
        this.userId = userId;
        this.qId = qId;
        this.answer = answer;
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