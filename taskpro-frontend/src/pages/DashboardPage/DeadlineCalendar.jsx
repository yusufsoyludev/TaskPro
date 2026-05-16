import { useState } from 'react';
import styles from './DeadlineCalendar.module.css';

import arrowLeftIcon from '../../assets/svg/arrow-left.svg';
import arrowRightIcon from '../../assets/svg/arrow-right.svg';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Returns an array of day objects for the calendar grid (always 42 cells = 6 rows × 7 cols).
 * Each object: { date: Date, isCurrentMonth: boolean }
 */
function buildCalendarDays(year, month) {
  // First day of the displayed month (0 = Sunday … 6 = Saturday)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Shift so that Monday = 0
  const startOffset = (firstDayOfMonth + 6) % 7;

  const days = [];

  // Days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  // Days of current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  // Days from next month to fill the grid
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      date: new Date(year, month + 1, d),
      isCurrentMonth: false,
    });
  }

  return days;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * DeadlineCalendar
 * @param {Date|null}  selectedDate  — currently selected date
 * @param {Function}   onChange      — called with a Date when user picks a day
 */
export default function DeadlineCalendar({ selectedDate, onChange }) {
  const today = new Date();

  const [viewYear, setViewYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth(),
  );

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const days = buildCalendarDays(viewYear, viewMonth);

  return (
    <div className={styles.calendar}>
      {/* ── Header: prev / month+year / next ── */}
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <img src={arrowLeftIcon} alt="" />
        </button>

        <span className={styles.monthYear}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          className={styles.navBtn}
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <img src={arrowRightIcon} alt="" />
        </button>
      </div>

      {/* ── Weekday labels ── */}
      <div className={styles.weekdays}>
        {WEEKDAYS.map(day => (
          <span key={day} className={styles.weekday}>
            {day}
          </span>
        ))}
      </div>

      {/* ── Day grid ── */}
      <div className={styles.grid}>
        {days.map(({ date, isCurrentMonth }) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={[
                styles.day,
                !isCurrentMonth ? styles.dayFaded : '',
                isSelected ? styles.daySelected : '',
                isToday && !isSelected ? styles.dayToday : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange(date)}
              aria-label={date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              aria-pressed={isSelected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
