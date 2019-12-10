package com.diaosu.quickfile;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.diaosu.quickfile.mapper")
@SpringBootApplication
public class QuickFileApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickFileApplication.class, args);
    }

}
