import { useState } from 'react';
import styles from './EditColumnModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';

export default function EditColumnModal({ column, onClose, onEdit }) {
  const [title, setTitle] = useState(column.title);

  const handleSubmit = event => {
    event.preventDefault();

    if (!title.trim()) return;

    onEdit(title.trim());
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Edit column</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
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