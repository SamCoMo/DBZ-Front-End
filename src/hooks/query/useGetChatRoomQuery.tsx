import { useQuery } from '@tanstack/react-query';
import { ChatPrevDataType } from '@/types/Chatting/ChatDataType';
import { axiosAccess } from '@/apis';

const useGetChatRoomQuery = (chatRoomId:string) => {
  const fetchAPI = async (): Promise<ChatPrevDataType[]>=> {
    try {
      const res = await axiosAccess.get(`/chat/room/${chatRoomId}/message-list`, {
        params: {
          page: 0,
          size: 20,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    data: chatPrevMessage,
    isLoading: chatPrevIsLoading,
    isSuccess: chatPrevIsSuccess,
    isError: chatPrevIsError
  } = useQuery({
    queryKey: ['chatPrevMsg', chatRoomId],
    queryFn: fetchAPI

    // staleTime: Infinity
  });

  return {
    chatPrevMessage,
    chatPrevIsLoading,
    chatPrevIsSuccess,
    chatPrevIsError
  };
};

export default useGetChatRoomQuery;
