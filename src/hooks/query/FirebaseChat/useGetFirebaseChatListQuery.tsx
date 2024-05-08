import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import useUserState from '@/hooks/useUserState';

interface ChatRoom {
  chatRoomId: string;
  memberIdList: string[];
  lastMessageContent: string | null;
  lastMessageSentAt: Date;
}

const useGetFirebaseChatListQuery = () => {
  const { userState } = useUserState();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    if (!userState.nickname) return;

    const roomsRef = collection(db, 'chatrooms');
    const q = query(roomsRef, where('memberIdList', 'array-contains', userState.nickname));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms: ChatRoom[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          chatRoomId: doc.id,
          memberIdList: data.memberIdList || [],
          lastMessageContent: data.lastMessageContent || null,
          lastMessageSentAt: data.lastMessageSentAt ? new Date(data.lastMessageSentAt.seconds * 1000) : new Date()
        };
      });
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, [userState.nickname]);

  return chatRooms;
};

export default useGetFirebaseChatListQuery;
