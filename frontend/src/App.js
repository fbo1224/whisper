// import React from 'react';

import React, { useState, useEffect } from 'react';  // React와 훅을 임포트
import axios from 'axios';  // axios를 임포트
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 사용을 위한 CSS import
import { Modal, Button } from 'react-bootstrap'; // Bootstrap의 Modal 사용

import './App.css';
import profileImg from './images/profile.png';



const App = () => {
  const [data, setData] = useState('');
  /*로그인*/
  const [loginId, setLoginId] = useState(''); // 로그인 ID 상태
  const [loginPwd, setLoginPwd] = useState(''); // 로그인 비밀번호 상태
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가


  const handleLoginSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    // 백엔드에 로그인 요청
    axios.post('http://localhost:9001/member/loginUser', {
      memId: loginId,
      memPwd: loginPwd,
    }, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    })
      .then(response => {
        console.log('로그인 성공:', response.data);
        // 로그인 성공 시 처리
        handleLoginClose(); // 모달 닫기
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        setErrorMessage(error.response?.data.message || '로그인에 실패하였습니다.'); // 서버로부터 받은 메시지 또는 기본 메시지
      });
  };
  

  useEffect(() => {

    // 백엔드 API에 GET 요청
    axios.get('http://localhost:9001/api/data')
      .then(response => {
        setData(response.data); // 받은 데이터를 상태에 저장
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });

      

  }, []);  // 빈 배열로 설정하면 컴포넌트가 처음 렌더링될 때 한 번 실행됨

  // 상태 관리 (on/off 상태, 로그인 모달, 프로필 모달, 상태메시지 모달)
  const [isOn, setIsOn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("현재 상태메시지");

  const handleOnOff = () => {
    setIsOn(prevState => !prevState);
  };
  /*모달*/
  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);

  const handleProfileClose = () => setShowProfileModal(false);
  const handleProfileShow = () => setShowProfileModal(true);

  const handleMsgClose = () => setShowMsgModal(false);
  const handleMsgShow = () => setShowMsgModal(true);

  const handleMsgChange = (event) => {
    setStatusMessage(event.target.value);
  };

  const handleMsgSubmit = (event) => {
    event.preventDefault();
    // 상태 메시지를 서버에 보내는 로직 추가 가능
    alert(`상태 메시지가 변경되었습니다: ${statusMessage}`);
    handleMsgClose();
  };


  return (
    <div className="App">
      <div>
      {/* 메시지 표시 */}
      <div id="flashMessage">
        {/* flashMessage 기능 추가 필요 */}
      </div>

      {/* 헤더 */}
      <header id="header">
        <div id="header_1">
          <span id="title">WHISPER</span>
        </div>

        <div id="header_2">
          <div
            id="onOffDiv"
            style={{
              backgroundColor: isOn ? 'greenyellow' : 'red',
              width: '50px',
              height: '50px',
            }}
          ></div>

          <div id="loginArea">
            <button className="headerBtn" onClick={handleOnOff}>
              ON/OFF
            </button>
            <button className="headerBtn" onClick={handleLoginShow}>
              LOGIN
            </button>
          </div>
        </div>
      </header>

      {/* 로그인 모달 */}
      <Modal show={showLoginModal} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* 오류 메시지 표시 */}
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)} // 입력값 변경 처리
              maxLength="12"
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={loginPwd}
              onChange={(e) => setLoginPwd(e.target.value)} // 입력값 변경 처리
              maxLength="15"
              required
            />
            <Modal.Footer>
              <Button type="submit" variant="outline-warning">
                확인
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* 콘텐츠 */}
      <main id="content">
        {/* 친구 목록 */}
        <div id="friendList">
          <div id="friendTitle">
            <span id="friendListTitle">친구목록</span>
          </div>
          <div id="myFriendTitle">
            <span id="myFriend">(1/10)</span>
          </div>
        </div>

        {/* 내 정보 */}
        <div id="myInfo">
          <div id="profile">
            <img id="profileImg" src={profileImg} alt="Profile" />
          </div>

          <div id="infoLink">
            <button className="profileModifyBtn" onClick={handleProfileShow}>
              프로필 변경
            </button>
            <button className="profileModifyBtn" onClick={handleMsgShow}>
              상태메시지 변경
            </button>
          </div>
        </div>
      </main>

      {/* 프로필 변경 모달 */}
      <Modal show={showProfileModal} onHide={handleProfileClose}>
        <Modal.Header closeButton>
          <Modal.Title>프로필 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" required />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="outline-warning">
            확인
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 상태메시지 변경 모달 */}
      <Modal show={showMsgModal} onHide={handleMsgClose}>
        <Modal.Header closeButton>
          <Modal.Title>상태 메시지 변경</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleMsgSubmit}>
          <Modal.Body>
            <input
              type="text"
              value={statusMessage}
              onChange={handleMsgChange}
              maxLength="13"
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-warning">
              확인
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* 푸터 */}
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
    </div>

      <h1>Data from Backend</h1>
      <p>{data}</p> {/* 백엔드로부터 받은 데이터를 화면에 표시 */}
  
    </div>

  );
}

export default App;
