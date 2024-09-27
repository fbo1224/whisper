package com.example.demo.member.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.member.model.service.MemberService;
import com.example.demo.member.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController // @Controller 대신 사용
@RequiredArgsConstructor
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestMemberController {
	
	private final MemberService memberService;
	
	@PostMapping("/loginUser")
	public ResponseEntity<?> userLogin(@RequestBody Member member, HttpSession session) {
		
		Member loginUser = memberService.findByMemIdAndMemPwd(member);
		
		if (loginUser != null) {
			session.setAttribute("loginUser", loginUser);
			return ResponseEntity.ok(loginUser); // 로그인 성공 시 사용자 정보를 반환
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("message", "로그인에 실패하였습니다."));
		}
	}
	
	
	@GetMapping("/friends")
	public List<Member> selectFriends(int memNo){
		
		System.out.println("로그인한 사용자 memNo : " + memNo);
		
		List<Member> friendList = memberService.selectFriends(memNo);
		
		System.out.println("조회된 친구목록 : " + friendList);
		
		return friendList;
		
	}
	
	
}
