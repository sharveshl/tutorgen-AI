// src/components/DrillDownViewer.jsx
import React, { useState } from 'react';
import { ChevronRight, Folder, User, Users } from 'lucide-react';
import { mockCollegeData } from '../data/mockData';

export default function DrillDownViewer({ startLevel = "college", initialData = mockCollegeData }) {
  const [path, setPath] = useState([{ level: startLevel, name: startLevel === "college" ? "All Departments" : initialData.name, data: initialData }]);

  const currentLevelData = path[path.length - 1];

  const handleNavigate = (index) => {
    setPath(prev => prev.slice(0, index + 1));
  };

  const handleDrill = (level, name, data) => {
    setPath(prev => [...prev, { level, name, data }]);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {path.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <button 
              onClick={() => handleNavigate(idx)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: idx === path.length - 1 ? 'var(--primary)' : 'var(--text-muted)',
                cursor: idx === path.length - 1 ? 'default' : 'pointer',
                fontSize: '1rem',
                fontWeight: idx === path.length - 1 ? 'bold' : 'normal',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
              className={idx !== path.length - 1 ? "hover-bg-glass" : ""}
            >
              {crumb.name}
            </button>
            {idx < path.length - 1 && <ChevronRight size={16} color="var(--text-muted)" />}
          </React.Fragment>
        ))}
      </div>

      {/* Render children based on level */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        
        {currentLevelData.level === "college" && currentLevelData.data.departments?.map(dept => (
          <div key={dept.id} className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s', borderLeft: '4px solid var(--primary)' }} onClick={() => handleDrill("department", dept.name, dept)} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Folder color="#818cf8" />
              <h3 style={{ margin: 0 }}>{dept.name}</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>View Years & Mentors ➔</p>
          </div>
        ))}

        {currentLevelData.level === "department" && currentLevelData.data.years?.map(year => (
          <div key={year.id} className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', borderLeft: '4px solid #34d399' }} onClick={() => handleDrill("year", year.name, year)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Users color="#34d399" />
              <h3 style={{ margin: 0 }}>{year.name} Students</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{year.mentors?.length || 0} Mentors ➔</p>
          </div>
        ))}

        {currentLevelData.level === "year" && currentLevelData.data.mentors?.map(mentor => (
          <div key={mentor.id} className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', borderLeft: '4px solid #fbbf24' }} onClick={() => handleDrill("mentor", mentor.name, mentor)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <User color="#fbbf24" />
              <h3 style={{ margin: 0 }}>{mentor.name}</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{mentor.students?.length || 0} Students Assigned ➔</p>
          </div>
        ))}

        {currentLevelData.level === "mentor" && currentLevelData.data.students?.map(student => (
          <div key={student.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f43f5e' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{student.name}</h3>
            <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Avg Score: <strong style={{color: 'white'}}>{student.score}</strong></p>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Performance: <strong style={{color: 'white'}}>{student.performance}</strong></p>
          </div>
        ))}
        
        {currentLevelData.level === "mentor" && (!currentLevelData.data.students || currentLevelData.data.students.length === 0) && (
          <p style={{ color: 'var(--text-muted)' }}>No students currently assigned to this mentor.</p>
        )}
      </div>
    </div>
  );
}
