package com.example.systemglosowania.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


@Entity
@Table(name="questions")
public class Question {

    @Id
    @Column(name="qid")
    @GeneratedValue
    private UUID qId;

    @NotNull
    @Column(name="question")
    private String question;

    @NotNull
    @Column(name="deadline")
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
    // %tF 	ISO 8601 formatted date with “%tY-%tm-%td“.


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
