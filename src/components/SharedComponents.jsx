import { useState, useEffect, useRef } from 'react';

/**
 * AgentStatus — shows immersive agentic activity rather than tech logs
 */
export function AgentStatus({ status }) {
  if (!status) return null;
  const isDone = status.startsWith('✦');
  return (
    <div className={`agent-status fade-enter${isDone ? ' done' : ''}`}>
      <span className="dot" />
      {status}
    </div>
  );
}

/**
 * MockBadge — transparent note when using demo mode
 */
export function MockBadge({ mock }) {
  if (!mock) return null;
  return (
    <div className="mock-badge" style={{ marginBottom: '1rem' }}>
      ◎ DEMO MODE — IBM Granite mock provider active
    </div>
  );
}

/**
 * SceneLabel — AI reconstruction disclaimer
 */
export function SceneLabel({ label }) {
  return <div className="scene-label">{label || 'AI RECONSTRUCTION — inspired by historical and cultural sources'}</div>;
}

/**
 * SceneText — renders scene / character response
 */
export function SceneText({ text }) {
  if (!text) return null;
  const content = typeof text === 'object' ? JSON.stringify(text, null, 2) : String(text);
  return <div className="scene-text">{content}</div>;
}

/**
 * DetectionResult — structured heritage detection display
 */
export function DetectionResult({ data }) {
  if (!data || typeof data !== 'object') return null;
  const fields = [
    { key: 'location', label: 'Location' },
    { key: 'architecturalElement', label: 'Architectural Element' },
    { key: 'historicalContext', label: 'Historical Context' },
    { key: 'culturalSignificance', label: 'Cultural Significance' },
    { key: 'conservationConcern', label: 'Conservation Concern' },
  ];
  return (
    <div className="detection-grid">
      {fields.map(f => data[f.key] && (
        <div key={f.key} className="detection-item">
          <div className="detection-label">{f.label}</div>
          <div className="detection-value">{data[f.key]}</div>
        </div>
      ))}
      {data.confidence && (
        <div className="detection-item">
          <div className="detection-label">Confidence</div>
          <div className="detection-value">{Math.round(data.confidence * 100)}%</div>
          <div className="confidence-bar">
            <div className="confidence-fill" style={{ width: `${data.confidence * 100}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ChatInterface — character conversation window
 */
export function ChatInterface({ character, location, onAsk, loading }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  // Set opening line when character changes
  useEffect(() => {
    if (character) {
      setMessages([{
        role: 'character',
        text: `I am here. What do you want to know?`
      }]);
    }
  }, [character?.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = async (question) => {
    if (!question.trim() || loading) return;
    const q = question.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    const response = await onAsk(q);
    setMessages(prev => [...prev, { role: 'character', text: response }]);
  };

  if (!character) return null;

  const quickQs = character.quickQuestions || [
    'How old are you?',
    'What do you remember?',
    'What are you afraid of?',
    'What is disappearing?'
  ];

  return (
    <div className="chat-container fade-enter">
      <div className="chat-header">
        <span style={{ fontSize: '1.5rem' }}>{character.emoji}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm)' }}>
            {character.name}
          </div>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {character.role}
          </div>
        </div>
      </div>

      <div className="quick-questions">
        {quickQs.map(q => (
          <button key={q} className="quick-btn" onClick={() => submit(q)}>{q}</button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-sender">
              {msg.role === 'user' ? 'You' : character.name}
            </div>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message character">
            <div className="message-sender">{character.name}</div>
            <div className="message-bubble" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit(input)}
          placeholder="Ask a question..."
          disabled={loading}
        />
        <button
          className="btn btn-gold btn-sm"
          onClick={() => submit(input)}
          disabled={loading || !input.trim()}
        >
          {loading ? <span className="spinner" /> : 'Ask'}
        </button>
      </div>
    </div>
  );
}

/**
 * ThenVsNow — split comparison display
 */
export function ThenVsNowDisplay({ data }) {
  if (!data) return null;

  const parsed = typeof data === 'object' ? data : (() => {
    try { return JSON.parse(data); } catch { return null; }
  })();

  // Fallback: use mock data directly
  const content = parsed || {
    then: data,
    now: '',
    changes: [],
    conservationNote: ''
  };

  return (
    <div className="fade-enter">
      <div className="comparison-grid">
        <div className="comparison-panel">
          <div className="comparison-label">Then</div>
          <div className="comparison-text">{content.then}</div>
        </div>
        <div className="comparison-panel">
          <div className="comparison-label">Now</div>
          <div className="comparison-text">{content.now}</div>
        </div>
      </div>

      {content.changes?.length > 0 && (
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--gold-dim)', marginBottom: '1rem' }}>What Changed</h3>
          <ul className="changes-list">
            {content.changes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      {content.conservationNote && (
        <div className="conservation-note">
          <div className="conservation-title">What Are We Losing?</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--warm-dim)' }}>
            {content.conservationNote}
          </p>
        </div>
      )}
    </div>
  );
}
