import { db } from '@/firebase/firebaseConfig';
import {  addDoc, collection, serverTimestamp } from 'firebase/firestore';
import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
/**
 * 1대1 채팅방을 생성합니다.
 * @param {string} currentUserId - 현재 로그인한 사용자의 ID
 * @param {string} recipientId - 대화 상대방의 ID
 */
async function createChatRoom(currentUserId:string, recipientId:string) {
  try {
    const chatRoomRef = await addDoc(collection(db, 'chatrooms'), {
      memberIdList: [currentUserId, recipientId], // 참여 사용자 목록
      createdAt: serverTimestamp(), // 생성 시간
      lastMessageContent:'',
      lastMessageSentAt:serverTimestamp()
    });

    console.log("1:1 Chat room created with ID: ", chatRoomRef.id);
    return chatRoomRef.id; // 채팅방 ID 반환
  } catch (error) {
    console.error("Error creating chat room: ", error);
    return null;
  }
}

// React 컴포넌트
const CreateChatRoomButton = ({ currentUserId, recipientId }) => {
  const navigate = useNavigate();  
  const { toastSuccess, toastError } = useToast();
  const handleCreateRoomClick = () => {
    const chatRoomId = createChatRoom(currentUserId, recipientId);
    if (chatRoomId) {
      console.log(`Chat room created successfully: ${chatRoomId}`);
      // 추가적인 액션 (예: 채팅방으로 리디렉트)
      toastSuccess(`채팅방이 생성되었습니다!`);
      navigate(`/chat/${chatRoomId}`);
    }
  };

  return <button className="btn bg-defaultColor text-white" onClick={handleCreateRoomClick}>채팅하기</button>;
};

export default CreateChatRoomButton;
