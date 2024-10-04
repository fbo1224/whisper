package com.example.demo.member.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.member.model.vo.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
	
	// 로그인
	Member findByMemId(String memId);
	
	// 친구목록 가져오기
	// Native Query
	@Query(value = "SELECT * FROM TB_MEMBER m WHERE m.MEM_NO IN (SELECT f.FRI_NO FROM TB_FRIEND f WHERE f.MEM_NO = :memNo)", nativeQuery = true)
    List<Member> findMembersWithFriends(@Param("memNo") int memNo);
	
	// 상태메시지 변경
	@Modifying
	@Query("UPDATE Member m SET m.myMsg = :myMsg WHERE m.memNo = :memNo")
	int updateMyMsgByMemNo(@Param("memNo") int memNo, @Param("myMsg") String myMsg);
}
