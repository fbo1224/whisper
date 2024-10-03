import React from 'react';
import '../../css/common/footer.css'

const Footer = () => {
  return (
    <footer id="footer">
      <div id="footerWrap">
        <div id="footer_2">
          <p>개인정보보호정책 &nbsp;|&nbsp;이용약관 &nbsp;|&nbsp;청소년보호정책 &nbsp;|&nbsp;©2024 Whisper</p>
        </div>
        <div id="footer_3">
          <p>
            (주) 위스퍼
            <br />
            주소 : 서울특별시 중구 남대문로 120 그레이츠 청계(구 대일빌딩) 2F <br />
            대표이사 : 유동혁 | 책임자 : 유동혁 ｜ 개인정보관리책임자 : 유동혁
            <br />
            전자우편주소 : help@whisper.kr | 전화번호 : 1544-9970
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
