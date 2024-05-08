export interface ChatNewDataType {
  chatroomId: number;
  senderId: number;
  imageUrl: string;
  content: string[];
  sendAt: string;
  sender: string;
  message: string;
}

export interface ChatPrevDataType {
  chatMessageId: string;
  senderId: number;
  content: string;
  imageUrl: string;
  chatRoomId: string;
  sender: string;
  imageUrlList: string[];
  createdAt: string;
}

export interface ChatListDataType {
  chatRoomId: string;
  memberIdList:string[];
  lastChatMessageContent:string;
  lastMessageSentAt:string;
}
