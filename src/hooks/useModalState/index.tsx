import { useRecoilState } from "recoil";
import { modalAtom } from "@/recoil/atoms/modal/atom";

/*
 * modalAtom: 기본 모달 state
 * modalAcceptOrRejectAtom: 친구 요청 수락/거절 모달 state
 */

const useModalState = () => {
  const [modalState, setModalstate] = useRecoilState(modalAtom);

  // 모달 오픈
  const openModal = () => {
    (document.getElementById("Modal") as HTMLDialogElement).showModal();
  };

  return {
    openModal,
    modalState,
  };
};

export default useModalState;
