import React, { useEffect } from 'react';
import styles from '@/styles/BeginnerLevelPage.module.css';

const Tick = ({ onTickDisappear }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onTickDisappear === 'function') {
        onTickDisappear();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onTickDisappear]);

  return <div className={styles.tick}>✓</div>;
};

export default Tick;
