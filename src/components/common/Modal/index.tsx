import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean; // 모달의 열림 상태
  onClose: () => void; // 모달을 닫는 함수
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  // React의 ref를 사용하여 dialog 요소를 직접 제어할 수 있습니다.
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // 모달을 열고 닫는 함수
  React.useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal(); // 모달 열기
    } else if (dialogRef.current && !isOpen) {
      dialogRef.current.close(); // 모달 닫기
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" aria-hidden={!isOpen}>
      <div className="modal-box w-11/12">
        <header className="grid grid-cols-[1fr,30px]">
          <h2 className="text-h3 flex items-center">{title}</h2>
          <button onClick={onClose} className="text-lg items-center">
            <IoClose className="text-3xl" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
