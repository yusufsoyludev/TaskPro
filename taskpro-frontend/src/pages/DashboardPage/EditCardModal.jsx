import { useState } from 'react';
import styles from './EditCardModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';
import themeIcon from '../../assets/svg/theme-svg.svg';

import DeadlineCalendar from './DeadlineCalendar';
import { PRIORITY_MAP, PRIORITY_ORDER } from './priorityConfig';

function formatDeadline(date) {
  if (!date) return 'Pick a date';

  const today = new Date();
  const isToday =
    date.getDate()     === today.getDate()     &&
    date.getMonth()    === today.getMonth()    &&
    date.getFullYear() === today.getFullYear();

  const formatted = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return isToday ? `Today, ${formatted}` : formatted;
}

export default function EditCardModal({ card, onClose, onSave }) {
  const [title,          setTitle         ] = useState(card.title ?? '');
  const [description,    setDescription   ] = useState(card.description ?? '');
  const [labelColor,     setLabelColor    ] = useState(card.labelColor ?? 'purple');
  const [deadline,       setDeadline      ] = useState(
    card.deadline ? new Date(card.deadline) : new Date(),
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    onSave({
      ...card,
      title:       title.trim(),
      description: description.trim(),
      labelColor,
      deadline:    deadline ? deadline.toISOString() : null,
    });
  };

  const handleDateSelect = date => {
    setDeadline(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className={styles.title}>Edit card</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <p className={styles.sectionLabel}>Label color</p>

          <div className={styles.colorList}>
            {PRIORITY_ORDER.map(id => {
              const priority = PRIORITY_MAP[id];
              return (
                <button
                  key={id}
                  type="button"
                  className={`${styles.colorOption} ${
                    labelColor === id ? styles.selectedColor : ''
                  }`}
                  onClick={() => setLabelColor(id)}
                  aria-label={`Select ${priority.label} priority`}
                >
                  <img src={priority.icon} alt={priority.label} />
                </button>
              );
            })}
          </div>

          <p className={styles.sectionLabel}>Deadline</p>

          <div className={styles.deadlineWrapper}>
            <button
              type="button"
              className={styles.deadlineBtn}
              onClick={() => setIsCalendarOpen(prev => !prev)}
              aria-haspopup="dialog"
              aria-expanded={isCalendarOpen}
            >
              <span>{formatDeadline(deadline)}</span>
              <img
                src={themeIcon}
                alt=""
                className={`${styles.chevron} ${isCalendarOpen ? styles.chevronOpen : ''}`}
              />
            </button>

            {isCalendarOpen && (
              <div className={styles.calendarPanel} role="dialog" aria-label="Pick deadline date">
                <DeadlineCalendar
                  selectedDate={deadline}
                  onChange={handleDateSelect}
                />
              </div>
            )}
          </div>

          <button type="submit" className={styles.editBtn}>
            <span className={styles.editIcon}>
              <img src={plusIcon} alt="" />
            </span>
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
