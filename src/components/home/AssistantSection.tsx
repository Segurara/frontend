import { useRef, useState } from 'react';
import { Bot, ChevronRight, CircleDot, Send, Sparkles } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';
import { aiResponses, fallbackMessages, type ChatMessage } from '../../shared/data';

export function AssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Why is this activity considered risky?' },
    { role: 'assistant', text: 'The activity is associated with an unusual API sequence involving a service identity and a production workload.', pills: ['4 correlated events', '2 related entities', 'Unusual request pattern', 'Elevated risk indicator'], suggestion: 'Review the linked identity and workload timeline.' },
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
    <section id="assistant" className="section-pad assistant-section">
      <div className="assistant-intro">
        <SectionLabel>AI INVESTIGATION ASSISTANT</SectionLabel>
        <h2>Ask questions. <em>Review the evidence.</em></h2>
        <p>Ask investigation questions and review suggested answers linked to the available security evidence.</p>
        <span className="evidence-tag"><Sparkles size={14} /> EVIDENCE-LINKED RESPONSE</span>
      </div>
      <div className="assistant-panel">
        <div className="assistant-top">
          <div className="assistant-brand">
            <span className="ai-orb"><Bot size={18} /></span>
            <div><strong>Segurara AI</strong><small>Investigation assistant</small></div>
          </div>
          <span className="context-chip"><CircleDot size={12} /> Case CASE-2048</span>
        </div>
        <div className="chat">
          {messages.map((msg, i) => msg.role === 'user' ? (
            <div className="chat-question" key={i}>{msg.text}</div>
          ) : (
            <div className="chat-answer" key={i}>
              <div className="answer-mark"><Sparkles size={16} /></div>
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
          {typing && <div className="chat-answer typing-indicator"><div className="answer-mark"><Sparkles size={16} /></div><div><span className="typing-dots"><span /><span /><span /></span></div></div>}
        </div>
        <form className="assistant-input" onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask another question..." disabled={typing} />
          <button type="submit" disabled={typing || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
    </section>
  );
}
