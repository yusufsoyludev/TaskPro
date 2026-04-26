import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.tabs}>
          <Link to="/register" className={styles.inactiveTab}>
            Registration
          </Link>
          <span className={styles.activeTab}>Log In</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="email" placeholder="Enter your email" />

          <div className={styles.passwordWrap}>
            <input
              className={`${styles.input} ${styles.passwordInput}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm a password"
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}
            >
              <img src={eyeIcon} alt="" />
            </button>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In Now
          </button>
        </form>
      </section>
    </main>
  );
}