import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, Activity, Map, MessageSquareText, PlayCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AIChatWidget from '../components/AIChatWidget';
import { getStudentData } from '../data/mockData';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'roadmap' | 'feedback'

  const studentData = getStudentData(user?.email || "student@college.edu");

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container animate-fade-in" style={{ position: 'relative', minHeight: '100vh' }}>
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GraduationCap size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Student Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {studentData.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>Student</span>
          <button onClick={handleLogout} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <button className={`glass-button ${activeTab === 'overview' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'overview' ? 'var(--primary)' : 'transparent', color: activeTab === 'overview' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`glass-button ${activeTab === 'roadmap' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'roadmap' ? 'var(--primary)' : 'transparent', color: activeTab === 'roadmap' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('roadmap')}>My Roadmap</button>
        <button className={`glass-button ${activeTab === 'feedback' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'feedback' ? 'var(--primary)' : 'transparent', color: activeTab === 'feedback' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('feedback')}>Feedback</button>
      </div>

      {activeTab === 'overview' && (
        <div className="delay-100">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <StatCard title="Overall Score" value={studentData.score} progress={parseInt(studentData.score)} icon={<Activity size={24} />} color="#34d399" />
            <StatCard title="Performance Status" value={studentData.performance} icon={<BookOpen size={24} />} color="#818cf8" />
            
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--primary)' }}>
              <button onClick={() => navigate('/assessment')} className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', padding: '16px 24px', fontSize: '1.125rem' }}>
                <PlayCircle /> Take Pending Assessment
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#4ade80' }}>My Strengths</h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {studentData.strengths?.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#f87171' }}>Areas to Improve</h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {studentData.weaknesses?.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Map size={28} color="#f59e0b" />
            <h2 style={{ margin: 0 }}>Active Roadmap: {studentData.roadmap}</h2>
          </div>
          
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', marginLeft: '14px', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-39px', top: '0', background: '#10b981', width: '16px', height: '16px', borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: '#10b981' }}>Phase 1: Fundamentals (Completed)</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Basic syntax, operators, and loops.</p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-39px', top: '0', background: 'var(--primary)', width: '16px', height: '16px', borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>Phase 2: Core Concepts (In Progress)</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Functions, Arrays, and Object manipulation.</p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-39px', top: '0', background: 'rgba(255,255,255,0.2)', width: '16px', height: '16px', borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-muted)' }}>Phase 3: Advanced Topics (Locked)</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Real-world projects and system design.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <MessageSquareText size={28} color="#ec4899" />
            <h2 style={{ margin: 0 }}>Mentor Feedback</h2>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.6', margin: 0 }}>"{studentData.feedback}"</p>
            <p style={{ margin: '1rem 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>- Mentor Review on Last Assessment</p>
          </div>
        </div>
      )}

      {/* Floating AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}
