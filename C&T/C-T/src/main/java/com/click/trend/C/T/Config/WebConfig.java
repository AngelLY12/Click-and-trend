package com.click.trend.C.T.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/products/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS")
                .allowCredentials(true);

        registry.addMapping("/api/v1/user/**")
                .allowedOrigins("http://localhost:4200") // o el puerto donde corre tu frontend
                .allowedMethods("PATCH", "GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);

    }
}