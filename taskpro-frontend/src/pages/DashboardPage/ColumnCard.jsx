import { memo, useCallback, useMemo, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './ColumnCard.module.css';

import plusIcon from '../../assets/svg/plus.svg';
import pencilIcon from '../../assets/svg/pencil-01.svg';
import trashIcon from '../../assets/svg/trash-04.svg';

import Card from './Card';

function ColumnCard({
  column,
  filterPriority,
  onEdit,
  onDelete,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onMoveCard,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id,
    },
  });

  const displayCards = useMemo(
    () =>
      filterPriority
        ? (column.cards ?? []).filter(card => card.labelColor === filterPriority)
        : (column.cards ?? []),
    [column.cards, filterPriority],
  );

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleEdit = useCallback(
    event => {
      event.stopPropagation();
      onEdit(column);
    },
    [column, onEdit],
  );

  const handleDelete = useCallback(
    event => {
      event.stopPropagation();
      onDelete(column.id);
    },
    [column.id, onDelete],
  );

  const handleCardListClick = useCallback(event => {
    event.stopPropagation();
  }, []);

  const handleAddCard = useCallback(
    event => {
      event.stopPropagation();
      onAddCard(column.id, event);
    },
    [column.id, onAddCard],
  );

  const handleEditCard = useCallback(
    card => {
      onEditCard(column.id, card);
    },
    [column.id, onEditCard],
  );

  return (
    <div ref={setNodeRef} className={styles.columnGroup}>
      <section
        className={styles.columnCard}
        onClick={handleToggleCollapse}
      >
        <div className={styles.columnHeader}>
          <h2 className={styles.columnTitle}>{column.title}</h2>

          <div className={styles.columnActions}>
            <button
              type="button"
              aria-label="Edit column"
              onClick={handleEdit}
            >
              <img src={pencilIcon} alt="" />
            </button>

            <button
              type="button"
              aria-label="Delete column"
              onClick={handleDelete}
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
                onClick={handleCardListClick}
              >
                {displayCards.map(card => (
                  <Card
                    key={card.id}
                    card={card}
                    columnId={column.id}
                    onEdit={handleEditCard}
                    onDelete={onDeleteCard}
                    onMove={onMoveCard}
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
            onClick={handleAddCard}
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

function areEqual(prevProps, nextProps) {
  return (
    prevProps.column.id === nextProps.column.id &&
    prevProps.column.title === nextProps.column.title &&
    prevProps.column.cards === nextProps.column.cards &&
    prevProps.filterPriority === nextProps.filterPriority &&
    prevProps.onEdit === nextProps.onEdit &&
    prevProps.onDelete === nextProps.onDelete &&
    prevProps.onAddCard === nextProps.onAddCard &&
    prevProps.onDeleteCard === nextProps.onDeleteCard &&
    prevProps.onEditCard === nextProps.onEditCard &&
    prevProps.onMoveCard === nextProps.onMoveCard
  );
}

export default memo(ColumnCard, areEqual);
