import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Frame } from 'stompjs';
import { ChatPrevDataType } from '@/types/Chatting/ChatDataType';

const useWebSocketService = (token: string): Client | null => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;

    // WebSocket 연결
    const connect = () => {
      socket = new SockJS('https://www.samcomo.site');
      const client = Stomp.over(socket);

      client.connect({'Access-Token': token}, () => {
        console.log('Connected to WebSocket');

        // 연결이 성공하면 stompClient 상태를 업데이트합니다.
        setStompClient(client);
      }, (error: string | Frame) => {
        // 에러 핸들링
        if (typeof error === 'string') {
          console.error('Error connecting to WebSocket:', error);
        } else if (error instanceof Frame) {
          console.error('STOMP error:', error.headers['message']);
        } else {
          console.error('Unknown error type:', error);
        }
      });
    };

    // WebSocket 연결 해제
    const disconnect = () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('Disconnected from WebSocket');
          setStompClient(null);
        });
      }

      if (socket) {
        socket.close();
      }
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      disconnect();
    };
  }, [token]);

  // stompClient 상태를 반환합니다.
  return stompClient;
};

export default useWebSocketService;
