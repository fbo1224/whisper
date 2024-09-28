package com.example.demo.member.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "TB_MEM_PROFILE")
@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MemberProfile {
	
	@Id
    private int id;

    @Column(name = "MEM_NO")
    private Long memNo;

    private String myMsg;
    private String memProfile;

    @ManyToOne
    @JoinColumn(name = "MEM_NO", referencedColumnName = "memNo", insertable = false, updatable = false)
    private Member member;

}
