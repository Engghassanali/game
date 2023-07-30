import styles from '@/styles/BeginnerLevelPage.module.css';

const medium = () => (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title_e_m_H}>Medium Level</h1>
        <p className={styles.description}>
          Welcome to the Medium Level of the Game! Get ready to test your memory skills.
        </p>
        <button className={styles.startButton}><a  href="/mediumGamePage">Start Game</a></button>
      </div>
    </div>
  );

export default medium;
