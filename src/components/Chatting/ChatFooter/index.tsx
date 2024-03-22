import React from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

interface ChatFooterProps {
  sendedMessage: string;
  handlesendMessage: (msg: string) => (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatFooter = ({
  sendedMessage,
  handlesendMessage,
  handleInputChange,
}: ChatFooterProps) => (
  <>
    {/* 채팅 보내기 */}
    <form onSubmit={handlesendMessage(sendedMessage)}>
      <div className="fixed max-w-default bottom-0 left-0 right-0 w-full m-auto">
        <input
          type="text"
          value={sendedMessage}
          onChange={handleInputChange}
          className="w-full h-14 pl-5"
        />
        <button
          type="button"
          className="absolute right-0 bottom-0 h-14 w-14 flex justify-center items-center"
        >
          <span className="sr-only">채팅 보내기</span>
          <IoMdArrowRoundUp className="text-xl" />
        </button>
      </div>
    </form>
  </>
);
export default ChatFooter;
