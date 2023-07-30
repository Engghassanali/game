import styles from '@/styles/BeginnerLevelPage.module.css';

const hard = () => (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title_e_m_H}>Hard Level</h1>
        <p className={styles.description}>
          Welcome to the Hard Level of the Game! Get ready to test your memory skills.
        </p>
        <button className={styles.startButton}><a  href="/hardGamePage">Start Game</a></button>      </div>
    </div>
  );

export default hard;
