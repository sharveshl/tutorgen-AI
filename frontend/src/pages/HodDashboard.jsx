import React, { useState, useEffect } from 'react';
import { Layers, PlusCircle, Calendar, Mail, User, CheckCircle2, BarChart3, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import axios from 'axios';

export default function HodDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stats');
  
  const [hierarchyData, setHierarchyData] = useState([]);

  useEffect(() => {
    if (activeTab === 'drilldown') {
      axios.get('/users/hierarchy').then(res => setHierarchyData(res.data.children)).catch(console.error);
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
        year: form.year.value,
        role: 'mentor'
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      form.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create Mentor account');
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Layers size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>HOD Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {user?.name} | {user?.dept?.toUpperCase()}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge">Head of Department</span>
          <button onClick={() => { logout(); navigate('/'); }} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <button className={`glass-button ${activeTab === 'stats' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'stats' ? 'var(--primary)' : 'transparent', color: activeTab === 'stats' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('stats')}>Department Stats</button>
        <button className={`glass-button ${activeTab === 'drilldown' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'drilldown' ? 'var(--primary)' : 'transparent', color: activeTab === 'drilldown' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('drilldown')}>Hierarchy Explorer</button>
        <button className={`glass-button ${activeTab === 'create' ? '' : 'hover-bg-glass'}`} style={{ width: 'auto', background: activeTab === 'create' ? 'var(--primary)' : 'transparent', color: activeTab === 'create' ? 'white' : 'var(--text-muted)', border: 'none' }} onClick={() => setActiveTab('create')}>Create Account</button>
      </div>

      {activeTab === 'stats' && (
        <div className="delay-100">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Department Performance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard title="Dept Students Enrolled" value={320} icon={<User size={24} />} color="#818cf8" />
            <StatCard title="Dept Average Score" value="78%" progress={78} icon={<BarChart3 size={24} />} color="#34d399" />
          </div>
        </div>
      )}

      {activeTab === 'drilldown' && (
        <div className="delay-100">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Mentor Roster</h2>
          {hierarchyData.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No Mentor accounts created yet.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {hierarchyData.map(mentor => (
                <div key={mentor._id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #34d399' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{mentor.name}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Assigned Year: <strong style={{color: 'white'}}>{mentor.year}</strong></p>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{mentor.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="glass-panel delay-100" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <PlusCircle size={24} color="#818cf8" />
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create Mentor Account</h2>
          </div>
          {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--error)', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#4ade80' }}><CheckCircle2 size={20} /><span>Mentor account created (Password: Kit@123)</span></div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input name="fullName" type="text" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="Mr. Mentor" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <input name="email" type="email" className="glass-input" style={{ paddingLeft: '40px' }} placeholder="mentor@department.edu" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Studying Year Assignment</label>
              <div style={{ position: 'relative' }}>
                <Calendar style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} size={20} />
                <select name="year" className="glass-input" style={{ paddingLeft: '40px', appearance: 'none' }} required defaultValue="">
                  <option value="" disabled style={{ color: '#000' }}>Select Year</option>
                  <option value="1st" style={{ color: '#000' }}>1st Year</option>
                  <option value="2nd" style={{ color: '#000' }}>2nd Year</option>
                  <option value="3rd" style={{ color: '#000' }}>3rd Year</option>
                  <option value="4th" style={{ color: '#000' }}>Final Year</option>
                </select>
              </div>
            </div>
            <button type="submit" className="glass-button" style={{ marginTop: '1rem' }}>Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
}
