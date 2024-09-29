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
	public Member findByMemIdAndMemPwd(Member member) {
		
		String memId = member.getMemId();
		String memPwd = member.getMemPwd();
		
		Member foundMember = memberRepository.findByMemIdAndMemPwd(memId, memPwd);
		
		System.out.println("login select해온값 : " + foundMember);
		
		
		return foundMember;
	}


	@Override
	public List<Member> selectFriends(int memNo) {
		return memberRepository.findMembersWithFriends(memNo);
	}
	
	

}
