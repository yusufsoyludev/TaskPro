import { useState } from 'react';
import styles from './AddColumnModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';

export default function AddColumnModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim());
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Add column</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <button type="submit" className={styles.addBtn}>
            <span className={styles.addIcon}>
              <img src={plusIcon} alt="" />
            </span>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}