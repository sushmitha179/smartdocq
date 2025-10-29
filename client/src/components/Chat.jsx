import React, { useEffect, useRef, useState } from 'react';
import { ConvAPI, QAAPI } from '../api/auth';

export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const scroller = useRef(null);

  async function load() {
    if (!conversationId) return;
    const res = await ConvAPI.messages(conversationId);
    setMessages(res);
    queueMicrotask(()=> scroller.current?.scrollTo(0, scroller.current.scrollHeight));
  }

  useEffect(() => { load(); }, [conversationId]);

  async function send() {
    if (!text.trim()) return;
    const q = text;
    setText('');
    // optimistic
    setMessages(m => [...m, { _id: Math.random(), role:'user', content:q }]);
    const res = await QAAPI.answer(conversationId, q);
    setMessages(m => [...m, res.message]); // assistant
    queueMicrotask(()=> scroller.current?.scrollTo(0, scroller.current.scrollHeight));
  }

  return (
    <div className="chat">
      <div className="messages" ref={scroller}>
        {messages.map(m => (
          <div key={m._id} className={`message ${m.role}`}>
            <div style={{opacity:.7, fontSize:12}}>{m.role}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      <div className="inputbar">
        <input className="input" placeholder="Ask anything…" value={text}
          onChange={e=>setText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }}} />
        <button className="btn" onClick={send}>Send</button>
      </div>
    </div>
  );
}
