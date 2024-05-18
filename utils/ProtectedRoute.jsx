import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext'; // Assurez-vous que le chemin est correct

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
console.log('User in ProtectedRoute:', user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return children;
}
