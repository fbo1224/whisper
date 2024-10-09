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
  const [nnErrorMessage, setNnErrorMessage] = useState('');
  const [pwdErrorMessage, setPwdErrorMessage] = useState('');
  const [joinReadonly, setJoinReadonly] = useState({
    id: false,
    email: false,
  });

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
                    maxLength="12"
                    required
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    autoFocus
                    placeholder='4자리 이상 입력'
                    onBlur={() => {
                      const memIdReg = /^[a-zA-Z0-9]{4,12}$/;
                      if (!memIdReg.test(joinPwd)) {
                        setJoinId('');
                      }
                    }}
                  />
                </td>
                <td id="idArea"><button class="joinCheckBtn" type="button" /*onClick={idCheck}*/>중복확인</button></td>
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
                    placeholder='4자리 이상 입력'
                    onKeyUp={() => {
                      const memPwdReg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9!@#$%^&~]{4,10}$/;

                      if (!memPwdReg.test(joinPwd)) {
                        setPwdErrorMessage('✗');
                      } else {
                        setPwdErrorMessage('✓');
                      }
                    }}
                    onBlur={() => {
                      const memPwdReg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9!@#$%^&~]{4,10}$/;

                      if (!memPwdReg.test(joinPwd)) {
                        setJoinPwd('');
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td>{pwdErrorMessage && <span style={{ color: pwdErrorMessage === '✗' ? 'red' : 'green' }}>{pwdErrorMessage}</span>}</td>
              </tr>


              <tr>
                <td>NICKNAME</td>
                <td>
                  <input
                    type="text"
                    maxLength="15"
                    required
                    value={joinNickname}
                    onChange={(e) => setJoinNickname(e.target.value)}
                    onKeyUp={() => {
                      const memNicknameReg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9!@#$%^&~]{4,15}$/;
                      if (!memNicknameReg.test(joinNickname)) {
                        setNnErrorMessage('✗');
                      } else {
                        setNnErrorMessage('✓');
                      }
                    }}
                    onBlur={() => {
                      const memNicknameReg = /^[a-zA-Z0-9!@#$%^&~*()<>-_+=]{4,15}$/;
                      if (!memNicknameReg.test(joinNickname)) {
                        setJoinNickname('');
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td>{nnErrorMessage && <span style={{ color: nnErrorMessage === '✗' ? 'red' : 'green' }}>{nnErrorMessage}</span>}</td>
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
                    onBlur={() => {
                      const memEmailReg = /^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{4,}\.[a-zA-Z]{2,}$/;
                      if (!memEmailReg.test(joinPwd)) {
                        setJoinEmail('');
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td id="emailArea"><button class="joinCheckBtn" type="button">메일인증</button></td>
              </tr>
            </tbody>
          </table>

          <br /><br />

          <div align="center">
            <button type="submit" className="btn btn-sm btn-primary" disabled id="memJoin">회원가입</button>
          </div>

        </form>
      </div>
      <Footer />
    </>
  );
};

export default MemberJoin;
