import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface Message {
  sender: string;
  content: string;
}

const ChatPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    const sock = new SockJS('https://www.samcomo.site'); // Adjust URL to your WebSocket Server
    const client = Stomp.over(sock);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      client.subscribe('/topic/messages', (message) => {
        const receivedMessage: Message = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect(() => {
        console.log('Disconnected');
      });
    };
  }, []);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input && stompClient) {
      const message: Message = { sender: "User", content: input };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      setInput('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.sender}: {msg.content}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
