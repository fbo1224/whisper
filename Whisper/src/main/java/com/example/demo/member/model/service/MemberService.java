package com.example.demo.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.member.model.vo.Member;

@Service
public interface MemberService {
	
	Member findByMemId(String memId);
	
	List<Member> selectFriends(int memNo);
}
