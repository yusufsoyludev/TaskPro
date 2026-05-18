import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';
import { login } from '../../features/auth/authOperations';
import { selectAuthLoading } from '../../features/auth/authSelectors';
import {
  normalizeLoginFormData,
  validateLoginForm,
} from '../../features/auth/authFormValidation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const clientErrors = validateLoginForm(formData);

  const handleChange = event => {
    const { name, value } = event.target;

    setServerError(null);
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = event => {
    const { name } = event.target;

    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const getFieldError = fieldName => {
    if ((touched[fieldName] || false) && clientErrors[fieldName]) {
      return clientErrors[fieldName];
    }

    return serverError?.fields?.[fieldName] || '';
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = validateLoginForm(formData);

    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setServerError(null);
      return;
    }

    const result = await dispatch(login(normalizeLoginFormData(formData)));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
      return;
    }

    setServerError(
      result.payload || {
        message: 'Login failed. Please try again.',
        fields: {},
      },
    );
  };

  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');
  const generalError =
    serverError?.message && !Object.keys(serverError.fields || {}).length
      ? serverError.message
      : '';

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.tabs}>
          <Link to="/register" className={styles.inactiveTab}>
            Registration
          </Link>
          <span className={styles.activeTab}>Log In</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <input
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
          </div>

          <div className={styles.field}>
            <div className={styles.passwordWrap}>
              <input
                className={`${styles.input} ${styles.passwordInput} ${
                  passwordError ? styles.inputError : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                aria-invalid={Boolean(passwordError)}
              />

              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(prev => !prev)}
              >
                <img src={eyeIcon} alt="toggle password" />
              </button>
            </div>
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
          </div>

          {generalError && <p className={styles.generalError}>{generalError}</p>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In Now'}
          </button>
        </form>
      </section>
    </main>
  );
}
