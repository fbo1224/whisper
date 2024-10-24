package com.example.demo.config;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ChatHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>(); // 연결된 세션 목록
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 변환기

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session); // 새로운 세션 추가
        System.out.println("새로운 클라이언트 연결: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // 클라이언트로부터 메시지를 수신
        String msg = message.getPayload();
        System.out.println("수신된 메시지: " + msg);

        // 모든 클라이언트에게 메시지 전송
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                s.sendMessage(new TextMessage(msg)); // 수신된 메시지를 다시 클라이언트에게 전송
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session); // 세션 종료 시 목록에서 제거
        System.out.println("클라이언트 연결 종료: " + session.getId());
    }
}