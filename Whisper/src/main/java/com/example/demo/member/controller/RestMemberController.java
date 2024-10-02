package com.example.demo.member.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestMemberController {
	
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	
	@PostMapping("/loginUser")
	public ResponseEntity<?> userLogin(@RequestBody Member member, HttpSession session) {
		String memId = member.getMemId();
		String memPwd = member.getMemPwd(); // 인스턴스 메서드 호출
		
		System.out.println(passwordEncoder.encode(memPwd));
		
		Member loginUser = memberService.findByMemId(memId);
		
		if (loginUser != null && passwordEncoder.matches(memPwd, loginUser.getMemPwd())) {
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
