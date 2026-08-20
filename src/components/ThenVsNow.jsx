import { useState } from 'react';
import { AgentStatus, MockBadge, ThenVsNowDisplay } from './SharedComponents.jsx';
import { orchestrate } from '../services/orchestrator.js';

const LOCATIONS_AHM = [
  { id: 'ahm-pol', label: 'A Traditional Pol', location: 'Ahmedabad Walled City — Traditional Pol neighbourhood' },
  { id: 'ahm-td', label: 'Teen Darwaza', location: 'Ahmedabad Walled City — Teen Darwaza' },
  { id: 'ahm-wood', label: 'Wooden Facade', location: 'Ahmedabad Walled City — Wooden facade residential architecture' },
];

const LOCATIONS_MOD = [
  { id: 'mod-temple', label: 'Sun Temple', location: 'Modhera Sun Temple, Gujarat' },
  { id: 'mod-kund', label: 'Surya Kund', location: 'Modhera Sun Temple — Surya Kund stepwell' },
];

export default function ThenVsNow({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!selected) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await orchestrate({
        mode: 'thenVsNow',
        location: selected.location,
        userInput: selected.label,
        onStatus: setStatus,
      });
      setResult(r.data);
    } finally {
      setLoading(false);
    }
  };

  const allLocations = [...LOCATIONS_AHM, ...LOCATIONS_MOD];

  return (
    <div className="fade-enter">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="page-eyebrow">Heritage Alive — Then vs Now</div>
        <h2 style={{ color: 'var(--gold)' }}>Then → Now</h2>
        <p style={{ maxWidth: '480px', margin: '1rem auto 0', fontStyle: 'italic' }}>
          What has changed? What is being lost? What must we remember?
        </p>
      </div>

      <div className="container">
        <div style={{ maxWidth: '800px', margin: '3rem auto 0' }}>

          {/* Location picker */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: '1rem' }}>Choose a place</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem' }}>
              {allLocations.map(loc => (
                <button
                  key={loc.id}
                  className={`character-btn${selected?.id === loc.id ? ' active' : ''}`}
                  onClick={() => setSelected(loc)}
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {loc.id.startsWith('mod') ? '☀️' : '🏘️'}
                  </span>
                  <span className="character-name">{loc.label}</span>
                  <span className="character-role">
                    {loc.id.startsWith('mod') ? 'Modhera' : 'Ahmedabad'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-gold btn-lg"
            onClick={handleCompare}
            disabled={loading || !selected}
            style={{ marginBottom: '1.5rem' }}
          >
            {loading ? <><span className="spinner" /> Comparing...</> : '⟵ Show Then vs Now ⟶'}
          </button>

          <AgentStatus status={status} />

          {result && (
            <div className="fade-enter">
              <MockBadge mock={true} />
              <ThenVsNowDisplay data={result} />
            </div>
          )}

          {/* Static conservation pitch */}
          {!result && (
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold-dim)',
                marginBottom: '1rem', fontStyle: 'italic' }}>
                "Heritage is not just what we preserve.<br />It is what we remember."
              </div>
              <p style={{ fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto' }}>
                Select a location above and see what has changed —
                and what we stand to lose if we stop paying attention.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
