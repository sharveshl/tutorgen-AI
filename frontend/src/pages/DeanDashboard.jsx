import React, { useState } from 'react';
import { BookOpen, PlusCircle, Network, Mail, User, CheckCircle2, BarChart3, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import DrillDownViewer from '../components/DrillDownViewer';
import { mockCollegeData } from '../data/mockData';

export default function DeanDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'drilldown' | 'create'

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    e.target.reset();
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BookOpen size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Dean Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge">Dean (College)</span>
          <button onClick={() => { logout(); navigate('/'); }} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <button className={`glass-button ${activeTab === 'stats' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'stats' ? 'var(--primary)' : 'transparent', color: activeTab === 'stats' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('stats')}>Overall Stats</button>
        <button className={`glass-button ${activeTab === 'drilldown' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'drilldown' ? 'var(--primary)' : 'transparent', color: activeTab === 'drilldown' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('drilldown')}>Hierarchy Explorer</button>
        <button className={`glass-button ${activeTab === 'create' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'create' ? 'var(--primary)' : 'transparent', color: activeTab === 'create' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('create')}>Create Account</button>
      </div>

      {activeTab === 'stats' && (
        <div className="delay-100">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>College Performance Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard title="Total Enrolled Students" value={mockCollegeData.overallCollegeStats.totalStudents} icon={<User size={24} />} color="#818cf8" />
            <StatCard title="Average Performance" value={mockCollegeData.overallCollegeStats.averagePerformanceLevel} progress={parseInt(mockCollegeData.overallCollegeStats.averagePerformanceLevel)} icon={<BarChart3 size={24} />} color="#34d399" />
            <StatCard title="Assessments Completed" value={mockCollegeData.overallCollegeStats.totalAssessmentsCompleted} icon={<Database size={24} />} color="#fbbf24" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#4ade80' }}>Top College Strengths</h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {mockCollegeData.overallCollegeStats.topStrengths.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#f87171' }}>Areas Needing Improvement</h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {mockCollegeData.overallCollegeStats.areasToImprove.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'drilldown' && (
        <div className="delay-100">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Hierarchy Explorer</h2>
          <DrillDownViewer startLevel="college" initialData={mockCollegeData} />
        </div>
      )}

      {activeTab === 'create' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          {/* Account Creation Form (unmodified) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <PlusCircle size={24} color="#818cf8" />
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create HOD Account</h2>
          </div>
          {success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#4ade80' }}>
              <CheckCircle2 size={20} /><span>HOD account created successfully!</span>
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input type="text" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="Prof. Jane Smith" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input type="email" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="hod@department.edu" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Assigned Department</label>
              <div style={{ position: 'relative' }}>
                <Network style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input type="text" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="Computer Science" required />
              </div>
            </div>
            <button type="submit" className="glass-button" style={{ marginTop: '1rem' }}>Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
}
