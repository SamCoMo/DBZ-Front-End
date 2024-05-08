import React from 'react';
import Modal from '@/components/common/Modal';
import useModalState from '@/hooks/useModalState';
import { BsPencilFill } from "react-icons/bs";
import useDeleteReportQuery from '@/hooks/query/useDeleteReportQuery';
import useGetReportDetailQuery from '@/hooks/query/useGetReportQuery';
import { useNavigate, useParams } from 'react-router-dom';
import usePatchReportStatusQuery from '@/hooks/query/usePatchStatusQuery';

const ModalInSelectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = Number(id);
  const { reportDetail } = useGetReportDetailQuery(reportId);
  const { modalState, closeModal, openModal } = useModalState();
  const { reportDeleteIsMutate } = useDeleteReportQuery();  
  const { patchedReportStatusIsMutate } = usePatchReportStatusQuery(); // API 훅 사용

  const handleEdit = () => {
    navigate(`/report/${reportId}/edit`);
    closeModal();
  };

  const handleDelete = () => {
    if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
      reportDeleteIsMutate(reportId);
      closeModal();
    }
  };

  const handleStatusChange = () => {
    if (window.confirm("해당 게시물을 완료 처리하시겠습니까?")) {
      patchedReportStatusIsMutate({ reportId, status: 'FOUND' }); // 수정: 필요한 인수를 전달
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal}><BsPencilFill className='text-defaultColor ml-3' /></button>
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        <button className='w-56 h-8 mx-auto my-3 flex justify-center' onClick={handleEdit}>수정하기</button>
        <button className='w-56 h-8 mx-auto my-3 flex justify-center' onClick={handleDelete}>삭제하기</button>
        <button className='w-56 h-8 mx-auto my-3 flex justify-center' onClick={handleStatusChange}>완료하기</button>
      </Modal>
    </>
  );
};

export default ModalInSelectEdit;
