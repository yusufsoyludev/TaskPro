import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';
import { login } from '../../features/auth/authOperations';
import { selectAuthError, selectAuthLoading } from '../../features/auth/authSelectors';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
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
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className={styles.passwordWrap}>
            <input
              className={`${styles.input} ${styles.passwordInput}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Confirm a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}
            >
              <img src={eyeIcon} alt="" />
            </button>
          </div>

          {error && <p>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In Now'}
          </button>
        </form>
      </section>
    </main>
  );
}
