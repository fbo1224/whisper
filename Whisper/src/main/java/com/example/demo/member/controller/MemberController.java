package com.example.demo.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.member.model.service.MemberService;
import com.example.demo.member.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService memberService;
	
	@PostMapping("loginUser")
	public String userLogin(Member member, HttpSession session, RedirectAttributes redirectAttributes) {
		
		System.out.println("member(login) : " + member);
		
		Member loginUser = memberService.findByMemIdAndMemPwd(member);
		
		if(loginUser != null) {
			session.setAttribute("loginUser", loginUser);
			return "redirect:/";
		} else {
	        redirectAttributes.addFlashAttribute("message", "로그인에 실패하였습니다.");
	        return "redirect:/login";
		}
	}
	
	@GetMapping("msgModify")
	public String modifyMsg() {
		
		return "";
	}
	
}
