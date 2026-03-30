import React, { useState, useEffect, useRef } from 'react';
import { Maximize, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Assessment() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Full Screen Detection & Management
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const requestFullScreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to enable fullscreen:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/student/assessment/submit', { solution });
      setSubmitted(true);
      
      // Force exit full screen if exists
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      
      // Update local storage user manually to refresh stats seamlessly
      const rawUser = localStorage.getItem('user');
      if(rawUser) {
         let parsed = JSON.parse(rawUser);
         // Simulate refresh by forcing a reload next time user hits dashboard or pinging login again.
         // Real app would fetch context again. This is a quick fix.
      }
      
      setTimeout(() => {
        window.location.href = '/student'; // Full reload to catch new data from context
      }, 2000);
      
    } catch (err) {
      console.error(err);
      alert('Failed to submit assessment');
    }
  };

  // Anti-Cheating Event Handlers
  const preventCheating = (e) => {
    e.preventDefault();
  };

  if (submitted) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-dark)' }}>
        <CheckCircle size={64} color="#34d399" />
        <h1 style={{ marginTop: '2rem' }}>Assessment Submitted!</h1>
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        background: 'var(--bg-dark)',
        color: 'var(--text-main)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Block Layout when not in Full Screen */}
      {!isFullScreen && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 17, 21, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <ShieldAlert size={64} color="#ef4444" style={{ marginBottom: '2rem' }} />
          <h1 style={{ margin: '0 0 1rem 0' }}>Full Screen Required</h1>
          <p style={{ maxWidth: '500px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
            This is a secure assessment environment. You must attend in full-screen mode. 
            If you exit full-screen mode, the assessment will pause and cannot be continued until you return.
          </p>
          <button onClick={requestFullScreen} className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '16px 32px' }}>
            <Maximize /> Enter Full Screen to Continue
          </button>
        </div>
      )}

      {/* Header */}
      <header style={{ padding: '1rem 2rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Final Assessment: Data Structures</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24' }}>
            <Clock size={20} /> <span style={{ fontWeight: 'bold' }}>45:00 Remaining</span>
          </div>
          <button onClick={handleSubmit} className="glass-button" style={{ background: '#34d399', width: 'auto', padding: '8px 24px' }}>
            Submit Assessment
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Pane: Question & Examples */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', borderRight: '1px solid var(--border-glass)' }}>
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Question 1</h3>
            <p style={{ lineHeight: '1.8', margin: 0 }}>
              Write a function that reverses an array in-place. The function should take an array of integers and mutate it so that the elements are in reverse order.
              <strong> You must not use built-in reverse functions.</strong>
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#818cf8' }}>Examples</h4>
            <div style={{ background: '#000', padding: '1rem', borderRadius: '4px', fontFamily: 'monospace', color: '#a5b4fc', marginBottom: '1rem' }}>
              Input: [1, 2, 3, 4, 5]<br />
              Output: [5, 4, 3, 2, 1]
            </div>
            <div style={{ background: '#000', padding: '1rem', borderRadius: '4px', fontFamily: 'monospace', color: '#a5b4fc' }}>
              Input: [10, 20]<br />
              Output: [20, 10]
            </div>
          </div>
        </div>

        {/* Right Pane: Solution Typing Area (No Copy/Paste) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
          <div style={{ padding: '1rem', background: '#2d2d2d', borderBottom: '1px solid #404040', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#ccc', fontSize: '0.875rem', fontWeight: 'bold' }}>solution.js</span>
            <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              NO COPY / PASTE
            </span>
          </div>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            onCopy={preventCheating}
            onCut={preventCheating}
            onPaste={preventCheating}
            onContextMenu={preventCheating}
            placeholder="// Type your solution here... (Syntax strictly manual)"
            style={{
              flex: 1,
              width: '100%',
              background: 'transparent',
              color: '#d4d4d4',
              border: 'none',
              padding: '1.5rem',
              fontFamily: '"Fira Code", monospace',
              fontSize: '1rem',
              lineHeight: '1.6',
              outline: 'none',
              resize: 'none'
            }}
            spellCheck="false"
          />
        </div>

      </div>
    </div>
  );
}
