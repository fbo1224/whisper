import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'; // BrowserRouter 임포트
import MemberJoin from './view/member/memberJoin'; // 회원가입 페이지 컴포넌트 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} /> {/* 메인 페이지 */}
        <Route path="/memberJoin" element={<MemberJoin />} /> {/* 회원가입 페이지 */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);