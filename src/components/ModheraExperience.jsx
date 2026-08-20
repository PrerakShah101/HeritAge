import { useState } from 'react';
import { AgentStatus, MockBadge, SceneLabel, SceneText, ChatInterface } from './SharedComponents.jsx';
import { orchestrate } from '../services/orchestrator.js';

const MODHERA_QUESTIONS = [
  'What have you seen?',
  'Why was this temple built?',
  'What should I look at?',
  'What are you afraid of?',
  'What is disappearing?',
  'Tell me about the light',
  'Who built you?',
  'What happened to your tower?',
];

const CHARACTERS = [
  { id: 'sun', emoji: '☀️', name: 'Surya', role: 'Symbolic Voice of the Sun',
    quickQuestions: ['What have you seen?', 'What are you afraid of?', 'What is disappearing?', 'Why was this built?'] },
  { id: 'sculptor', emoji: '🪨', name: 'Devasena', role: 'Solanki Sculptor — 11th Century',
    quickQuestions: ['What did you carve?', 'What does it mean?', 'How long did it take?', 'What is the temple saying?'] },
  { id: 'pastVisitor', emoji: '🚶', name: 'A Pilgrim', role: 'Visitor from Medieval Gujarat',
    quickQuestions: ['Why did you come here?', 'What do you see at dawn?', 'What is sacred here?', 'What moves you?'] },
  { id: 'temple', emoji: '🏛️', name: 'The Sun Temple', role: 'Surya Mandir, Modhera, c. 1026 CE',
    quickQuestions: ['How old are you?', 'What have you seen?', 'What is hurting you?', 'What is disappearing?'] },
];

const FACTS = [
  { label: 'Built', value: 'c. 1026 CE' },
  { label: 'Dynasty', value: 'Chaulukya (Solanki)' },
  { label: 'Style', value: 'Maru-Gurjara (Nagara)' },
  { label: 'Solar alignment', value: 'Equinox sunrise illuminates sanctum directly' },
  { label: 'Surya Kund', value: '108 miniature shrines on stepped tank' },
  { label: 'Shikhara', value: 'Lost — earthquake or raid, debated' },
  { label: 'Protection', value: 'Archaeological Survey of India (ASI)' },
];

export default function ModheraExperience({ onBack }) {
  const [activeTab, setActiveTab] = useState('talk');
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
  const [charLoading, setCharLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [sunResponse, setSunResponse] = useState('');
  const [sunLoading, setSunLoading] = useState(false);
  const [sunQuestion, setSunQuestion] = useState('');

  const handleAskCharacter = async (question) => {
    if (!selectedChar) return '';
    setCharLoading(true);
    try {
      const result = await orchestrate({
        userInput: question,
        location: 'Modhera Sun Temple, Gujarat',
        characterId: selectedChar.id,
        mode: 'character',
        onStatus: setStatus,
      });
      return result.data || 'The light speaks. Listen carefully.';
    } finally {
      setCharLoading(false);
    }
  };

  const handleAskSun = async (question) => {
    setSunLoading(true);
    setSunResponse('');
    setSunQuestion(question);
    try {
      const result = await orchestrate({
        userInput: question,
        location: 'Modhera Sun Temple, Gujarat',
        characterId: 'sun',
        mode: 'character',
        onStatus: setStatus,
      });
      setSunResponse(result.data || '');
    } finally {
      setSunLoading(false);
    }
  };

  return (
    <div className="fade-enter">
      {/* Header */}
      <div className="page-header" style={{ background: 'linear-gradient(to bottom, rgba(245,166,35,0.06), transparent)' }}>
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="page-eyebrow">Heritage Alive — Modhera</div>
        <div className="sun-orb" style={{ marginTop: '1.5rem' }} />
        <h2 style={{ color: 'var(--sun)', marginTop: 0 }}>Talk to the Sun</h2>
        <p style={{ maxWidth: '480px', margin: '1rem auto 0', fontStyle: 'italic' }}>
          "I have watched the morning light fall across these stones for a thousand years."
        </p>
      </div>

      <div className="container">
        {/* Quick fact strip */}
        <div style={{
          display: 'flex', gap: '0', overflowX: 'auto', marginTop: '2.5rem',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'
        }}>
          {FACTS.map((f, i) => (
            <div key={i} style={{
              flexShrink: 0, padding: '1rem 1.5rem',
              borderRight: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold-dim)', marginBottom: '0.3rem' }}>{f.label}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--warm)', whiteSpace: 'nowrap' }}>{f.value}</div>
            </div>
          ))}
        </div>

        {/* Nav tabs */}
        <div className="nav-tabs" style={{ marginTop: '2.5rem' }}>
          {['talk', 'characters', 'temple-info'].map(tab => (
            <button
              key={tab}
              className={`nav-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'talk' ? '☀️ Ask the Sun'
                : tab === 'characters' ? '🗣️ Meet Someone'
                : '🏛️ The Temple'}
            </button>
          ))}
        </div>

        {/* ASK THE SUN TAB */}
        {activeTab === 'talk' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <div className="sun-hero" style={{ paddingTop: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm)', marginBottom: '0.5rem' }}>
                What do you want to ask?
              </h3>
              <p style={{ maxWidth: '460px', margin: '0 auto 2rem', fontStyle: 'italic' }}>
                The Sun has watched these stones for a thousand years. It has answers — but it may ask a question back.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                {MODHERA_QUESTIONS.map(q => (
                  <button
                    key={q}
                    className="quick-btn"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.1rem' }}
                    onClick={() => handleAskSun(q)}
                    disabled={sunLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <AgentStatus status={status} />

            {sunLoading && (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--gold-dim)',
                fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                The light moves across the stones...
              </div>
            )}

            {sunResponse && (
              <div className="fade-enter" style={{ maxWidth: '680px', margin: '0 auto' }}>
                {sunQuestion && (
                  <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem',
                    background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)',
                    borderRadius: '2px', fontStyle: 'italic', color: 'var(--warm-dim)', fontSize: '0.9rem' }}>
                    You asked: "{sunQuestion}"
                  </div>
                )}
                <MockBadge mock={true} />
                <div style={{ color: 'var(--amber)', fontSize: '0.68rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginBottom: '1rem' }}>
                  SURYA SPEAKS — AI generated · Not historical documentation
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                  lineHeight: '2',
                  color: 'var(--warm)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {sunResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHARACTERS TAB */}
        {activeTab === 'characters' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm)', marginBottom: '0.5rem' }}>
              Who speaks from Modhera?
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              From the sun itself to the sculptor who spent four years on a single figure.
            </p>

            <div className="character-grid" style={{ marginBottom: '2rem' }}>
              {CHARACTERS.map(char => (
                <button
                  key={char.id}
                  className={`character-btn${selectedChar?.id === char.id ? ' active' : ''}`}
                  onClick={() => setSelectedChar(char)}
                >
                  <span className="character-emoji">{char.emoji}</span>
                  <span className="character-name">{char.name}</span>
                  <span className="character-role">{char.role}</span>
                </button>
              ))}
            </div>

            <AgentStatus status={status} />

            <ChatInterface
              character={selectedChar}
              location="Modhera Sun Temple, Gujarat"
              onAsk={handleAskCharacter}
              loading={charLoading}
            />
          </div>
        )}

        {/* TEMPLE INFO TAB */}
        {activeTab === 'temple-info' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <div style={{ maxWidth: '720px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: '1.5rem' }}>
                The Temple That Speaks in Light
              </h3>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  {
                    title: 'The Solar Alignment',
                    content: `At the equinoxes — March and September — the rising sun enters the Sabha Mandapa through the eastern archway and illuminates the sanctum directly. This solar engineering, built around 1026 CE without modern instruments, demonstrates extraordinary astronomical knowledge. The builders embedded a calendar into the architecture itself.`
                  },
                  {
                    title: 'The Surya Kund',
                    content: `The stepped tank (vav/kund) at the temple entrance measures approximately 176 × 120 feet with 108 miniature shrines arranged on its stepped sides. 108 is sacred in Hindu cosmology. At dawn, the kund reflects the rising sun — creating a mirror of the sky in the earth.`
                  },
                  {
                    title: 'The Sabha Mandapa',
                    content: `The Assembly Hall has 52 intricately carved columns depicting scenes from the Ramayana, Mahabharata, celestial beings, and geometric patterns. Each pillar is unique. The entire hall was designed as a visual scripture — a narrative in stone that changes with the light.`
                  },
                  {
                    title: 'The Missing Shikhara',
                    content: `The main tower (shikhara) of the sanctum is gone. Whether it fell in an earthquake or was demolished in a raid is still debated. Its absence gives the temple a particular quality of ruin — not finished, not destroyed, but suspended between two states.`
                  },
                  {
                    title: 'What Is Being Lost',
                    content: `The carved stone is slowly dissolving. Salt crystallization in the finest cuts — the fingers of apsaras, the edges of ornamental borders — is irreversible. The knowledge of how to read the iconographic program (what each sculpture means, where it belongs in the visual scripture) is becoming scarce. Conservation here is about preserving not just stone but literacy.`
                  }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    padding: '1.5rem', borderRadius: '3px'
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem',
                      color: 'var(--gold)', marginBottom: '0.75rem' }}>{item.title}</div>
                    <p style={{ fontFamily: 'var(--font-serif)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', background: 'rgba(245,166,35,0.06)',
                border: '1px solid rgba(245,166,35,0.15)', borderRadius: '2px',
                fontSize: '0.78rem', color: 'var(--amber)', letterSpacing: '0.05em' }}>
                ◎ All heritage information sourced from Archaeological Survey of India documentation,
                academic literature on Solanki architecture, and verified cultural records.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
