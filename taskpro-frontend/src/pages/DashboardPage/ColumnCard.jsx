import { useState } from 'react';
import styles from './ColumnCard.module.css';

import plusIcon from '../../assets/svg/plus.svg';
import pencilIcon from '../../assets/svg-navigate/pencil-01.svg';
import trashIcon from '../../assets/svg-navigate/trash-04.svg';

import Card from './Card';

export default function ColumnCard({
  column,
  filterPriority,
  onEdit,
  onDelete,
  onAddCard,
  onDeleteCard,
  onEditCard,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayCards = filterPriority
    ? (column.cards ?? []).filter(c => c.labelColor === filterPriority)
    : (column.cards ?? []);

  return (
    <div className={styles.columnGroup}>
      <section
        className={styles.columnCard}
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        <div className={styles.columnHeader}>
          <h2 className={styles.columnTitle}>{column.title}</h2>

          <div className={styles.columnActions}>
            <button
              type="button"
              aria-label="Edit column"
              onClick={event => {
                event.stopPropagation();
                onEdit();
              }}
            >
              <img src={pencilIcon} alt="" />
            </button>

            <button
              type="button"
              aria-label="Delete column"
              onClick={event => {
                event.stopPropagation();
                onDelete();
              }}
            >
              <img src={trashIcon} alt="" />
            </button>
          </div>
        </div>

        <div className={`${styles.collapsible} ${isCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.collapsibleInner}>
            {displayCards.length > 0 && (
              <div
                className={styles.cardList}
                onClick={event => event.stopPropagation()}
              >
                {displayCards.map(card => (
                  <Card
                    key={card.id}
                    card={card}
                    onEdit={card => onEditCard(card)}
                    onDelete={cardId => onDeleteCard(cardId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={`${styles.addCardWrapper} ${!isCollapsed ? styles.addCardWrapperOpen : ''}`}>
        <div className={styles.addCardWrapperInner}>
          <button
            type="button"
            className={styles.addCardBtn}
            onClick={event => {
              event.stopPropagation();
              onAddCard(event);
            }}
          >
            <span>
              <img src={plusIcon} alt="" />
            </span>
            Add another card
          </button>
        </div>
      </div>
    </div>
  );
}
