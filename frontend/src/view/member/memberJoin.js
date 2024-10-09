import React, { useState } from 'react';
import '../../css/member/memberJoin.css';
import Header from '../common/header';
import Footer from '../common/footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

const MemberJoin = () => {
  const [joinId, setJoinId] = useState('');
  const [joinPwd, setJoinPwd] = useState('');
  const [joinNickname, setJoinNickname] = useState('');
  const [joinEmail, setJoinEmail] = useState('');

  const [nnErrorMessage, setNnErrorMessage] = useState('');
  const [pwdErrorMessage, setPwdErrorMessage] = useState('');
  const [joinReadonly, setJoinReadonly] = useState({
    id: false,
    email: false,
  });

  // ID 중복확인
  const idCheck = () => {

    const idInput = $('#idInput');
  
    axios.post('http://localhost:9001/member/idCheck', { memId: joinId }) // 일반적으로 POST방식은 데이터를 요청본문에 담기 때문에 JSON사용
      .then(response => {
        if (response.data === 1) {
          alert('사용 가능한 ID입니다.');
          idInput.attr('readonly', true);
        } else {
          alert('이미 사용 중인 ID입니다.');
          setJoinId('');
          idInput.focus();
        }
      })
      .catch(error => {
        console.error('ID 체크 중 오류 발생:', error);
        alert('ID 체크에 실패했습니다. 다시 시도해 주세요.');
      });
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
                    id="idInput"
                    type="text"
                    maxLength="12"
                    required
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    autoFocus
                    placeholder='4자리 이상 입력'
                    onBlur={() => {
                      const memIdReg = /^[a-zA-Z0-9]{4,12}$/;
                      if (!memIdReg.test(joinId)) {
                        setJoinId('');
                      }
                    }}
                  />
                </td>
                <td id="idArea"><button class="joinCheckBtn" type="button" onClick={idCheck}>중복확인</button></td>
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
                      if (!memEmailReg.test(joinEmail)) {
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
