import styles from './FilterModal.module.css';
import { PRIORITY_MAP,  } from './priorityConfig';

const FILTER_ITEMS = [
  { id: 'grey',   label: 'Without priority' },
  { id: 'green',  label: 'Low'              },
  { id: 'pink',   label: 'Medium'           },
  { id: 'purple', label: 'High'             },
];

export default function FilterModal({ active, onSelect, onShowAll, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={event => event.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <hr className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Label color</span>
            <button
              type="button"
              className={styles.showAllBtn}
              onClick={onShowAll}
            >
              Show all
            </button>
          </div>

          <ul className={styles.list}>
            {FILTER_ITEMS.map(({ id, label }) => {
              const priority = PRIORITY_MAP[id];
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                    onClick={() => onSelect(id)}
                    aria-pressed={isActive}
                  >
                    <span
                      className={styles.colorRing}
                      style={{
                        borderColor: isActive ? priority.color : 'transparent',
                      }}
                    >
                      <img src={priority.icon} alt="" className={styles.colorIcon} />
                    </span>
                    <span className={styles.itemLabel}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
