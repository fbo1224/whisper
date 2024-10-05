import React, { useState } from 'react';
import '../../css/member/memberJoin.css';
import Header from '../common/header';
import Footer from '../common/footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 사용을 위한 CSS import

const MemberJoin = () => {
  const [joinId, setJoinId] = useState('');
  const [joinPwd, setJoinPwd] = useState('');
  const [joinNickname, setJoinNickname] = useState('');
  const [joinEmail, setJoinEmail] = useState('');

  const [codeInfo, setCodeInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async () => {
    alert('이메일로 전송된 4자리 숫자코드를 입력해주세요');
    try {
      const result = await axios.post('sendMail', { email: joinEmail });
      setCodeInfo(result.data);
    } catch (error) {
      alert('메일 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const codeCheck = () => {
    const emailCode = document.getElementById('code').value;

    if (codeInfo !== emailCode) {
      alert('인증번호가 일치하지 않습니다!');
      sendEmail();
    } else {
      alert('인증번호가 일치합니다');
      document.getElementById('memJoin').disabled = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9001/member/user.join', {
      memId: joinId,
      memPwd: joinPwd,
      memNickName: joinNickname,
      memEmail: joinEmail,
    }, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    })
      .then(response => {
        console.log('회원가입 성공:', response.data);
        // 로그인 성공 시 처리
        // setCurrentUser(response.data); // 응답 데이터에서 사용자 정보 저장
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
      });
  };

  return (
    <>
      <Header />
      <div id="wrap">
        <form id="enroll-form" onSubmit={handleSubmit}>
          <table align="center" id="table">
            <tbody>

            <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    maxLength="10"
                    required
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    autoFocus
                  />
                </td>
                <td id="idArea"><button class="btn btn-sm btn-primary" type="button" /*onClick={idCheck}*/>중복확인</button></td>
              </tr>

              <tr>
                <td>PASSWORD</td>
                <td>
                  <input
                    type="password"
                    maxLength="10"
                    required
                    value={joinPwd}
                    onChange={(e) => setJoinPwd(e.target.value)}
                    onBlur={() => {
                      const memNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{2,10}$/;
                      if (!memNameReg.test(joinPwd)) {
                        setErrorMessage('X');
                      } else {
                        setErrorMessage('O');
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td>{errorMessage && <span>{errorMessage}</span>}</td>
              </tr>


              <tr>
                <td>NICKNAME</td>
                <td>
                  <input
                    type="text"
                    maxLength="10"
                    required
                    value={joinNickname}
                    onChange={(e) => setJoinNickname(e.target.value)}
                    onBlur={() => {
                      const memNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{2,10}$/;
                      if (!memNameReg.test(joinNickname)) {
                        setErrorMessage('X');
                      } else {
                        setErrorMessage('O');
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td>{errorMessage && <span>{errorMessage}</span>}</td>
              </tr>

              <tr>
                <td>EMAIL</td>
                <td>
                  <input
                    type="text"
                    placeholder="@포함하여 입력해주세요."
                    required
                    value={joinEmail}
                    onChange={(e) => setJoinEmail(e.target.value)}
                  />
                </td>
                <td id="emailArea"><button class="outline-warning" type="button">메일인증</button></td>
              </tr>
            </tbody>
          </table>

          <br /><br />

          <div align="center">
            <button type="reset" className="btn btn-sm btn-secondary">재입력</button>
            <button type="submit" className="btn btn-sm btn-primary" disabled id="memJoin">입력완료</button>
          </div>

          <br /><br />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MemberJoin;
