import React, { useState } from 'react';
import { GraduationCap, Map, MessageSquareQuote, ChevronRight, Activity, Zap, PlayCircle, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AIChatWidget from '../components/AIChatWidget';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GraduationCap size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Student Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>Student</span>
          <button onClick={() => { logout(); navigate('/'); }} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <button className={`glass-button ${activeTab === 'overview' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'overview' ? 'var(--primary)' : 'transparent', color: activeTab === 'overview' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`glass-button ${activeTab === 'roadmap' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'roadmap' ? 'var(--primary)' : 'transparent', color: activeTab === 'roadmap' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('roadmap')}>My Roadmap</button>
        <button className={`glass-button ${activeTab === 'feedback' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'feedback' ? 'var(--primary)' : 'transparent', color: activeTab === 'feedback' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('feedback')}>Feedback</button>
      </div>

      {activeTab === 'overview' && (
        <div className="delay-100">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <StatCard title="Overall Score" value={`${user?.score || 0}%`} progress={user?.score || 0} icon={<Activity size={24} />} color="#34d399" />
            <StatCard title="Performance Status" value={user?.performance || "Pending"} icon={<Star size={24} />} color="#fbbf24" />
            
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
              <button onClick={() => navigate('/assessment')} className="glass-button" style={{ background: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
                <PlayCircle /> Take Pending Assessment
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={20} /> My Strengths</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {user?.strengths?.map((str, i) => <li key={i}>{str}</li>)}
                {(!user?.strengths || user?.strengths.length === 0) && <li style={{color: 'var(--text-muted)'}}>No analysis available yet.</li>}
              </ul>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Map size={20} /> Areas to Improve</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {user?.weaknesses?.map((wk, i) => <li key={i}>{wk}</li>)}
                {(!user?.weaknesses || user?.weaknesses.length === 0) && <li style={{color: 'var(--text-muted)'}}>No analysis available yet.</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Current Learning Path</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(52, 211, 153, 0.1)', borderLeft: '4px solid #34d399', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#34d399' }}>Active Phase</h4>
              <p style={{ margin: 0 }}>{user?.roadmap || 'Complete assignment to unlock roadmap.'}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageSquareQuote size={24} color="#818cf8"/> Mentor Review</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            "{user?.feedback || 'Awaiting mentor review.'}"
          </p>
        </div>
      )}

      <AIChatWidget />
    </div>
  );
}
