import { useMutation } from '@tanstack/react-query';
import { axiosAccess } from '@/apis';
import useToast from '@/hooks/useToast';

const fetchAPI = async (recipientId: string) => {
  const response = await axiosAccess.post(`/chat/room?recipientId=${recipientId}`, {}, {
    params: {
      recipientId: recipientId
    }
  });
  return response.data;
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
    mutationFn:(recipientId: string) => fetchAPI(recipientId),
    onSuccess: () => {
      toastSuccess(`채팅방이 생성되었습니다!`);
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
