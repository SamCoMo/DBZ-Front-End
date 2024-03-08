import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}
const Modal = ({ children, title }: ModalProps) => {
  const [open, close] = useState(true);
  return (
    <dialog id="Modal" className="modal">
      <div
        className={`modal-box w-11/12 max-w-5xl ${open ? "modal-open" : ""}`}
      >
        <header className="grid grid-cols-[1fr,30px]">
          <h2 className="text-h3 flex items-center">{title && title}</h2>
          <form method="dialog">
            <button type="submit">
              {" "}
              <IoClose className="text-3xl" />
            </button>
          </form>
        </header>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
