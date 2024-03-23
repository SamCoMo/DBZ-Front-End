import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}
const Modal = ({ children, title }: ModalProps) => {
  const [open, _close] = useState(false);
  return (
    <dialog id="Modal" className="modal">
      <div
        className={`modal-box w-11/12 ${open ? "modal-open" : ""}`}
      >
        <header className="grid grid-cols-[1fr,30px]">
          <h2 className="text-h3 flex items-center">{title && title}</h2>
          <form method="dialog">
            <button className="text-lg  items-center" type="submit">
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
