// import React from 'react';

import React, { useState, useEffect } from 'react';  // React와 훅을 임포트
import axios from 'axios';  // axios를 임포트

import './App.css';  // 스타일링을 위해 별도의 CSS 파일을 연결합니다.

function App() {
  const [data, setData] = useState('');
  
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Whisper</h1>
        <p>
          This is a simple home page built with React.
        </p>
        <button onClick={() => alert("Button Clicked!")}>Click Me</button>
      </header>

      <section className="App-section">
        <h2>About Us</h2>
        <p>
          We provide awesome web development solutions. Our team is passionate about technology and innovation.
        </p>
        <img src="https://via.placeholder.com/300" alt="Placeholder" />
      </section>

      <h1>Data from Backend</h1>
      <p>{data}</p> {/* 백엔드로부터 받은 데이터를 화면에 표시 */}
  
    </div>

  );
}

export default App;
