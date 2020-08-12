package com.example.systemglosowania.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                .cors().and()
                .authorizeRequests()
//                    .antMatchers("/api/user/updateUserEmail/**", "/api/user/updateUserName/**", "/api/user/updatePassword/**",
//                        "/api/questions/getAllQuestions", "/api/questions/getQuestionById",
//                        "/api/survey/addAnswer/**", "/api/survey/getMyAnswers/**").hasRole("USER")
//                    .antMatchers("/api/user/**", "/api/questions/**", "/api/survey/getResultByQId/**").hasRole("ADMIN")
                    .antMatchers("api/**").permitAll()
                    .and()
                .httpBasic()
                    .and()
                .logout()
                    .deleteCookies("JSESSIONID");

        http
                .csrf()
                    .disable();

    }
}
