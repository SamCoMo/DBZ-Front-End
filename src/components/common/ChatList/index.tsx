// import DataNull from '../DataNull';
// import Nav from '../Nav';
// import ChatItem from './ChatItem';
// import useGetChatListQuery from '@/hooks/query/useGetChatListQuery';
// import { ChatListDataType } from '@/types/Chatting/ChatDataType';

// const ChatList = () => {
//   const { chatList } = useGetChatListQuery();

//   return (
//     <>
//       {chatList?.length === 0 && (
//         <DataNull text="채팅이 없습니다." />
//       )}
//       <ul>
//       {/* <ul className="[&>*:last-child]:border-0"> */}
//       {chatList?.map(item => (
//           <ChatItem
//             key={item.chatRoomId}
//             chatRoomId={item.chatRoomId}
//             memberIdList={item.memberIdList}
//             lastChatMessageContent={item.lastChatMessageContent}
//             lastMessageSentAt={item.lastMessageSentAt}
//           />
//         ))}
//       </ul>
//       <Nav />
//     </>
//   );
// };

// export default ChatList;
