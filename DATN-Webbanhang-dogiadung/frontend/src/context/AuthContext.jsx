import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Lắng nghe Firebase auth state thực tế
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Đọc thêm thông tin mở rộng đã lưu trong localStorage (phone, address, role...)
        const extra   = JSON.parse(localStorage.getItem(`profile_${firebaseUser.uid}`) || '{}');
        setUser({ 
          ...firebaseUser, 
          ...extra,
          role: extra.role || 'customer' // Mặc định là khách hàng
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login bằng Firebase
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Cập nhật profile (displayName, photoURL, phone, address...)
  const updateUserProfile = async ({ displayName, photoURL, phone, address, gender, birthDate }) => {
    if (!auth.currentUser) return;

    // Cập nhật Firebase displayName & photoURL
    await updateProfile(auth.currentUser, {
      displayName: displayName || auth.currentUser.displayName,
      photoURL: photoURL || auth.currentUser.photoURL,
    });

    // Lưu các trường mở rộng vào localStorage (phone, address, gender, birthDate, role)
    const extra = { phone, address, gender, birthDate };
    const existing = JSON.parse(localStorage.getItem(`profile_${auth.currentUser.uid}`) || '{}');
    const updated = { ...existing, ...extra };
    localStorage.setItem(`profile_${auth.currentUser.uid}`, JSON.stringify(updated));

    // Cập nhật state
    setUser(prev => ({
      ...prev,
      ...updated,
      displayName: displayName || prev.displayName,
      photoURL: photoURL || prev.photoURL,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
