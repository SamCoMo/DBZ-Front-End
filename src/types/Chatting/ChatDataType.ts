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
  sender: string;
  imageUrl: string;
  message: string;
}
export interface ChatListDataType {
  chatRoomId: number;
  title: string;
  friendsName: string[];
}
