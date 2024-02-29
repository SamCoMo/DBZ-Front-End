import { useEffect, useRef } from "react";

const host =
  process.env.NODE_ENV === "production"
    ? window.location.host
    : "localhost:3308";

const useWebsocket = () => {
  const sendRef = useRef<any>(null);
  const onMessageCallbackRef = useRef<any>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${host}/chat`) || {};

    // 연결
    ws.onopen = () => {
      console.log("opened ws connection");
    };
    // 연결 해제
    ws.onclose = (e) => {
      console.log("close ws connection: ", e.code, e.reason);
    };
    // 서버에서 메시지 수신될때 마다 호출
    ws.onmessage = (e) => {
      console.log("메시지 수신", e.data);
      onMessageCallbackRef.current(e.data);
    };
    // 소켓 연결 오류
    ws.onerror = (error) => {
      console.log("소켓 연결 오류입니다. ", error);
    };

    sendRef.current = ws.send.bind(ws);

    return () => {
      ws.close();
    };
  }, []);

  // 메시지를 받으면 여기루 호출
  const registerOnMessageCallback = (fn: any) => {
    onMessageCallbackRef.current = fn;
  };

  return { send: sendRef, registerOnMessageCallback };
};

export default useWebsocket;
