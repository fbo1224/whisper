import React, { useState } from 'react';
import '../../css/member/memberJoin.css';
import Header from '../common/header';
import Footer from '../common/footer';
import axios from 'axios';

const MemberJoin = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [codeInfo, setCodeInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async () => {
    alert('이메일로 전송된 4자리 숫자코드를 입력해주세요');
    try {
      const result = await axios.post('sendMail', { email: userEmail });
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
    // 여기서 폼 제출 로직을 추가할 수 있습니다.
    // 예: axios.post('/api/member', { userName, userEmail });
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
                  <input/>
                </td>
                <td></td>
              </tr>

              <tr>
                <td>PASSWORD</td>
                <td>
                  <input/>
                </td>
                <td></td>
              </tr>


              <tr>
                <td>NICKNAME</td>
                <td>
                  <input
                    type="text"
                    maxLength="5"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => {
                      const memNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{2,15}$/;
                      if (!memNameReg.test(userName)) {
                        setErrorMessage('');
                      } else {
                        setErrorMessage('');
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
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    onKeyUp={() => {
                      const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                      if (emailReg.test(userEmail)) {
                        document.getElementById('emailArea').innerHTML = '<button class="btn btn-sm btn-primary" type="button" onClick={emailCheck}>중복확인</button>';
                      }
                    }}
                  />
                </td>
                <td id="emailArea"></td>
              </tr>
            </tbody>
          </table>

          <br /><br />

          <div align="center">
            <button type="reset" className="btn btn-sm btn-secondary">재입력</button>
            <button type="submit" className="btn btn-sm btn-primary" disabled id="memJoin">입력완료</button>
          </div>

          <input type="hidden" name="userNickname" value="" />
          <input type="hidden" name="userProfile" value="" />

          <br /><br />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MemberJoin;
