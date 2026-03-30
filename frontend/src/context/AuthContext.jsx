import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id: 1, name: 'Admin', role: 'super_admin' }

  const login = async (email, password) => {
    // Mock login logic based on roles
    if (email.includes('super')) {
      setUser({ id: 1, name: 'Super Admin', role: 'super_admin' });
    } else if (email.includes('dean')) {
      setUser({ id: 2, name: 'Dean Smith', role: 'dean' });
    } else if (email.includes('hod')) {
      setUser({ id: 3, name: 'HOD Johnson', role: 'hod' });
    } else if (email.includes('mentor')) {
      setUser({ id: 4, name: 'Mentor Davis', role: 'mentor' });
    } else if (email.includes('student')) {
      setUser({ id: 5, name: 'Student Alex', role: 'student' });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
