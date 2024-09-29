package com.example.demo.member.model.vo;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
    private int memNo;  // memNo를 기본키로 설정하여 Member와 공유

    @OneToOne
    @MapsId  // memNo를 통해 Member와 관계를 매핑
    @JsonBackReference  // 자식으로서 순환 참조 방지
    private Member member;  // 해당 프로필에 연결된 회원
    
    @Column(name = "MY_MSG")
    private String myMsg;
    
    @Column(name = "MEM_PROFILE")
    private String memProfile;
}
