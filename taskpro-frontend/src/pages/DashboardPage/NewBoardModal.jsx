import { useEffect, useState } from 'react';
import styles from './NewBoardModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';

import projectIcon from '../../assets/svg/Project.svg';
import starIcon from '../../assets/svg/star-04.svg';
import loadingIcon from '../../assets/svg/loading-03.svg';
import puzzleIcon from '../../assets/svg/puzzle-piece-02.svg';
import containerIcon from '../../assets/svg/container.svg';
import lightningIcon from '../../assets/svg/lightning-02.svg';
import colorsIcon from '../../assets/svg/colors.svg';
import hexagonIcon from '../../assets/svg/hexagon-01.svg';

import {
  BACKGROUNDS,
  loadBackgroundPreviews,
} from '../../constants/backgroundConfig';

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

export default function NewBoardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedBgId, setSelectedBgId] = useState('bg-0');
  const [backgroundPreviews, setBackgroundPreviews] = useState({});

  useEffect(() => {
    let isCurrent = true;

    loadBackgroundPreviews().then(backgrounds => {
      if (!isCurrent) return;

      setBackgroundPreviews(
        Object.fromEntries(
          backgrounds.map(background => [background.id, background.preview]),
        ),
      );
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleCreate = () => {
    onCreate({
      title: title.trim() || 'Untitled board',
      icon: boardIcons[selectedIconIndex],
      bgId: selectedBgId,
      selectedIconIndex,
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>New board</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Title"
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
              {backgroundPreviews[bg.id] && (
                <img
                  src={backgroundPreviews[bg.id]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              )}
            </button>
          ))}
        </div>

        <button type="button" className={styles.createBtn} onClick={handleCreate}>
          <span className={styles.createIcon}>
            <img src={plusIcon} alt="" />
          </span>
          Create
        </button>
      </div>
    </div>
  );
}
