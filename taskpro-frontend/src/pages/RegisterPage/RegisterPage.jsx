import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RegisterPage.module.css';
import eyeIcon from '../../assets/svg/eye.svg';
import { register } from '../../features/auth/authOperations';
import { selectAuthLoading } from '../../features/auth/authSelectors';
import {
  normalizeRegisterFormData,
  validateRegisterForm,
} from '../../features/auth/authFormValidation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const clientErrors = validateRegisterForm(formData);

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
    const validationErrors = validateRegisterForm(formData);

    setTouched({
      name: true,
      email: true,
      password: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setServerError(null);
      return;
    }

    const result = await dispatch(register(normalizeRegisterFormData(formData)));

    if (register.fulfilled.match(result)) {
      navigate('/login', { replace: true });
      return;
    }

    setServerError(
      result.payload || {
        message: 'Registration failed. Please try again.',
        fields: {},
      },
    );
  };

  const nameError = getFieldError('name');
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
          <span className={styles.activeTab}>Registration</span>

          <Link to="/login" className={styles.inactiveTab}>
            Log In
          </Link>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <input
              className={`${styles.input} ${nameError ? styles.inputError : ''}`}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(nameError)}
            />
            {nameError && <p className={styles.errorText}>{nameError}</p>}
          </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
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
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>
      </section>
    </main>
  );
}
