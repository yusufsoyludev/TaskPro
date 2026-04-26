import styles from './HelpModal.module.css';

export default function HelpModal({ onClose }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Need help</h2>

        <form className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email address"
          />

          <textarea
            className={styles.textarea}
            placeholder="Comment"
          ></textarea>

          <button type="submit" className={styles.sendBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}