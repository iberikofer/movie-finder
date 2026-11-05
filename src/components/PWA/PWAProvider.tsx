'use client';

import React, { useEffect } from 'react';

export const PWAProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('PWA Service Worker registered:', registration.scope);
          })
          .catch(error => {
            console.warn('PWA Service Worker registration error:', error);
          });
      });
    }
  }, []);

  return <>{children}</>;
};

export default PWAProvider;

