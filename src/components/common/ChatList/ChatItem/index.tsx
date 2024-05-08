import { Link } from 'react-router-dom';

interface ChatItemProps {
  chatRoomId: string;
  memberIdList: string[];
  lastChatMessageContent: string;
  lastMessageSentAt: string;
}

const ChatItem = ({ chatRoomId, memberIdList, lastChatMessageContent, lastMessageSentAt }: ChatItemProps) => {
  return (
    <li className="border-b py-4">
      <Link to={`/chat/${chatRoomId}`} className="block">
        <b>{memberIdList}</b>
        <div className="mt-4">
          <span className="text-body2 text-gray4">{lastChatMessageContent}</span>
          <span className="text-body2 text-gray4">{lastMessageSentAt}</span>
        </div>
      </Link>
    </li>
  );
};

export default ChatItem;