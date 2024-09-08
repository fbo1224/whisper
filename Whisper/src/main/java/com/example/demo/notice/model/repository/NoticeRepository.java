package com.example.demo.notice.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.notice.model.vo.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{
	
	// JPA 사용하여 조회
	

}
