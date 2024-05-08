// import { useEffect, useRef, useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp, { Client, Frame } from 'stompjs';
// import { ChatPrevDataType, ChatListDataType } from '@/types/Chatting/ChatDataType';
// import { useParams } from 'react-router-dom';
// import { BsArrowUpShort } from "react-icons/bs";
// import HeaderTitle from '@/components/common/HeaderTitle';
// import useGetChatRoomQuery from '@/hooks/query/useGetChatRoomQuery';
// import useUserState from '@/hooks/useUserState';
// import useGetChatListQuery from '@/hooks/query/useGetChatListQuery';
// import { BASE_URL } from '@/apis';

// const ChatRoom = () => {
//   const scrollRef = useRef<null | HTMLDivElement>(null);
//   const { chatRoomId } = useParams();
//   const { userState } = useUserState();
//   const { chatPrevMessage } = useGetChatRoomQuery(chatRoomId);
//   const accessToken = localStorage.getItem("Access-Token");
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const { chatList } = useGetChatListQuery();
//   const [chatMessages, setChatMessages] = useState<ChatPrevDataType[]>([]);
//   const [messageInput, setMessageInput] = useState('');

//   // WebSocket 연결 및 해제
//   useEffect(() => {
//     let socket: WebSocket | null = null;

//     // WebSocket 연결
//     const connect = () => {
//       try {
//         socket = new WebSocket('wss://samcomo.site/ws');
//         const client = Stomp.over(socket);
//         client.debug = (str) => console.log('STOMP Debug:', str);

//         client.connect(
//           {
//             Authorization: accessToken,
//             'Content-Type': 'application/json',
//           }, () => {
//           console.log('Connected to WebSocket');

//           // 연결이 성공하면 stompClient 상태를 업데이트합니다.
//           setStompClient(client);
//         }, (error: string | Frame) => {
//           // 에러 핸들링
//           if (typeof error === 'string') {
//             console.error('Error connecting to WebSocket:', error);
//           } else if (error instanceof Frame) {
//             console.error('STOMP error:', error.headers['message']);
//           } else {
//             console.error('Unknown error type:', error);
//           }
//         });
//       } catch (error) {
//         console.error('WebSocket connection failed:', error);
//       }
//     };

//     // WebSocket 연결 해제
//     const disconnect = () => {
//       if (stompClient && stompClient.connected) {
//         stompClient.disconnect(() => {
//           console.log('Disconnected from WebSocket');
//           setStompClient(null);
//         });
//       }

//       if (socket) {
//         socket.close();
//       }
//     };

//     // 컴포넌트가 마운트되었을 때 WebSocket 연결
//     connect();

//     // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
//     return disconnect;
//   }, [accessToken, chatRoomId, stompClient]);

//   // 채팅방 구독
//   useEffect(() => {
//     if (!stompClient) return;

//     const onMessageReceived = (message: ChatPrevDataType) => {
//       setChatMessages(prevMessages => [...prevMessages, message]);
//     };

//     const subscription = stompClient.subscribe(`/chatrooms/${chatRoomId}`, ({ body }: Frame) => {
//       onMessageReceived(JSON.parse(body));
//     });

//     return () => {
//       subscription.unsubscribe(); // 컴포넌트가 언마운트될 때 구독을 해제합니다.
//     };
//   }, [stompClient, chatRoomId]);

//   const sendMessage = () => {
//     if (!stompClient || !messageInput.trim()) return;

//     stompClient.send(`/chatapp/room/${chatRoomId}/message`, {}, JSON.stringify({
//       roomId:chatRoomId,
//       sender: userState.nickname,
//       senderId: userState.memberId,
//       content: messageInput.trim(),
//       imageUrl: userState.profileImageUrl,
//       sendAt: new Date().toISOString()
//     }));

//     setMessageInput('');
//   };

//   return (
//     <>
//       <HeaderTitle title="채팅" back={true}/>
//       <section className="pt-20">
//         <ul>
//           {/* 이전 메시지 */}
//           {chatPrevMessage && chatPrevMessage.length > 0 && chatPrevMessage.map((prevMsg, index) => (
//             <li key={index}>
//               <div className={`chat ${prevMsg.senderId === userState.memberId ? 'chat-end' : 'chat-start'}`}>
//                 <div className="chat-image avatar">
//                   <img alt={prevMsg.senderId} src={prevMsg.imageUrlList ? `${import.meta.env.VITE_IMAGE_SERVER}${prevMsg.imageUrlList}` : userState.profileImageUrl} />
//                 </div>
//                 <div className="chat-header">{prevMsg.sender}</div>
//                 <div className="chat-bubble">{prevMsg.content}</div>
//               </div>
//             </li>
//           ))}
//           {/* 실시간 메시지 */}
//           {chatMessages.map((newMsg, index) => (
//             <li key={index}>
//               <div className={`chat ${newMsg.senderId === userState.memberId ? 'chat-end' : 'chat-start'}`}>
//                 <div className="chat-image avatar">
//                   <img alt={newMsg.sender} src={newMsg.imageUrl ? `${import.meta.env.VITE_IMAGE_SERVER}${newMsg.imageUrl}` : userState.profileImageUrl} />
//                 </div>
//                 <div className="chat-header">{newMsg.sender}</div>
//                 <div className="chat-bubble">{newMsg.content}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="fixed max-w-default bottom-0 left-0 right-0 w-full m-auto">
//           <input
//             type="text"
//             placeholder="메시지를 입력하세요."
//             className="w-full h-14 pl-5"
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//           />
//           <button
//             type="button"
//             onClick={sendMessage}
//             className="absolute right-0 bottom-0 h-14 w-14 flex justify-center items-center"
//           >
//             <span className="sr-only">보내기</span>
//             <BsArrowUpShort className="text-xl" />
//           </button>
//         </div>
//         <div ref={scrollRef} />
//       </section>
//     </>
//   );
// };

// export default ChatRoom;
