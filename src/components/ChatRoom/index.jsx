import { auth } from "../../client/firebase";
import { useEffect, useRef } from 'react';
import { useAddMessage, useMessages } from "../../client/graphql/hooks";

function MessageRow({ message }) {
  console.log(message)
  return (
    <tr>
      <td className="py-1">
        <span className={(message.from === auth.currentUser.displayName) ? 'tag is-primary' : 'tag'}>
          {message.from}
        </span>
      </td>
      <td className="pl-4 py-1">
        {message.text}
      </td>
    </tr>
  );
}

function MessageList({messages}) {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // scroll to bottom to make the last message visible
      container.scrollTo(0, container.scrollHeight);
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="box" style={{ height: '50vh', overflowY: 'scroll', padding: '0em 0em 0em 8em' }}>
      <table>
        <tbody>
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessageInput({ onSend }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSend(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div className="box">
      <div className="control">
        <input className="input" type="text" placeholder="Say something..." onKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
}

export const ChatRoom = () => {
  const { messages } = useMessages();
  const { addMessage } = useAddMessage();

  // console.log(messages)
  const handleSend = async (text) => {
    const message = await addMessage(text);
    console.log('Message added:', message);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Chatting as {auth.currentUser.displayName}
        </h1>
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};
