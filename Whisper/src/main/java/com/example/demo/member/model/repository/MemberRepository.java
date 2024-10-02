package com.example.demo.member.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.member.model.vo.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
	
	Member findByMemId(String memId);
	
	// Native Query
	@Query(value = "SELECT * FROM TB_MEMBER m WHERE m.MEM_NO IN (SELECT f.FRI_NO FROM TB_FRIEND f WHERE f.MEM_NO = :memNo)", nativeQuery = true)
    List<Member> findMembersWithFriends(@Param("memNo") int memNo);
	
	@Transactional
	@Modifying
	@Query("UPDATE Member m SET m.myMsg = :myMsg WHERE m.memNo = :memNo")
	int updateMyMsgByMemNo(@Param("myMsg") String myMsg, @Param("memNo") int memNo);
}
