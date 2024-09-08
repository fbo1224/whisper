package com.example.demo.notice.model.vo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.ToString;

@Entity
@Table(name = "TB_NOTICE")
@ToString
public class Notice {
	
	@Id
	private Long notNo;
	
	private int notWriter;
	private String notTitle;
	private String notContent;
	private String notDate;
	private String notStatus;
	
	
}
