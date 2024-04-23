import React, { useEffect, useRef } from "react";
import { ChatNewDataType } from "@/types/Chatting/ChatDataType";
import useUserState from "@/hooks/useUserState";
interface ChatBodyProps {
  messages: ChatNewDataType[];
}

const ChatBody = ({ messages }: ChatBodyProps) => {
  const userId = 1;
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <section ref={lastMessageRef} className="bg-gray1 px-5 pb-5">
      {messages.map((msg) =>
        msg.senderId === userId ? (
          <div className="text-right">
            <p className="mt-3 inline-block bg-white p-4 rounded-xl">
              {msg.message}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <div className="avatar mr-1">
                <div className="w-10 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="사용자"
                  />
                </div>
              </div>
              <span className="text-body2">상대방1</span>
            </div>
            <p className="mt-3 inline-block bg-white p-4 rounded-xl">
              {msg.message}
            </p>
          </div>
        )
      )}
    </section>
  );
};
export default ChatBody;
