import { useState, useEffect, useRef } from 'react';

const DEMO_STEPS = [
  {
    id: 'enter',
    delay: 0,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--gold-dim)', marginBottom: '1.5rem' }}>
          Heritage Alive — Demo Mode
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          color: 'var(--warm)', marginBottom: '1rem', lineHeight: 1.2 }}>
          Entering Ahmedabad<br />
          <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Walled City</span>
        </div>
        <div style={{ color: 'var(--warm-dim)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
          Walking into the pol...
        </div>
      </div>
    )
  },
  {
    id: 'detection',
    delay: 2500,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: '1.5rem', background: 'rgba(212,120,58,0.1)',
          border: '1px solid rgba(212,120,58,0.2)', padding: '0.4rem 1rem', borderRadius: '2px',
          display: 'inline-block' }}>
          Heritage Detective
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--warm-dim)',
          marginBottom: '1.5rem', fontStyle: 'italic' }}>
          🔎 Looking at the place...
        </div>
        <div style={{ display: 'grid', gap: '0.75rem', textAlign: 'left', maxWidth: '540px', margin: '0 auto' }}>
          {[
            { label: 'Location', value: 'Ahmedabad Walled City, UNESCO World Heritage' },
            { label: 'Element', value: 'Traditional Pol — wooden facade, jharokha windows' },
            { label: 'Context', value: 'Pol system, 15th century. Founded 1411 CE by Sultan Ahmad Shah' },
            { label: 'Conservation', value: 'Deteriorating wooden elements; skilled craftsmen vanishing' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.12)', padding: '0.75rem 1rem', borderRadius: '2px' }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold-dim)', marginBottom: '0.3rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--warm)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'timetravel',
    delay: 5500,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--gold-dim)',
          letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          🧠 Remembering its history...
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)',
          marginBottom: '1.5rem' }}>
          Time Travel Agent — Ahmedabad 1900
        </div>
        <div className="demo-scene" style={{ background: 'rgba(201,168,76,0.03)',
          border: '1px solid rgba(201,168,76,0.1)', padding: '1.5rem', borderRadius: '3px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: '1rem' }}>
            AI RECONSTRUCTION — inspired by historical and cultural sources
          </div>
{`TIME: 1905 — Ahmedabad, Gujarat

The narrow lane of the pol is filling with the sounds of morning.

A merchant opens his cloth shop — bolts of cotton and silk stacked ceiling-high behind him. He calls to the food vendor across the lane. The food vendor does not hear him — he is busy with a large pot of oil, dropping swirls of batter, the jalebi spiralling golden in the heat.

The wooden balconies above — carved with peacocks and elephants — are draped with bright fabrics. Somewhere deep in the pol, a woman sings while grinding spices.

The pol has its own gravity. It pulls you inward, slows you down, makes you part of its rhythm.

The day is beginning. The pol remembers.`}
        </div>
      </div>
    )
  },
  {
    id: 'character',
    delay: 9000,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--warm-dim)',
          marginBottom: '1rem', fontStyle: 'italic' }}>
          👥 Imagining its people...
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)',
          marginBottom: '2rem' }}>
          Character Agent — Kaka, Old Resident
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left',
          maxWidth: '580px', margin: '0 auto' }}>
          <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>👴</div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '0.5rem' }}>
              Kaka — Old Resident of the Pol
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: '1.8',
              color: 'var(--warm)', background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '1.25rem', borderRadius: '3px' }}>
              {`"Eh. You want to know about this pol?

I'll tell you what my grandfather told me. He told me what his grandfather told him. This pol was built before anyone here was born.

The question is — will it still be a pol? Or will it just be a building?

The wood is rotting. The knowledge is retiring."`}
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'question',
    delay: 13000,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm-dim)',
          fontStyle: 'italic', marginBottom: '1.5rem' }}>
          User asks:
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--warm)',
          marginBottom: '2.5rem' }}>
          "What are you afraid of?"
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--warm-dim)',
          fontStyle: 'italic' }}>
          🗣️ Bringing the story to life...
        </div>
      </div>
    )
  },
  {
    id: 'answer',
    delay: 16000,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left',
          maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>👴</div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '0.75rem' }}>
              Kaka speaks
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: '1.9',
              color: 'var(--warm)', background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '1.5rem', borderRadius: '3px' }}>
              {`"What am I afraid of?

The locked houses. The absentee owners. The buildings that stand empty for years while the wood rots from inside.

I am afraid of becoming the last person in this pol who knows the names of every family that lived here for four generations. Who knows what that carved peacock above the third doorway means, and who put it there.

I am afraid of disappearing without anyone noticing that something important disappeared with me.

The pol is the city's memory. When the pol empties, the city forgets who it is.

That is what I am afraid of."`}
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'transition',
    delay: 21000,
    render: () => (
      <div className="demo-step" style={{ animationDelay: '0s', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold-dim)',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Then → Now
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px',
          maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold-dim)', marginBottom: '1rem' }}>Then</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', lineHeight: '1.8',
              color: 'var(--warm-dim)' }}>
              Every house inhabited. Craftsmen in the pol. The wooden facades maintained and painted.
              The chabutros alive with birds. The gates closed at night. Neighbours knew everything
              about each other. The pol was a kinship system expressed in architecture.
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold-dim)', marginBottom: '1rem' }}>Now</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', lineHeight: '1.8',
              color: 'var(--warm-dim)' }}>
              Many pols half-empty. Absentee owners. Wooden facades deteriorating. Cable wires
              bolted across carved surfaces. UNESCO listing (2017) increased awareness — but
              conservation remains underfunded. The most endangered element is the community itself.
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'final',
    delay: 26000,
    render: (onClose, onModhera) => (
      <div className="demo-step" style={{ animationDelay: '0s', textAlign: 'center' }}>
        <div className="demo-final" style={{ marginBottom: '1.5rem' }}>
          Heritage is not just<br />what we preserve.
        </div>
        <div className="demo-final" style={{ color: 'var(--warm)', fontSize: 'clamp(1.3rem, 3vw, 2rem)',
          marginBottom: '3rem' }}>
          It is what we remember.
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-gold btn-lg" onClick={() => onModhera?.()}>
            Explore Modhera →
          </button>
          <button className="btn btn-ghost" onClick={() => onClose?.()}>
            Close Demo
          </button>
        </div>
      </div>
    )
  }
];

export default function DemoMode({ onClose, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef([]);

  useEffect(() => {
    setVisible(true);
    // Schedule step transitions
    DEMO_STEPS.forEach((step, i) => {
      const timer = setTimeout(() => {
        setCurrentStep(i);
      }, step.delay);
      timerRef.current.push(timer);
    });

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  const handleClose = () => {
    timerRef.current.forEach(clearTimeout);
    onClose?.();
  };

  const handleModhera = () => {
    timerRef.current.forEach(clearTimeout);
    onClose?.();
    onNavigate?.('modhera');
  };

  const step = DEMO_STEPS[currentStep];

  return (
    <div className="demo-overlay">
      {/* Skip button */}
      <button
        className="btn btn-ghost btn-sm"
        onClick={handleClose}
        style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 201 }}
      >
        Skip Demo
      </button>

      {/* Step counter */}
      <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem', zIndex: 201 }}>
        {DEMO_STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === currentStep ? '24px' : '8px',
            height: '3px',
            borderRadius: '2px',
            background: i === currentStep ? 'var(--gold)' : 'var(--border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Step content */}
      <div key={currentStep} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {step?.render(handleClose, handleModhera)}
      </div>
    </div>
  );
}
