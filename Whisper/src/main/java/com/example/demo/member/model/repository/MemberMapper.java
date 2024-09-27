package com.example.demo.member.model.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.member.model.vo.Member;

@Mapper
public interface MemberMapper {
	
	List<Member> selectFriends(int memNo);
	
	
	
	
	
}
