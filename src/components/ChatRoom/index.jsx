import { auth } from "../../client/firebase";
import { useEffect, useRef } from 'react';
import { useAddMessage, useMessages } from "../../client/graphql/hooks";

function MessageRow({ message }) {
  console.log(auth.currentUser)
  return (
    <div className={(message.from === auth.currentUser.email) ? 'text-end' : 'text-left'}>
      <p className="messageFrom">{message.from}</p>
      <div className={(message.from === auth.currentUser.email) ? 'message sent' : 'message received'}>
        <div className='content'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
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
    <div ref={containerRef} className="box px-4 pb-[4rem]" style={{overflowY: 'scroll' }}>
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
    <div class="input-box fixed bottom-0 left-[6.8rem] right-0">
      <input className="input" type="text" placeholder="Say something..." onKeyPress={handleKeyPress}/>
      <button>Send</button>
    </div>
  );
}

export const ChatRoom = () => {
  const { messages } = useMessages();
  const { addMessage } = useAddMessage();

  const handleSend = async (text) => {
    const message = await addMessage(text);
    console.log('Message added:', message);
  };

  return (
    <section className="section">
      <div className="container mx-auto pl-[6rem]">
        {/* <h1 className="title box bg- p-4 fixed top-0 left-[6.8rem] right-0">
          Chatting as {auth.currentUser.displayName}
        </h1> */}
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};
