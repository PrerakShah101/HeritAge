import { useState, useRef } from 'react';
import { AgentStatus, MockBadge, ChatInterface } from './SharedComponents.jsx';
import { orchestrate } from '../services/orchestrator.js';

export default function WallTalk({ onBack }) {
  const [dragging, setDragging] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [charLoading, setCharLoading] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAnalysis(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await orchestrate({
        mode: 'imageAnalysis',
        fileName: imageFile.name,
        onStatus: setStatus,
      });
      setAnalysis(result.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAskHouse = async (question) => {
    if (!analysis) return '';
    setCharLoading(true);
    try {
      const result = await orchestrate({
        userInput: question,
        location: 'Ahmedabad Walled City — heritage structure',
        characterId: 'house',
        mode: 'character',
        onStatus: setStatus,
      });
      return result.data || 'The walls hold their silence.';
    } finally {
      setCharLoading(false);
    }
  };

  const houseCharacter = {
    id: 'house',
    emoji: '🏘️',
    name: analysis?.disclaimer ? 'This Heritage Structure' : 'The Haveli',
    role: analysis?.architecturalElement || 'Heritage Architecture',
    quickQuestions: ['How old are you?', 'Who lived here?', 'What do you remember?', 'What is hurting you?', 'What do you need?']
  };

  return (
    <div className="fade-enter">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="page-eyebrow">Heritage Alive — If This Wall Could Talk</div>
        <h2 style={{ color: 'var(--gold)' }}>Who Are You?</h2>
        <p style={{ maxWidth: '480px', margin: '1rem auto 0', fontStyle: 'italic' }}>
          Upload an image of a heritage structure. The Heritage Detective will examine it,
          then you can talk to what you found.
        </p>
      </div>

      <div className="container">
        <div style={{ maxWidth: '740px', margin: '3rem auto 0', display: 'grid', gap: '2rem' }}>

          {/* Upload area */}
          {!imageUrl ? (
            <div
              className={`upload-area${dragging ? ' dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <div className="upload-icon">🏛️</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--warm-dim)', marginBottom: '0.5rem' }}>
                Drop an image here, or click to upload
              </div>
              <div className="upload-hint">
                Heritage structures, facades, doorways, walls, carvings — any architectural image
              </div>
              <div className="upload-hint" style={{ marginTop: '0.75rem', color: 'var(--amber)' }}>
                ⚠️ This app does not perform real computer vision analysis.
                Image analysis is simulated using heritage knowledge.
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files?.[0])}
              />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              <div>
                <img
                  src={imageUrl}
                  alt="Uploaded heritage structure"
                  style={{ width: '100%', height: '280px', objectFit: 'cover',
                    border: '1px solid var(--border)', borderRadius: '3px' }}
                />
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: '0.75rem', width: '100%' }}
                  onClick={() => { setImageUrl(''); setImageFile(null); setAnalysis(null); }}
                >
                  Upload different image
                </button>
              </div>

              {!analysis ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm)' }}>
                    Ready to analyze
                  </div>
                  <p style={{ fontSize: '0.88rem' }}>
                    The Heritage Detective will examine this image using architectural knowledge
                    of Ahmedabad and Gujarat heritage structures.
                  </p>
                  <button
                    className="btn btn-gold"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? <><span className="spinner" /> Analyzing...</> : '🔎 Analyze This Structure'}
                  </button>
                  <AgentStatus status={status} />
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--gold-dim)', marginBottom: '1rem' }}>Heritage Detective Report</div>

                  <div style={{ background: 'rgba(212,120,58,0.08)', border: '1px solid rgba(212,120,58,0.2)',
                    padding: '0.75rem', borderRadius: '2px', marginBottom: '1rem',
                    fontSize: '0.75rem', color: 'var(--amber)' }}>
                    {analysis.disclaimer}
                  </div>

                  {[
                    { label: 'Identity', value: analysis.architecturalElement },
                    { label: 'Location', value: analysis.location },
                    { label: 'Estimated Age', value: analysis.estimatedAge },
                    { label: 'Condition', value: analysis.condition },
                  ].map(item => item.value && (
                    <div key={item.label} style={{ marginBottom: '0.75rem' }}>
                      <div className="detection-label">{item.label}</div>
                      <div className="detection-value" style={{ fontSize: '0.85rem' }}>{item.value}</div>
                    </div>
                  ))}

                  {analysis.features?.length > 0 && (
                    <div>
                      <div className="detection-label">Features Detected</div>
                      <ul style={{ paddingLeft: '1rem', fontSize: '0.82rem', color: 'var(--warm-dim)' }}>
                        {analysis.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Chat with the structure */}
          {analysis && (
            <div className="fade-enter">
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginTop: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--gold)',
                  marginBottom: '0.5rem' }}>Ask the Structure</div>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Now that the Heritage Detective has identified this structure, you can speak with it directly.
                </p>
                <MockBadge mock={true} />
                <div style={{ marginTop: '1rem' }}>
                  <ChatInterface
                    character={houseCharacter}
                    location="Ahmedabad Walled City — uploaded heritage structure"
                    onAsk={handleAskHouse}
                    loading={charLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
