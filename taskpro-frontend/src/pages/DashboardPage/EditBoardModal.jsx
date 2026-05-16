import { useState } from 'react';
import styles from './EditBoardModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';

import projectIcon from '../../assets/create-board-icons/Project.svg';
import starIcon from '../../assets/create-board-icons/star-04.svg';
import loadingIcon from '../../assets/create-board-icons/loading-03.svg';
import puzzleIcon from '../../assets/create-board-icons/puzzle-piece-02.svg';
import containerIcon from '../../assets/create-board-icons/container.svg';
import lightningIcon from '../../assets/create-board-icons/lightning-02.svg';
import colorsIcon from '../../assets/create-board-icons/colors.svg';
import hexagonIcon from '../../assets/create-board-icons/hexagon-01.svg';

import { BACKGROUNDS } from '../../constants/backgroundConfig';

const boardIcons = [
  projectIcon,
  starIcon,
  loadingIcon,
  puzzleIcon,
  containerIcon,
  lightningIcon,
  colorsIcon,
  hexagonIcon,
];

export default function EditBoardModal({ board, onClose, onEdit }) {
  const [title, setTitle] = useState(board.title);
  const [selectedIconIndex, setSelectedIconIndex] = useState(
    board.selectedIconIndex ?? 0,
  );
  // Support both new bgId and legacy selectedBgIndex
  const initialBgId =
    board.bgId ??
    (board.selectedBgIndex != null ? `bg-${board.selectedBgIndex}` : 'bg-0');
  const [selectedBgId, setSelectedBgId] = useState(initialBgId);

  const handleEdit = () => {
    const bg = BACKGROUNDS.find(b => b.id === selectedBgId) ?? BACKGROUNDS[0];
    onEdit({
      title: title.trim() || 'Untitled board',
      icon: boardIcons[selectedIconIndex],
      background: bg.mobile,
      bgId: bg.id,
      selectedIconIndex,
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Edit board</h2>

        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <p className={styles.label}>Icons</p>

        <div className={styles.iconList}>
          {boardIcons.map((icon, index) => (
            <button
              type="button"
              className={`${styles.iconOption} ${
                selectedIconIndex === index ? styles.selectedIcon : ''
              }`}
              key={icon}
              onClick={() => setSelectedIconIndex(index)}
            >
              <img src={icon} alt="" />
            </button>
          ))}
        </div>

        <p className={styles.label}>Background</p>

        <div className={styles.bgList}>
          {BACKGROUNDS.map(bg => (
            <button
              type="button"
              className={`${styles.bgOption} ${
                selectedBgId === bg.id ? styles.selectedBg : ''
              }`}
              key={bg.id}
              onClick={() => setSelectedBgId(bg.id)}
            >
              <img src={bg.preview} alt="" />
            </button>
          ))}
        </div>

        <button type="button" className={styles.editBtn} onClick={handleEdit}>
          <span className={styles.editIcon}>
            <img src={plusIcon} alt="" />
          </span>
          Edit
        </button>
      </div>
    </div>
  );
}