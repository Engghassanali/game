import React, { useEffect } from 'react';
import styles from '@/styles/BeginnerLevelPage.module.css';

const Cross = ({ onCrossDisappear }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onCrossDisappear === 'function') {
        onCrossDisappear();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onCrossDisappear]);

  return <div className={styles.cross}>✕</div>;
};

export default Cross;
