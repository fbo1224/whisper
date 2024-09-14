package com.example.demo.member.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // React가 실행되는 도메인
public class TestController {
	
    @GetMapping("/data")
    public String getData() {
        return "responseTestCodeSuccessful";
    }
}

