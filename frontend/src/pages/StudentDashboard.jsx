import React from 'react';
import { GraduationCap, BookOpen, Clock, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GraduationCap size={32} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Student Portal</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="role-badge" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>Student</span>
          <button onClick={handleLogout} className="glass-button" style={{ padding: '8px 16px', width: 'auto' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel delay-100" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <BookOpen size={20} color="#818cf8" />
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>My Courses</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>You are currently enrolled in 5 courses for this semester.</p>
        </div>

        <div className="glass-panel delay-200" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Activity size={20} color="#34d399" />
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Recent Grades</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your latest results have been published by your mentor.</p>
        </div>

        <div className="glass-panel delay-300" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Clock size={20} color="#fbbf24" />
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Upcoming Schedule</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Next class: Advanced Web Development at 10:00 AM.</p>
        </div>
      </div>
    </div>
  );
}
