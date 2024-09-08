package com.example.demo.notice.model.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.notice.model.vo.Notice;

@Mapper
public interface NoticeMapper {
	
	// MyBatis 사용하여 조회
	
	List<Notice> findAll();
}
