import { Link } from 'react-router-dom';
import useGetChatListQuery from '@/hooks/query/useGetChatListQuery';
import Nav from '@/components/common/Nav';

const ChatRoomList = () => {
  const { chatList, chatListIsLoading, chatListIsError } = useGetChatListQuery();

  if (chatListIsLoading) {
    return <div>Loading...</div>;
  }

  if (chatListIsError) {
    return <div>Error loading chat rooms</div>;
  }

  return (
    <div>
      <ul>
        {chatList && chatList.length > 0 ? (
          chatList.map(room => (
            <li className="border-b py-4" key={room.chatRoomId}>
              <Link to={`/chat/${room.chatRoomId}`} className="block">
                <b>{room.memberIdList[1]}</b>
                <div className="mt-4">
                  <span className="text-body2 text-gray4 mr-1">
                    {room.lastChatMessageContent || 'No messages yet'}
                  </span>
                  <span className="text-body2 text-gray4">
                    {room.lastMessageSentAt ? new Date(room.lastMessageSentAt).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>No chat rooms available</li>
        )}
      </ul>
      <Nav />
    </div>
  );
};

export default ChatRoomList;
