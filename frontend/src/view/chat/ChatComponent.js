import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchParams] = useSearchParams(); // URL에서 친구 이름 추출
  const friendNickname = searchParams.get('friend'); // 친구의 이름
  const webSocket = useRef(null); // WebSocket 참조

  useEffect(() => {
    // WebSocket 연결 설정
    webSocket.current = new WebSocket('ws://localhost:9001/chat');

    webSocket.current.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    webSocket.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    webSocket.current.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      webSocket.current.close(); // 컴포넌트가 언마운트될 때 WebSocket 닫기
    };
  }, []);

  const handleSendMessage = () => {
    if (webSocket.current && inputMessage.trim()) {
      const message = {
        sender: '현재 유저', // 현재 유저 정보를 넣어야 함
        content: inputMessage,
      };
      webSocket.current.send(JSON.stringify(message));
      setInputMessage(''); // 입력란 비우기
    }
  };

  return (
    <div>
      <h3>{friendNickname}님과 채팅 중</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        id="chatSender"
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSendMessage}>보내기</button>
    </div>
  );
};

export default ChatComponent;