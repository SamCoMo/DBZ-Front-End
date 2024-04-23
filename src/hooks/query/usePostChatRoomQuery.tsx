import { useMutation } from '@tanstack/react-query';
import { axiosAccess } from '@/apis';
import useToast from '@/hooks/useToast';

interface ChatRoomResponse {
  chatRoomId: string;
  memberIdList: string[];
  lastChatMessageContent: string;
  lastChatMessageAt: string;
}
interface CreateChatRoomPayload {
  recipientId: number;  // 수신자의 Member ID
}

const fetchAPI = async (payload: CreateChatRoomPayload) => {
  const res = await axiosAccess.post(`/chat/room`, payload);
  return res.data;
};


const usePostChatRoomQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const {
    mutate: chatRoomCreateIsMutate,
    isError: chatRoomCreateIsError,
    isSuccess: chatRoomCreateIsSuccess,
    data: chatRoomData
  } = useMutation({
    mutationKey: ['chatRoom'],
    mutationFn: fetchAPI,
    onSuccess: (data) => {
      toastSuccess(`채팅방이 생성되었습니다: ${data.chatRoomId}`);
    },
    onError: (err: any) => {
      console.error(err);
      toastError('채팅방 생성에 실패했습니다.');
    }
  });

  return {
    chatRoomCreateIsMutate,
    chatRoomCreateIsError,
    chatRoomCreateIsSuccess,
    chatRoomData
  };
};

export default usePostChatRoomQuery;
