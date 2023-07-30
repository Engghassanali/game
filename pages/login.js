// import styles from '@/styles/LoginPage.module.css';
// import { signIn } from 'next-auth/react';

// const GoogleLoginPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.logoContainer}>
//         <img className={styles.logo} src="/google-logo.png" alt="Google Logo" />
//       </div>
//       <h1 className={styles.title}>Login with Google</h1>
//       <button className={styles.googleButton} onClick={() => signIn('google')}>
//         <img className={styles.googleIcon} src="/google-logo.png" alt="Google Icon" />
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default GoogleLoginPage;
// pages/login.js
import { SessionProvider, useSession } from 'next-auth/react';
import GoogleLoginPage from './GoogleLoginPage';

const LoginPage = () => {
  return (
    <SessionProvider>
      <LoginPageContent />
    </SessionProvider>
  );
};

const LoginPageContent = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Session is being fetched, show a loading state
    return <p>Loading...</p>;
  }

  if (session) {
    // User is already authenticated, redirect to another page
    
    return <p>Redirecting...</p>;
    // Replace `<p>Redirecting...</p>` with the desired component or redirect logic
  }

  return <GoogleLoginPage />;
};

export default LoginPage;
