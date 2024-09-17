package com.example.demo.member.model.service;

import org.springframework.stereotype.Service;

import com.example.demo.member.model.vo.Member;

@Service
public interface MemberService {
	
	Member findByMemIdAndMemPwd(Member member);
	
}
