import React from 'react';
import { Link } from 'react-router-dom';
import useGetFirebaseChatListQuery from '@/hooks/query/FirebaseChat/useGetFirebaseChatListQuery';
import Nav from '@/components/common/Nav';

const ChatRoomList = () => {
  const chatRooms = useGetFirebaseChatListQuery();

  return (
    <div>
      <ul>
        {chatRooms.map(room => (
          <li className="border-b py-4" key={room.chatRoomId}>
            <Link to={`/chat/${room.chatRoomId}`} className="block">
              <b>{room.memberIdList[1]}</b>
              <div className="mt-4">
              <span className="text-body2 text-gray4 mr-1">{room.lastMessageContent || 'No messages yet'}</span>
              <span className="text-body2 text-gray4">{room.lastMessageSentAt ? room.lastMessageSentAt.toLocaleString() : 'N/A'}</span>
              </div>  
            </Link>
          </li>
        ))}
      </ul>
      <Nav/>
    </div>
  );
};

export default ChatRoomList;
