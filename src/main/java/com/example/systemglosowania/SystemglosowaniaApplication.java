package com.example.systemglosowania;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.systemglosowania.*")
@EnableJpaRepositories
@Configuration
public class SystemglosowaniaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SystemglosowaniaApplication.class, args);
    }

}
