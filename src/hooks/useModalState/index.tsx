import { useState } from 'react';
import { modalAtom } from '@/recoil/atoms/modal/atom';

const useModalState = () => {
  const [modalState, setModalState] = useState({ isOpen: false });

  const openModal = () => {
    setModalState({ isOpen: true });
  };

  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  return {
    openModal,
    closeModal,
    modalState
  };
};

export default useModalState;
