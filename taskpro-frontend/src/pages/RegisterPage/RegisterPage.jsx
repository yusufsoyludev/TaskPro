import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.tabs}>
          <span className={styles.activeTab}>Registration</span>
          <Link to="/login" className={styles.inactiveTab}>
            Log In
          </Link>
        </div>

        <form className={styles.form}>
          <input className={styles.input} type="text" placeholder="Enter your name" />

          <input className={styles.input} type="email" placeholder="Enter your email" />

          <div className={styles.passwordWrap}>
            <input
              className={`${styles.input} ${styles.passwordInput}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}
            >
              <img src={eyeIcon} alt="toggle password" />
            </button>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Register Now
          </button>
        </form>
      </section>
    </main>
  );
}