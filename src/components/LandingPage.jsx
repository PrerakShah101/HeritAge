import { useState, useEffect } from 'react';

export default function LandingPage({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="app">
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">Heritage: Alive</div>
        <ul className="nav-links">
          <li><a href="#locations" onClick={e => { e.preventDefault(); onNavigate('ahmedabad'); }}>Explore</a></li>
          <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('thenVsNow'); }}>Then vs Now</a></li>
          <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('modhera'); }}>Modhera</a></li>
          <li><a href="#" onClick={e => { e.preventDefault(); onNavigate('wall-talk'); }}>Wall Talk</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />

        <div className="hero-eyebrow">IBM Granite · Heritage AI · India</div>

        <h1 className="hero-title">
          Heritage
          <span className="alive">Alive</span>
        </h1>

        <p className="hero-subtitle">
          "The past isn't gone. It is waiting to talk."
        </p>

        <div className="divider center" style={{ marginTop: '2rem' }} />

        <div className="hero-cta">
          <button className="btn btn-gold btn-lg" onClick={() => onNavigate('demo')}>
            ✦ Show Me the Magic
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('ahmedabad')}>
            Walk into the Pol
          </button>
          <button className="btn btn-sun btn-lg" onClick={() => onNavigate('modhera')}>
            Talk to the Sun ☀️
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase'
        }}>
          Explore
          <div style={{ width: '1px', height: '32px', background: 'var(--gold-dim)', opacity: 0.5 }} />
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold-dim)', marginBottom: '1rem' }}>Two Places. Centuries of Story.</div>
            <h2 style={{ color: 'var(--warm)', maxWidth: '500px', margin: '0 auto' }}>
              Where do you want to begin?
            </h2>
          </div>

          <div className="locations">
            <div className="location-card" onClick={() => onNavigate('ahmedabad')}>
              <span className="location-icon">🏘️</span>
              <div className="location-name">Ahmedabad Walled City</div>
              <div className="location-tagline">"Walk into the pols."</div>
              <p style={{ marginTop: '1rem', fontSize: '0.88rem' }}>
                Founded 1411 CE. UNESCO World Heritage City. A living urban fabric of pols,
                wooden facades, carved balconies and six centuries of community life.
              </p>
              <div className="location-cta">Enter the city →</div>
            </div>

            <div className="location-card" onClick={() => onNavigate('modhera')}
              style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.04), var(--surface))' }}>
              <span className="location-icon">☀️</span>
              <div className="location-name" style={{ color: 'var(--sun)' }}>Modhera Sun Temple</div>
              <div className="location-tagline">"Talk to the Sun."</div>
              <p style={{ marginTop: '1rem', fontSize: '0.88rem' }}>
                Built c. 1026 CE by the Solanki dynasty. A temple that speaks in light —
                precisely aligned to illuminate its sanctum at the equinox dawn.
              </p>
              <div className="location-cta" style={{ color: 'var(--sun)', opacity: 0.6 }}>Enter the temple →</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE EXPERIENCES */}
      <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)',
        background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold-dim)', marginBottom: '1rem' }}>What You Can Do</div>
            <h2 style={{ color: 'var(--warm)' }}>Four Experiences</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px' }}>
            {[
              {
                emoji: '🗺️',
                title: 'Walk Into the Pol',
                desc: 'Select a heritage location in Ahmedabad. Travel back in time. Meet the people who lived there.',
                action: () => onNavigate('ahmedabad'),
                cta: 'Explore Ahmedabad'
              },
              {
                emoji: '☀️',
                title: 'Talk to the Sun',
                desc: 'Ask Surya anything. The Sun has watched these stones for a thousand years and has a few questions back.',
                action: () => onNavigate('modhera'),
                cta: 'Enter Modhera'
              },
              {
                emoji: '🏛️',
                title: 'If This Wall Could Talk',
                desc: 'Upload a heritage image. The Heritage Detective identifies it. Then you can speak directly with what you found.',
                action: () => onNavigate('wall-talk'),
                cta: 'Upload an Image'
              },
              {
                emoji: '⟵ ⟶',
                title: 'Then vs Now',
                desc: 'See what has changed. Understand what is being lost — and what conservation must protect.',
                action: () => onNavigate('thenVsNow'),
                cta: 'Compare'
              }
            ].map((exp, i) => (
              <div key={i} className="card" style={{ borderRadius: 0, cursor: 'pointer',
                borderColor: 'transparent', borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)' }}
                onClick={exp.action}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{exp.emoji}</div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>{exp.title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{exp.desc}</p>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--gold-dim)' }}>{exp.cta} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SYSTEM SECTION */}
      <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--gold-dim)', marginBottom: '1rem' }}>Powered By</div>
              <h2 style={{ color: 'var(--warm)', marginBottom: '1.5rem' }}>
                IBM Granite<br />
                <span style={{ color: 'var(--gold-dim)', fontSize: '0.6em', fontStyle: 'italic' }}>Heritage Orchestrator</span>
              </h2>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Instead of telling tourists about heritage, we let heritage tell its own story.
                IBM Granite orchestrates three specialized agents — Heritage Detective,
                Time Travel, and Character — into one coherent experience.
              </p>
              <div className="mock-badge" style={{ display: 'inline-flex' }}>
                ◎ Running in demo mode — connects to watsonx.ai when credentials provided
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '🔎', name: 'Heritage Detective', desc: 'Identifies architectural elements, historical context, conservation concerns' },
                { icon: '⏳', name: 'Time Travel Agent', desc: 'Reconstructs historical atmosphere for any selected period' },
                { icon: '🗣️', name: 'Character Agent', desc: 'Gives voice to residents, merchants, craftsmen, and the buildings themselves' },
                { icon: '🧠', name: 'Heritage Orchestrator', desc: 'Coordinates agents based on user intent, combines outputs coherently' },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', gap: '1rem', padding: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm)', fontSize: '0.95rem',
                      marginBottom: '0.25rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid var(--border)',
        textAlign: 'center', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            color: 'var(--warm)', lineHeight: 1.3, marginBottom: '1.5rem' }}>
            "Instead of telling tourists<br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>about heritage,</span><br />
            we let heritage tell<br />its own story."
          </div>
          <div className="divider center" />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-lg" onClick={() => onNavigate('demo')}>
              ✦ Start the Demo
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('ahmedabad')}>
              Explore the City
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border)',
        textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-dim)', marginBottom: '0.5rem' }}>
            Heritage: Alive
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            An IBM watsonx.ai + Granite experience for Ahmedabad Walled City & Modhera Sun Temple
          </div>
          <div>
            Heritage knowledge sourced from UNESCO documentation, Archaeological Survey of India records,
            and published academic research. AI reconstructions clearly labeled throughout.
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)',
            fontSize: '0.7rem' }}>
            Made with IBM Bob
          </div>
        </div>
      </footer>
    </div>
  );
}
