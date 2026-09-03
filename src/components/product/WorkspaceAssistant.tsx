import { useRef, useState } from 'react';
import { ArrowUpRight, Bot, ChevronRight, FileSearch, Send } from 'lucide-react';
import { aiResponses, fallbackMessages, type ChatMessage } from '../../shared/data';

export function WorkspaceAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Why is this workload suspicious?' },
    { role: 'assistant', text: 'The workload is associated with an unusual sequence of API and identity events. This is an indication for review, not a definitive conclusion.', pills: ['6 correlated events', '2 identity relationships', '1 elevated runtime indicator'], suggestion: 'Review service identity activity between 14:00 and 14:10.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const fallbackIdx = useRef(0);

  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const key = trimmed.toLowerCase().replace(/[?!.,]/g, '').trim();
      const match = Object.keys(aiResponses).find((k) => key.includes(k));
      let reply: ChatMessage;
      if (match) {
        reply = { ...aiResponses[match] };
      } else {
        reply = { ...fallbackMessages[fallbackIdx.current % fallbackMessages.length] };
        fallbackIdx.current++;
      }
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="workspace-assistant">
      <div className="workspace-card conversation">
        <div className="workspace-card-head">
          <div><span className="overline">ASSISTANT</span><h3>Ask the security context</h3></div>
          <span className="live-chip"><span className="pulse-dot" /> READY</span>
        </div>
        <div className="workspace-chat">
          {messages.map((msg, i) => msg.role === 'user' ? (
            <div className="workspace-chat-question" key={i}>{msg.text}</div>
          ) : (
            <div className="workspace-chat-answer" key={i}>
              <div className="answer-mark"><Bot size={16} /></div>
              <div>
                <p>{msg.text}</p>
                {msg.pills && msg.pills.length > 0 && <>
                  <span className="answer-label">SUPPORTING EVIDENCE</span>
                  <div className="answer-pills">{msg.pills.map((p) => <span key={p}>{p}</span>)}</div>
                </>}
                {msg.suggestion && <div className="suggestion"><ChevronRight size={15} /> Suggested next step: {msg.suggestion}</div>}
              </div>
            </div>
          ))}
          {typing && <div className="workspace-chat-answer typing-indicator"><div className="answer-mark"><Bot size={16} /></div><div><span className="typing-dots"><span /><span /><span /></span></div></div>}
        </div>
        <form className="assistant-input" onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask another question..." disabled={typing} />
          <button type="submit" disabled={typing || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
      <div className="workspace-card">
        <span className="overline">EVIDENCE</span>
        <h3>Referenced sources</h3>
        {['Runtime event · 14:02:18', 'Identity event · 14:02:14', 'API request · 14:02:11', 'Workload baseline · 7 day view'].map((x) => (
          <div className="evidence-source" key={x}><FileSearch size={14} /><span>{x}</span><ArrowUpRight size={13} /></div>
        ))}
      </div>
    </div>
  );
}
