package com.example.systemglosowania.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.hibernate.criterion.Restrictions.and;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public UserDetailsService userDetailsService(){
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("user")
                .roles("USER")
                .build();

        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("admin")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/user/updateUserEmail/**", "/api/user/updateUserName/**", "/api/user/updatePassword/**",
                        "/api/questions/getAllQuestions", "/api/questions/getQuestionById",
                        "/api/survey/addAnswer/**", "/api/survey/getMyAnswers/**").hasRole("USER")
                .antMatchers("/api/user/**", "/api/questions/**", "/api/survey/getResultByQId/**").hasRole("ADMIN")

                .and()
                .formLogin().permitAll()
                .and()
                .logout().permitAll()
                .and()
                .httpBasic()




//                    .and()
//                .formLogin()
//                    .usernameParameter("username")  // TODO jakoś wpisywać tutaj email i hasło każdego usera
//                    .passwordParameter("password")  // przy weryfikacji pamiętać, że hasło jest haszowane - crypt();
//                    .loginPage("/login")
//                    .defaultSuccessUrl("/home")
//                    .permitAll()
//                    .and()
//                .logout()
//                    .clearAuthentication(true)
//                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                    .logoutUrl("/logout")
//                    .invalidateHttpSession(true)
////                    .deleteCookies("JSESSIONID")
//                    .logoutSuccessUrl("/login")
//                    .permitAll()
                .and()
                .csrf().disable();  //dzięki tej linijce działają POST PUT i DELETE przez zewnętrzny program jakim jest postman

    }
}
