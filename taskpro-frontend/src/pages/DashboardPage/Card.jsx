import { useState } from 'react';
import styles from './Card.module.css';
import { PRIORITY_MAP } from './priorityConfig';

import moveIcon from '../../assets/svg-navigate/logout-grey.svg';
import pencilIcon from '../../assets/svg-navigate/pencil-01.svg';
import trashIcon from '../../assets/svg-navigate/trash-04.svg';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

function formatDeadline(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function Card({ card, onEdit, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const priority = PRIORITY_MAP[card.labelColor] ?? PRIORITY_MAP.grey;
  const rgb = hexToRgb(priority.color);

  return (
    <article className={styles.card}>
      <div
        className={styles.priorityStripe}
        style={{ backgroundColor: priority.color }}
      />

      <div className={styles.body}>
        <h3 className={styles.title}>{card.title}</h3>

        <p className={styles.description}>{card.description}</p>

        <hr className={styles.divider} />

        <div className={styles.footer}>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Priority</span>
              <div className={styles.metaValue}>
                <span
                  className={styles.priorityDot}
                  style={{ backgroundColor: priority.color }}
                />
                <span className={styles.metaText}>{priority.label}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Deadline</span>
              <span className={styles.metaText}>
                {formatDeadline(card.deadline)}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${isCompleted ? styles.actionBtnActive : ''}`}
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              onClick={() => setIsCompleted(prev => !prev)}
            >
              <img src={moveIcon} alt="" />
            </button>

            <button
              type="button"
              className={styles.actionBtn}
              aria-label="Edit card"
              onClick={() => onEdit && onEdit(card)}
            >
              <img src={pencilIcon} alt="" />
            </button>

            <button
              type="button"
              className={styles.actionBtn}
              aria-label="Delete card"
              onClick={() => onDelete && onDelete(card.id)}
            >
              <img src={trashIcon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.completedOverlay} ${isCompleted ? styles.completedOverlayVisible : ''}`}
        style={{ '--priority-rgb': rgb }}
        aria-hidden="true"
      >
        <span className={styles.completedBadge}>Completed</span>
      </div>
    </article>
  );
}
