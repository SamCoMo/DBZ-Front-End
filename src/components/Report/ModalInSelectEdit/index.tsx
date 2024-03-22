
import Modal from '@/components/common/Modal';
import useModalState from '@/hooks/useModalState';
import { BsPencilFill } from "react-icons/bs";
import useDeleteReportQuery from '@/hooks/query/useDeleteReportQuery';
import useGetReportDetailQuery from '@/hooks/query/useGetReportQuery';
import { useNavigate, useParams } from 'react-router-dom';
import usePatchReportQuery from '@/hooks/query/usePatchReportQuery';

const ModalInSelectEdit =() =>{
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = Number(id);
  const { reportDetail } = useGetReportDetailQuery(reportId);
  const { changeStatusState, openModal, closeModal } = useModalState();
  const { reportDeleteIsMutate } = useDeleteReportQuery();
  const { patchedReportIsMutate } = usePatchReportQuery();

  const handleEdit = () => {
    // 수정 페이지로 이동
    navigate(`/edit/${reportId}`);
    closeModal(); // 모달 닫기
  };

  const handleDelete = () => {
    // 삭제하기
    const reportConfirmed = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (reportConfirmed) {
      reportDeleteIsMutate(reportId);
      closeModal(); // 모달 닫기
    }
  };
  const handleStatusChange = () => {
    const reportConfirmed = window.confirm("해당 게시물을 완료 처리하시겠습니까?");
    if (reportConfirmed) {
      changeStatusState('completed');
      closeModal(); // 모달 닫기
      navigate('/home');
  }
}

  return (
    <>
      <button onClick={openModal}><BsPencilFill className='text-defaultColor ml-64' /></button>
      <Modal>
        <p className='w-56 h-8 mx-auto my-3 flex justify-center'onClick={handleEdit}>수정하기</p>
        <p className='w-56 h-8 mx-auto my-3 flex justify-center'onClick={handleDelete}>삭제하기</p>
        <p className='w-56 h-8 mx-auto my-3 flex justify-center'onClick={handleStatusChange}>완료하기</p>
      </Modal>
    </>
  );
};

export default ModalInSelectEdit;
