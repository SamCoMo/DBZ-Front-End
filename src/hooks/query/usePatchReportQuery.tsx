import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosAuth } from '@/apis';
import { ReportEditDataType, ReportDetailType } from '@/types/Report/ReportDataType';
import useToast from '@/hooks/useToast';

const fetchAPI = async (
  editData: ReportEditDataType
): Promise<ReportDetailType> => {
  const { reportId, report } = editData;

  const res = await axiosAuth.patch(`/reports/${reportId}`, {
    ...report
  });
  return res.data;
};

const usePatchReportQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const queryClient = useQueryClient();
  const {
    data: reportId,
    mutate: patchedReportIsMutate,
    isError: patchedReportIsError,
    isSuccess: patchedReportIsSuccess
  } = useMutation({
    mutationKey: ['patchReport'],
    mutationFn: (editData: ReportEditDataType) => fetchAPI(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail'] });
      toastSuccess('게시글 수정이 완료되었습니다');
    },
    onError: () => {
      toastError('문제가 발생했습니다. 다시 시도해주세요.');
    }
  });

  return {
    reportId,
    patchedReportIsMutate,
    patchedReportIsError,
    patchedReportIsSuccess
  };
};

export default usePatchReportQuery;