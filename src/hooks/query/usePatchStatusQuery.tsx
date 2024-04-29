import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosAccess } from '@/apis';
import { ReportEditDataType, ReportDetailType, ReportEditStatusType } from '@/types/Report/ReportDataType';
import useToast from '@/hooks/useToast';

const fetchAPI = async (
  editData: ReportEditStatusType
)=> {
  const { reportId } = editData;

  const res = await axiosAccess.put(`/report/${reportId}/complete`);
  return res.data;
};

const usePatchReportStatusQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const queryClient = useQueryClient();
  const {
    data: reportId,
    mutate: patchedReportStatusIsMutate,
    isError: patchedReportStatusIsError,
    isSuccess: patchedReportStatusIsSuccess
  } = useMutation({
    mutationKey: ['patchReportStatus'],
    mutationFn: (editData: ReportEditStatusType) => fetchAPI(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patchReportStatus'] });
      toastSuccess('게시글 상태가 완료로 변경되었습니다.');
    },
    onError: () => {
      toastError('문제가 발생했습니다. 다시 시도해주세요.');
    }
  });

  return {
    reportId,
    patchedReportStatusIsMutate,
    patchedReportStatusIsError,
    patchedReportStatusIsSuccess
  };
};

export default usePatchReportStatusQuery;