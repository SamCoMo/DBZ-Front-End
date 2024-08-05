import React from 'react';
import usePostChatRoomQuery from '@/hooks/query/usePostChatRoomQuery';
import { useNavigate } from 'react-router-dom';

const CreateChatRoomButton = ({ recipientId }) => {
    const { chatRoomCreateIsMutate } = usePostChatRoomQuery();
    const navigate = useNavigate();

    const handleCreateChatRoom = () => {
        // 채팅방 생성 함수 호출
        chatRoomCreateIsMutate(recipientId, {
            onSuccess: (data) => {
                // 성공적으로 채팅방이 생성되면 수행할 작업
                console.log('Chat room created successfully:', data);
                if (data && data.chatRoomId) {
                    // 채팅방 ID를 사용하여 채팅방으로 리디렉션
                    navigate(`/chat/${data.chatRoomId}`);
                } else {
                    // 채팅방 ID가 없는 경우의 예외 처리
                    console.error('Chat room ID is missing');
                }
                // 예: 채팅방으로 이동하는 로직 등
            },
            onError: (error) => {
                // 에러 처리 로직
                console.error('Failed to create chat room:', error);
            }
        });
    };

    return (
        <button className="btn bg-defaultColor text-white" onClick={handleCreateChatRoom}>채팅하기</button>
    );
};

export default CreateChatRoomButton;
