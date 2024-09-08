package com.example.demo.notice.model.vo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Notice {
	
	@Id
	private int notNo;
	
	private int notWriter;
	private String notTitle;
	private String notContent;
	private String notDate;
	private String notStatus;
	
	
}
