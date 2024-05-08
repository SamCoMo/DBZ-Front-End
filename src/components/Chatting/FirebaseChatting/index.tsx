import { useEffect, useRef, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { BsArrowUpShort } from "react-icons/bs";
import HeaderTitle from '@/components/common/HeaderTitle';
import useUserState from '@/hooks/useUserState';

interface Message {
  content: string;
  senderProfileUrl: string;
  id: string;
  text: string;
  senderId: string;
  sender:string;
  createdAt:string;
}

const ChatRoom = () => {
  const scrollRef = useRef(null);
  const { chatRoomId } = useParams<{ chatRoomId: string }>(); // chatRoomId가 문자열로 제공되도록 수정
  const { userState } = useUserState();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

  if (!chatRoomId) {
    // roomId가 없다면 컴포넌트를 렌더링하지 않거나 오류 메시지를 표시
    return <div>No room selected</div>;
  }

  // Firestore로부터 메시지 실시간 수신
  useEffect(() => {
    if (!userState || !userState.nickname) return;

    const messagesRef = collection(db, 'chatrooms', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        senderProfileUrl: doc.data().senderProfileUrl,
        text: doc.data().text,
        senderId: doc.data().senderId,
        sender: doc.data().sender,
      }));
      setChatMessages(messages);
    });

    return () => unsubscribe();
  }, [chatRoomId, userState]);

  const sendMessage = () => {
    if (!messageInput.trim() || !userState || !userState.nickname) return;
    const messagesRef = collection(db, 'chatrooms', chatRoomId, 'messages');
  
    try {
      addDoc(messagesRef, {
        senderId: userState.nickname,
        sender: userState.nickname,
        content: messageInput.trim(),
        createdAt: serverTimestamp()
      });
console.log(userState.nickname);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <HeaderTitle title="채팅" back={true}/>
      <section className="pt-20">
        <ul>
          {chatMessages.map((msg, index) => (
            <li key={index}>
              <div className={`chat ${msg.senderId === userState.nickname ? 'chat-end' : 'chat-start'}`}>
                {/* <div className="chat-image avatar">
                  <img alt={msg.sender} src={msg.senderProfileUrl || '/default-profile.jpg'} />
                </div> */}
                <div className="chat-header">{msg.sender}</div>
                <div className="chat-bubble chat-bubble-warning opacity-50">
                  <span>{msg.createdAt}</span>
                  {msg.content}
                </div>
              
              </div>
            </li>
          ))}
        </ul>
        <div className="fixed max-w-default bottom-0 left-0 right-0 w-full m-auto">
          <input
            type="text"
            placeholder="메시지를 입력하세요."
            className="w-full h-14 pl-5 bg-gray2 rounded-lg"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            type="button"
            onClick={sendMessage}
            className="absolute right-0 bottom-0 h-14 w-14 flex justify-center items-center"
          >
            <span className="sr-only">보내기</span>
            <BsArrowUpShort className="text-xl" />
          </button>
        </div>
        <div ref={scrollRef} />
      </section>
    </>
  );
};

export default ChatRoom;
