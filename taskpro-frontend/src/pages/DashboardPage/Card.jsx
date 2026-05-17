import { useDraggable } from '@dnd-kit/core';
import styles from './Card.module.css';
import { PRIORITY_MAP } from './priorityConfig';

import moveIcon from '../../assets/svg-navigate/logout-grey.svg';
import pencilIcon from '../../assets/svg-navigate/pencil-01.svg';
import trashIcon from '../../assets/svg-navigate/trash-04.svg';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16,
      )}`
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

export default function Card({
  card,
  columnId,
  onEdit,
  onDelete,
  onMove,
  isOverlay = false,
}) {
  const { attributes, listeners, setNodeRef, isDragging } =
    useDraggable({
      id: card.id,
      disabled: isOverlay,
      data: {
        type: 'card',
        card,
        columnId: columnId ?? card.columnId ?? null,
      },
    });

  const stopDragActivation = event => {
    event.stopPropagation();
  };

  const priority = PRIORITY_MAP[card.labelColor] ?? PRIORITY_MAP.grey;
  const rgb = hexToRgb(priority.color);

  const dragStyle = {
    ...(!isOverlay && isDragging ? { opacity: 0 } : {}),
    ...(!isOverlay ? { touchAction: 'manipulation' } : {}),
  };

  return (
    <article
      ref={isOverlay ? undefined : setNodeRef}
      style={dragStyle}
      className={styles.card}
      {...(!isOverlay ? attributes : {})}
      {...(!isOverlay ? listeners : {})}
    >
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

          {!isOverlay && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Move card"
                onMouseDown={stopDragActivation}
                onPointerDown={stopDragActivation}
                onTouchStart={stopDragActivation}
                onClick={event => {
                  event.stopPropagation();
                  onMove?.(card.id);
                }}
              >
                <img src={moveIcon} alt="" />
              </button>

              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Edit card"
                onMouseDown={stopDragActivation}
                onPointerDown={stopDragActivation}
                onTouchStart={stopDragActivation}
                onClick={event => {
                  event.stopPropagation();
                  onEdit?.(card);
                }}
              >
                <img src={pencilIcon} alt="" />
              </button>

              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Delete card"
                onMouseDown={stopDragActivation}
                onPointerDown={stopDragActivation}
                onTouchStart={stopDragActivation}
                onClick={event => {
                  event.stopPropagation();
                  onDelete?.(card.id);
                }}
              >
                <img src={trashIcon} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={styles.completedOverlay}
        style={{ '--priority-rgb': rgb }}
        aria-hidden="true"
      />
    </article>
  );
}
