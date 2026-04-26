import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import heroImg from '../../assets/img+logo.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <img src={heroImg} alt="Task Pro" className={styles.hero} />

        <p className={styles.description}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don’t wait, start achieving your goals now!
        </p>

        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => navigate('/register')}
        >
          Registration
        </button>

        <button
          type="button"
          className={styles.linkBtn}
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </section>
    </main>
  );
}