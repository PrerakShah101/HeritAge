import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import AhmedabadExperience from './components/AhmedabadExperience.jsx';
import ModheraExperience from './components/ModheraExperience.jsx';
import WallTalk from './components/WallTalk.jsx';
import ThenVsNow from './components/ThenVsNow.jsx';
import DemoMode from './components/DemoMode.jsx';

export default function App() {
  const [view, setView] = useState('home');
  const [showDemo, setShowDemo] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const navigate = (destination) => {
    if (destination === 'demo') {
      setShowDemo(true);
    } else {
      setView(destination);
    }
  };

  const goHome = () => setView('home');

  return (
    <>
      {/* Demo overlay — rendered on top of current view */}
      {showDemo && (
        <DemoMode
          onClose={() => setShowDemo(false)}
          onNavigate={(dest) => {
            setShowDemo(false);
            setView(dest);
          }}
        />
      )}

      {/* Main view routing */}
      {view === 'home' && <LandingPage onNavigate={navigate} />}
      {view === 'ahmedabad' && <AhmedabadExperience onBack={goHome} />}
      {view === 'modhera' && <ModheraExperience onBack={goHome} />}
      {view === 'wall-talk' && <WallTalk onBack={goHome} />}
      {view === 'thenVsNow' && <ThenVsNow onBack={goHome} />}
    </>
  );
}
