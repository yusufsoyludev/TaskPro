import styles from './WelcomePage.module.css';
import heroImg from '../../assets/img+logo.png';

export default function WelcomePage() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <img src={heroImg} alt="Task Pro" className={styles.hero} />

        <p className={styles.description}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don’t wait, start achieving your goals now!
        </p>

        <button type="button" className={styles.primaryBtn}>
          Registration
        </button>

        <button type="button" className={styles.linkBtn}>
          Log In
        </button>
      </section>
    </main>
  );
}