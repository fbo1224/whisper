package com.example.demo.member.model.vo;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
	private Date joinDate;
	private String memSort;  // 회원구분
	private String memStatus;
	
	@OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
	@JsonManagedReference  // 부모로서 순환 참조 방지
    private MemberProfile memberProfile;  // 해당 회원에 연결된 프로필
	
}
