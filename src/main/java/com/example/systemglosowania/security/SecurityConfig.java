package com.example.systemglosowania.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


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
//                .formLogin()
//                    .and()
//                .logout()
//                    .permitAll()
//                    .and()
                .httpBasic()
                    .and()
//                .sessionManagement()
//                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                    .and()
                .logout()
                    .deleteCookies("JSESSIONID")
                ;

        http
                .csrf()
                    .disable();

    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
//        return source;
//    }


//    @Bean
//    public UserDetailsService userDetailsService(){
//        UserDetails user = User.withDefaultPasswordEncoder()
//                .username("user@student.uj.edu.pl")
//                .password("user")
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.withDefaultPasswordEncoder()
//                .username("admin@student.uj.edu.pl")
//                .password("admin")
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(user, admin);
//    }

}
