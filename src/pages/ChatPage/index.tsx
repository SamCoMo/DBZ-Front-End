// import ChatList from '@/components/common/ChatList';
import HeaderTitle from '@/components/common/HeaderTitle';
import ChatRoomList from './ChatDetail';

const ChatPage = () => {

  return(
  <>
    <HeaderTitle title="채팅" back={true}/>
    <ChatRoomList/>
  </>
)};

export default ChatPage;