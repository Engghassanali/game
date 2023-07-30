import React from 'react';
import { signIn } from 'next-auth/react';
import styles from '@/styles/SignupPage.module.css';
// import googleLogo from '@/images/google-logo.png';

const SignupPage = () => {
  const handleSignupWithGoogle = () => {
    signIn('google'); // Trigger Google sign-up
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        {/* <img className={styles.logo} src={googleLogo} alt="Google Logo" /> */}
        <img className={styles.logo} alt="Google Logo" />
      </div>
      <h1 className={styles.title}>Sign up with Google</h1>
      <button className={styles.googleButton} onClick={handleSignupWithGoogle}>
        <img className={styles.googleIcon} alt="Google Icon" />
        {/* <img className={styles.googleIcon} src={googleLogo} alt="Google Icon" /> */}
        Sign up with Google
      </button>
    </div>
  );
};

export default SignupPage;
