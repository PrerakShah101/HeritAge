import { useState } from 'react';
import { AgentStatus, MockBadge, SceneLabel, SceneText, DetectionResult, ChatInterface } from './SharedComponents.jsx';
import { orchestrate } from '../services/orchestrator.js';

const LOCATIONS = [
  { id: 'teen-darwaza', label: 'Teen Darwaza', desc: 'The triple gateway of Sultan Ahmad Shah, 15th century' },
  { id: 'pol', label: 'A Traditional Pol', desc: 'A self-contained neighbourhood cluster' },
  { id: 'wooden-facade', label: 'Wooden Façade', desc: 'Carved balconies, peacocks, and history' },
  { id: 'courtyard', label: 'Haveli Courtyard', desc: 'Open-sky interior of a heritage home' },
  { id: 'street-market', label: 'Street Market', desc: 'A lane of trade that has run for centuries' },
];

const PERIODS = [
  { value: '1850', label: '1800s' },
  { value: '1905', label: '1900s' },
  { value: '1955', label: '1950s' },
  { value: '2024', label: 'Present' },
];

const CHARACTERS = [
  { id: 'resident', emoji: '👴', name: 'Kaka', role: 'Old Resident',
    quickQuestions: ['How old are you?', 'What do you remember?', 'What are you afraid of?', 'What is disappearing?'] },
  { id: 'merchant', emoji: '🧑', name: 'Rambhai', role: 'Cloth Merchant',
    quickQuestions: ['Tell me about your shop', 'What\'s changing in the market?', 'What do you miss?', 'What gives you hope?'] },
  { id: 'foodVendor', emoji: '🥘', name: 'Maniben', role: 'Food Seller',
    quickQuestions: ['What are you making?', 'Who lives here?', 'What do you miss?', 'Tell me about the pol'] },
  { id: 'craftsman', emoji: '🪵', name: 'Haribhai', role: 'Wood Carver',
    quickQuestions: ['What are you carving?', 'Who taught you?', 'What is being lost?', 'What do you fear?'] },
  { id: 'child', emoji: '🧒', name: 'Chhotu', role: 'Local Child',
    quickQuestions: ['Show me a shortcut', 'What\'s fun here?', 'What is this place?', 'What do you see?'] },
  { id: 'house', emoji: '🏘️', name: 'The Haveli', role: 'Heritage House',
    quickQuestions: ['How old are you?', 'Who lived here?', 'What do you remember?', 'What is hurting you?'] },
];

export default function AhmedabadExperience({ onBack }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [period, setPeriod] = useState('1905');
  const [scene, setScene] = useState(null);
  const [detection, setDetection] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedChar, setSelectedChar] = useState(null);
  const [charLoading, setCharLoading] = useState(false);
  const [chaosScene, setChaosScene] = useState('');
  const [chaosLoading, setChaosLoading] = useState(false);
  const [mock, setMock] = useState(true);

  const handleTakeBack = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    setScene(null);
    setDetection(null);
    setStatus('');
    try {
      const result = await orchestrate({
        userInput: selectedLocation.label,
        location: `Ahmedabad Walled City — ${selectedLocation.label}`,
        period,
        mode: 'timeTravel',
        onStatus: setStatus,
      });
      setDetection(result.detection);
      setScene(result.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAskCharacter = async (question) => {
    if (!selectedChar) return '';
    setCharLoading(true);
    try {
      const result = await orchestrate({
        userInput: question,
        location: `Ahmedabad Walled City${selectedLocation ? ' — ' + selectedLocation.label : ''}`,
        characterId: selectedChar.id,
        mode: 'character',
        onStatus: setStatus,
      });
      return result.data || 'The city remembers, but today it does not speak.';
    } finally {
      setCharLoading(false);
    }
  };

  const handleChaos = async () => {
    setChaosLoading(true);
    setChaosScene('');
    try {
      const result = await orchestrate({
        location: 'Ahmedabad Walled City',
        mode: 'chaos',
        onStatus: setStatus,
      });
      setChaosScene(result.data || '');
    } finally {
      setChaosLoading(false);
    }
  };

  return (
    <div className="fade-enter">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="page-eyebrow">Heritage Alive — Ahmedabad</div>
        <h2 style={{ color: 'var(--gold)' }}>Walk Into the Pol</h2>
        <p style={{ maxWidth: '500px', margin: '1rem auto 0', fontStyle: 'italic' }}>
          "The pol is not just an architecture. It is a way of being together."
        </p>
      </div>

      <div className="container">
        {/* Nav tabs */}
        <div className="nav-tabs" style={{ marginTop: '3rem' }}>
          {['explore', 'characters', 'chaos'].map(tab => (
            <button
              key={tab}
              className={`nav-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'explore' ? '🗺 Explore' : tab === 'characters' ? '👥 Meet Someone' : '🔥 Heritage Chaos'}
            </button>
          ))}
        </div>

        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm)', marginBottom: '0.5rem' }}>
              Where do you want to go?
            </h3>
            <p style={{ marginBottom: '2rem' }}>Select a place, choose a time, step inside.</p>

            {/* Location grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {LOCATIONS.map(loc => (
                <button
                  key={loc.id}
                  className={`character-btn${selectedLocation?.id === loc.id ? ' active' : ''}`}
                  onClick={() => setSelectedLocation(loc)}
                >
                  <span style={{ fontSize: '1.5rem' }}>🏘️</span>
                  <span className="character-name">{loc.label}</span>
                  <span className="character-role">{loc.desc}</span>
                </button>
              ))}
            </div>

            {/* Period selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Travel to</div>
              <div className="period-selector">
                {PERIODS.map(p => (
                  <button
                    key={p.value}
                    className={`period-btn${period === p.value ? ' active' : ''}`}
                    onClick={() => setPeriod(p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn btn-gold btn-lg"
              onClick={handleTakeBack}
              disabled={loading || !selectedLocation}
              style={{ marginBottom: '2rem' }}
            >
              {loading ? <><span className="spinner" /> Remembering...</> : '◀ TAKE ME BACK'}
            </button>

            {/* Agent status */}
            <AgentStatus status={status} />

            {/* Results */}
            {detection && typeof detection === 'object' && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold-dim)', marginBottom: '1rem' }}>Heritage Detective</div>
                <DetectionResult data={detection} />
              </div>
            )}

            {scene && (
              <div className="scene-container fade-enter">
                <MockBadge mock={true} />
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold-dim)',
                    letterSpacing: '0.05em' }}>
                    AHMEDABAD — {period === '2024' ? 'TODAY' : period}
                  </span>
                </div>
                <SceneLabel />
                <SceneText text={scene} />

                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm)' }}>
                      Meet someone from this place →
                    </span>
                  </p>
                  <button className="btn btn-outline" onClick={() => setActiveTab('characters')}>
                    👥 Meet Someone
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHARACTERS TAB */}
        {activeTab === 'characters' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm)', marginBottom: '0.5rem' }}>
              Who do you want to meet?
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              Each person carries a piece of this city's story. Ask them what they know.
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
              location={`Ahmedabad Walled City${selectedLocation ? ' — ' + selectedLocation.label : ''}`}
              onAsk={handleAskCharacter}
              loading={charLoading}
            />
          </div>
        )}

        {/* CHAOS TAB */}
        {activeTab === 'chaos' && (
          <div className="section" style={{ paddingTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: '0.5rem' }}>
              Heritage Chaos
            </h3>
            <p style={{ marginBottom: '2rem', maxWidth: '500px' }}>
              A fictionalized everyday scene in a traditional pol. The chaos that makes this city alive.
            </p>
            <button className="btn btn-gold btn-lg" onClick={handleChaos} disabled={chaosLoading}>
              {chaosLoading ? <><span className="spinner" /> Summoning...</> : '🔥 Give Me the Chaos'}
            </button>

            <AgentStatus status={status} />

            {chaosScene && (
              <div style={{ marginTop: '2rem' }} className="fade-enter">
                <div className="scene-label" style={{ marginBottom: '1rem' }}>
                  FICTIONALIZED AI SCENE INSPIRED BY HERITAGE
                </div>
                <div className="chaos-scene">{chaosScene.replace(/\*\*FICTIONALIZED.*?\*\*\n\n?/s, '')}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
