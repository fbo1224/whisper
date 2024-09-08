package com.example.demo.notice.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.notice.model.repository.NoticeMapper;
import com.example.demo.notice.model.repository.NoticeRepository;
import com.example.demo.notice.model.vo.Notice;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
	
	private final NoticeRepository noticeRepository;
	private final NoticeMapper noticeMapper;

	@Override
	public List<Notice> findAll() {
//		System.out.println(noticeRepository.findById((long)3)); JPA
//		return noticeRepository.findAll();  JPA
		return noticeMapper.findAll(); //MyBatis
	}

}
