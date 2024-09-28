package com.example.demo.member.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "TB_MEMBER")
@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Member {
	
	@Id
	private int memNo;
	
	@Column(name = "MEM_ID")
	private String memId;
	
	@Column(name = "MEM_PWD")
	private String memPwd;
	private String memNickname;
	private String memEmail;
	private String joinDate;
	private String memSort;  // 회원구분
	private String memStatus;
	
	// TB_MEM_PROFILE
    private String myMsg;
    private String memProfile;
	
}
