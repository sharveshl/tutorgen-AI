import React, { useState, useEffect } from 'react';
import { Users, PlusCircle, Mail, User, CheckCircle2, LayoutTemplate } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MentorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (activeTab === 'students') {
      axios.get('/users/hierarchy').then(res => setStudents(res.data.children)).catch(console.error);
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    try {
      await axios.post('/users/create', {
        name: form.fullName.value,
        email: form.email.value,
        role: 'student'
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      form.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create Student account');
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Users size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Mentor Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge" style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>Mentor ({user?.year} Year)</span>
          <button onClick={() => { logout(); navigate('/'); }} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <button className={`glass-button ${activeTab === 'students' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'students' ? 'var(--primary)' : 'transparent', color: activeTab === 'students' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('students')}>My Students Overview</button>
        <button className={`glass-button ${activeTab === 'create' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'create' ? 'var(--primary)' : 'transparent', color: activeTab === 'create' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('create')}>Create Account</button>
      </div>

      {activeTab === 'students' && (
        <div className="delay-100">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <LayoutTemplate color="#818cf8" />
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Class Roster & Stats</h2>
          </div>
          
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>Student Name</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>Score</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>Performance</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>Current Roadmap</th>
                  <th style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold' }}>
                      {student.name}
                      <br />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{student.email}</span>
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <span style={{ 
                        background: student.score > 80 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(251, 191, 36, 0.2)', 
                        color: student.score > 80 ? '#34d399' : '#fbbf24',
                        padding: '4px 8px', borderRadius: '4px'
                      }}>{student.score}</span>
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>{student.performance}</td>
                    <td style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>{student.roadmap}</td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <button className="glass-button" style={{ padding: '6px 12px', width: 'auto', fontSize: '0.75rem' }}>View Details</button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No students enrolled yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <PlusCircle size={24} color="#818cf8" />
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create Student Account</h2>
          </div>
          {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--error)', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#4ade80' }}><CheckCircle2 size={20} /><span>Student account created (Password: Kit@123)</span></div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Student Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input name="fullName" type="text" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="Alex Johnson" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Student Email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input name="email" type="email" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="student@college.edu" required />
              </div>
            </div>
            <button type="submit" className="glass-button" style={{ marginTop: '1rem' }}>Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
}
