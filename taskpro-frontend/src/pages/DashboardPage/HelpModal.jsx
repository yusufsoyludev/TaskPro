import { useState } from 'react';
import styles from './HelpModal.module.css';

export default function HelpModal({ onClose }) {
  // Add your Formspree endpoint in .env
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setErrorMessage('Support form is not configured yet.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send support request.');
      }

      setEmail('');
      setComment('');
      onClose();
    } catch {
      setErrorMessage('Failed to send support request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Need help</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <textarea
            className={styles.textarea}
            placeholder="Comment"
            value={comment}
            onChange={event => setComment(event.target.value)}
            required
          />

          {errorMessage && (
            <p className={styles.errorMessage} role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.sendBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
