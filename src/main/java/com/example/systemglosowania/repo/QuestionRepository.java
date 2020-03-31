package com.example.systemglosowania.repo;

import com.example.systemglosowania.model.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

// czy potrzebuję tego typu pliki?
@Repository
public interface QuestionRepository extends CrudRepository<Question, UUID> {

//    List<Question> findByDeadline(Date deadline);
//    Question findByQId(UUID qId);

}
