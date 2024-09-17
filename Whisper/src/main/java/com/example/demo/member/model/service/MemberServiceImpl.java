package com.example.demo.member.model.service;

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
		
		System.out.println(foundMember);
		
		
		return foundMember;
	}

}
