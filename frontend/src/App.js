import React, { useState, useEffect } from 'react';  // React와 훅을 임포트
import axios from 'axios';  // axios를 임포트
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 사용을 위한 CSS import
import { Modal, Button } from 'react-bootstrap'; // Bootstrap의 Modal 사용
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 임포트


import './App.css';
import profileImg from './images/profile.png';
import logoImg from './images/Logo.png';



const App = () => {
  /*로그인*/
  const [loginId, setLoginId] = useState(''); // 로그인 ID 상태
  const [loginPwd, setLoginPwd] = useState(''); // 로그인 비밀번호 상태
  const [modifyMsg, setModifyMsg] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인한 사용자 정보 상태
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가
  const [friends, setFriends] = useState([]); // 친구 목록 상태
  const [selectedFriend, setSelectedFriend] = useState(null); // 선택된 친구 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 상태 관리 (on/off 상태, 로그인 모달, 프로필 모달, 상태메시지 모달)
  const [isOn, setIsOn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("현재 상태메시지");

  // useNavigate 훅 사용
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    setCurrentUser(null); // currentUser를 null로 설정
    setFriends([]); // 친구 목록 초기화
};

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
        setCurrentUser(response.data); // 응답 데이터에서 사용자 정보 저장
        handleLoginClose(); // 모달 닫기
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        setErrorMessage(error.response?.data.message || '로그인에 실패하였습니다.'); // 서버로부터 받은 메시지 또는 기본 메시지
      });
  };
  /*로그인한 사용자 확인*/
  useEffect(() => {
    if (currentUser) {
      console.log('로그인한 사용자 :', currentUser);
    }
  }, [currentUser]);
  
  useEffect(() => { // 친구 목록 가져오기
    setLoading(true);
    if (currentUser && currentUser.memNo) {
      const memNo = currentUser.memNo;
  
      axios.get(`http://localhost:9001/member/friends?memNo=${memNo}`,{
        withCredentials: true // 인증 정보를 포함
      })
        .then(response => {
          console.log('친구 목록 데이터data:', response.data); // 응답 데이터 확인
          setFriends(response.data || []);
        })
        .catch(error => {
          console.error("Friend List Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // 친구를 클릭했을 때 실행되는 함수
  const handleFriendClick = (friend) => {
    if (friend) {
      setSelectedFriend(friend); // 선택된 친구 상태를 업데이트
      console.log('선택된 친구:', friend); // 클릭된 친구 정보를 콘솔에 출력
    } else {
      console.error("Clicked friend is undefined");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  const handleOnOff = () => {
    setIsOn(prevState => !prevState);
  };

  // 회원가입 페이지로 이동하는 함수
  const handleJoin = () => {
    navigate('/memberJoin'); // "/join" 경로로 페이지 이동
  };
  
  /*모달*/
  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);

  const handleProfileClose = () => setShowProfileModal(false);
  const handleProfileShow = () => setShowProfileModal(true);

  const handleMsgClose = () => setShowMsgModal(false);
  const handleMsgShow = () => setShowMsgModal(true);

  const handleMsgSubmit = (event) => {
    event.preventDefault();
    
    // 상태 메시지를 서버에 보내는 로직
    if (currentUser && currentUser.memNo) {
      const memNo = currentUser.memNo;
      axios.post(`http://localhost:9001/member/modifyMsg`, {
        memNo: memNo,
        myMsg: modifyMsg // 변경된 상태 메시지
      }, {
        headers: {
        'Content-Type': 'application/json', // Content-Type 설정
      },
        withCredentials: true // 쿠키를 포함하도록 설정
      })
      .then(response => {
        console.log('상태 메시지 변경 성공:', response.data);
        setModifyMsg(modifyMsg);
        alert(`상태 메시지가 변경되었습니다: ${modifyMsg}`);
      })
      .catch(error => {
        console.error('상태 메시지 변경 실패:', error);
        alert('상태 메시지 변경에 실패했습니다.');
      })
      .finally(() => {
        handleMsgClose(); // 모달 닫기
      });
    }
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
          <img id="logo" src={logoImg} alt='LOGO'/>
        </div>

        <div id="header_2">
          <div
            id="onOffDiv"
            style={{
              backgroundColor: isOn ? 'greenyellow' : 'red',
              width: '30px',
              height: '30px',
            }}
          ></div>

          <div id="loginArea">
            {currentUser != null ? (
              <>
              <button className="headerBtn" onClick={handleOnOff}>
                ON/OFF
              </button>
              <button className="headerBtn" onClick={handleLogout}>
                LOGOUT
              </button>
              </>
            ) : (
              <>
              <button className="headerBtn" onClick={handleJoin}>
                JOIN
              </button>
              <button className="headerBtn" onClick={handleLoginShow}>
                LOGIN
              </button>
              </>
            )}
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
            <div id="friendListTitle"><span>친구목록</span></div>
            <div id="myFriend"><span id="myFriend">({friends.filter(friend => friend.memStatus === 'Y').length}/{friends.length})</span></div>
          </div>

          {/* 친구 목록을 div로 동적으로 렌더링, 각 div에 onClick 이벤트 추가 */}
          <div className="friendContainer">
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <div 
                  key={index} 
                  className="friendDiv"
                  onClick={() => handleFriendClick(friend)} // 클릭 이벤트로 친구를 선택
                >
                  <span>{friend.memNickname}</span>
                  <span>{friend.memStatus}</span>
                </div>
              ))
            ) : (
              <p>친구 목록이 없습니다.</p>
            )}
          </div>

      {/* 선택된 친구가 있을 경우 정보 표시 */}
      {selectedFriend && (
        <div class="friendClickDiv">
          <span>선택한 친구: {selectedFriend.memNickname}</span>
          <button class="chatBtn">채팅하기</button>
        </div>
      )}

        </div>

        {/* 내 정보 */}
        <div id="myInfo">
          <div id="profile">
            <img id="profileImg" src={currentUser ? currentUser.memProfile : profileImg} alt="Profile" />
            <div id="myMsg">{currentUser ? currentUser.myMsg : '상태메시지'}</div>
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
              placeholder={currentUser ? currentUser.myMsg : statusMessage}
              value={modifyMsg}
              onChange={(e) => setModifyMsg(e.target.value)} // 입력값 변경 처리
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
    </div>

  );
}

export default App;
