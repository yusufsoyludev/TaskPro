import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RegisterPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';
import { register } from '../../features/auth/authOperations';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../features/auth/authSelectors';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
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

    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.tabs}>
          <span className={styles.activeTab}>Registration</span>

          <Link to="/login" className={styles.inactiveTab}>
            Log In
          </Link>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}
            >
              <img src={eyeIcon} alt="toggle password" />
            </button>
          </div>

          {error && <p>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>
      </section>
    </main>
  );
}
