package com.example.demo.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.member.model.repository.MemberRepository;
import com.example.demo.member.model.vo.Member;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	
	
	@Override
	public Member findByMemId(String memId) {
		
		Member foundMember = memberRepository.findByMemId(memId);
		
		System.out.println("login select해온값 : " + foundMember);
		
		return foundMember;
	}


	@Override
	public List<Member> selectFriends(int memNo) {
		return memberRepository.findMembersWithFriends(memNo);
	}
	
	

}
