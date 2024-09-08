package com.example.demo.member.model.vo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Member {
	
	@Id
	private int memNo;
	
	private String memId;
	private String memPwd;
	private String memNickname;
	private String memEmail;
	private String joinDate;
	private String memSort;  // 회원구분
	private String memStatus;
	
}
