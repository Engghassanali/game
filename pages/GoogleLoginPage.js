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


import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '@/styles/LoginPage.module.css';

const GoogleLoginPage = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="Goog.webp" alt="Google Logo" />
      </div>
      <h1 className={styles.title}>Login with Google</h1>

      {session ? (
        <div>
          <h2>Signed in as {session.user.email}</h2>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <button className={styles.googleButton} onClick={() => signIn('google')}>
          <img className={styles.googleIcon} src="google.png" alt="Google Icon" />
          Login with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLoginPage;
