import React, { useEffect, useState } from "react";
import moment from "moment";
import ChatBody from "@/components/Chatting/ChatBody";
import ChatFooter from "@/components/Chatting/ChatFooter";
import useWebsocket from "@/hooks/useWebSocket";
import useInput from "@/hooks/useInput";
import { ChatDataType } from "@/types/Chatting/ChatDataType";

const ChatDetail = () => {
  const [messages, setMessages] = useState<ChatDataType[]>([]);
  const [sendedMessage, setSendedMessage, handleInputChange] = useInput("");
  const { registerOnMessageCallback, send } = useWebsocket();

  // 서버에서 받은 모든 수신 메시지
  const onMessageReceived = (msg: string) => {
    const receivedMessages = JSON.parse(msg);
    setMessages((prevMessages) => [...prevMessages, receivedMessages]);
  };

  // 메시지 보내기
  const handlesendMessage = (msg: string) => (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      chatRoomId: 1,
      senderId: 1,
      message: msg,
      sendAt: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    };
    setSendedMessage("");
    send.current(JSON.stringify(message));
  };

  useEffect(() => {
    // 콜백함수 등록
    registerOnMessageCallback(onMessageReceived);

    return () => {
      registerOnMessageCallback(null);
    };
  }, [registerOnMessageCallback]);

  return (
    <div className="h-[calc(100vh-60px)] bg-gray1 overflow-y-auto">
      <ChatBody messages={messages} />
      <ChatFooter
        handlesendMessage={handlesendMessage}
        sendedMessage={sendedMessage}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ChatDetail;
