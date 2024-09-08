package com.example.demo.notice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.notice.model.service.NoticeService;
import com.example.demo.notice.model.vo.Notice;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
	
    private final NoticeService noticeService;
    
    @GetMapping
    public void findAll() {
    	List<Notice> noticeList = 
    }

    /*
    // 생성자를 통해 의존성 주입(Autowired 생략)
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }
    (lombok RequiredArgsConstructor 애노테이션을 사용하여 생략)
    */
	

}
