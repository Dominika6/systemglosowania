package com.example.systemglosowania;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.systemglosowania.*")
@EnableJpaRepositories
public class SystemglosowaniaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SystemglosowaniaApplication.class, args);
    }

}
