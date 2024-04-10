import { useMutation } from '@tanstack/react-query';
import { axiosAccess } from '@/apis';
import useToast from '@/hooks/useToast';
import { ReportDeleteType } from '@/types/Report/ReportDataType';

const fetchAPI = async (reportId: number): Promise<ReportDeleteType> => {
  const res = await axiosAccess.delete(`/reports/${reportId}`);
  return res.data;
};

const useDeleteReportQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const {
    data: IsReportDelete,
    mutate: reportDeleteIsMutate,
    isError: reportDeleteIsError,
    isSuccess: reportDeleteIsSuccess
  } = useMutation({
    mutationKey: ['reportDelete'],
    mutationFn: (reportId: number) => fetchAPI(reportId),
    onError: err => {
      console.log(err);
      toastError('문제가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      toastSuccess('일정 삭제가 완료되었습니다.');
    }
  });

  return {
    IsReportDelete,
    reportDeleteIsMutate,
    reportDeleteIsError,
    reportDeleteIsSuccess
  };
};

export default useDeleteReportQuery;