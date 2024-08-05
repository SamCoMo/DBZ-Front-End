import { useQuery } from '@tanstack/react-query';
import { axiosAccess } from '@/apis';
import { ChatListDataType } from '@/types/Chatting/ChatDataType';

const fetchAPI = async (): Promise<ChatListDataType[]> => {
  try {
    const res = await axiosAccess.get(`/chat/member/room-list`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useGetChatListQuery = () => {
  const {
    data: chatList,
    isLoading: chatListIsLoading,
    isSuccess: chatListIsSuccess,
    isError: chatListIsError
  } = useQuery({
    queryKey: ['chatList'],
    queryFn: () => fetchAPI()

    // staleTime: Infinity
  });

  return {
    chatList,
    chatListIsLoading,
    chatListIsSuccess,
    chatListIsError
  };
};

export default useGetChatListQuery;