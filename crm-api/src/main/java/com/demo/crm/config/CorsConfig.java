package com.demo.crm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5000",   // shell —— 这个是关键
                        "http://localhost:5001",
                        "http://localhost:5002",
                        "http://localhost:5011")
                .allowedMethods("GET");
    }
}