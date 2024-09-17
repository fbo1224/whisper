package com.example.demo.member.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.member.model.vo.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
	
	Member findByMemIdAndMemPwd(String memId, String memPwd);
	
}
