import { useState } from 'react';
import styles from './NewBoardModal.module.css';

import plusIcon from '../../assets/svg/plus.svg';

import projectIcon from '../../assets/create-board-icons/Project.svg';
import starIcon from '../../assets/create-board-icons/star-04.svg';
import loadingIcon from '../../assets/create-board-icons/loading-03.svg';
import puzzleIcon from '../../assets/create-board-icons/puzzle-piece-02.svg';
import containerIcon from '../../assets/create-board-icons/container.svg';
import lightningIcon from '../../assets/create-board-icons/lightning-02.svg';
import colorsIcon from '../../assets/create-board-icons/colors.svg';
import hexagonIcon from '../../assets/create-board-icons/hexagon-01.svg';

import blockBg from '../../assets/mobil-back-icon-photos-createBoard/block.png';
import thumb1 from '../../assets/mobil-back-icon-photos-createBoard/Vector.png';
import thumb2 from '../../assets/mobil-back-icon-photos-createBoard/Vector-1.png';
import thumb3 from '../../assets/mobil-back-icon-photos-createBoard/Vector-2.png';
import thumb4 from '../../assets/mobil-back-icon-photos-createBoard/Vector-3.png';
import thumb5 from '../../assets/mobil-back-icon-photos-createBoard/Vector-4.png';
import thumb6 from '../../assets/mobil-back-icon-photos-createBoard/Vector-5.png';
import thumb7 from '../../assets/mobil-back-icon-photos-createBoard/Vector-6.png';
import thumb8 from '../../assets/mobil-back-icon-photos-createBoard/Vector-7.png';
import thumb9 from '../../assets/mobil-back-icon-photos-createBoard/Vector-8.png';
import thumb10 from '../../assets/mobil-back-icon-photos-createBoard/Vector-9.png';
import thumb11 from '../../assets/mobil-back-icon-photos-createBoard/Vector-10.png';
import thumb12 from '../../assets/mobil-back-icon-photos-createBoard/Vector-11.png';
import thumb13 from '../../assets/mobil-back-icon-photos-createBoard/Vector-12.png';
import thumb14 from '../../assets/mobil-back-icon-photos-createBoard/Vector-13.png';
import thumb15 from '../../assets/mobil-back-icon-photos-createBoard/Vector-14.png';

import big1 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 26.png';
import big2 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 27.png';
import big3 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 28.png';
import big4 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 29.png';
import big5 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 30.png';
import big6 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 31.png';
import big7 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 32.png';
import big8 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 33.png';
import big9 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 34.png';
import big10 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 35.png';
import big11 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 36.png';
import big12 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 37.png';
import big13 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 38.png';
import big14 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 39.png';
import big15 from '../../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 40.png';

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

const backgrounds = [
  { thumb: blockBg, large: null },
  { thumb: thumb1, large: big1 },
  { thumb: thumb2, large: big2 },
  { thumb: thumb3, large: big3 },
  { thumb: thumb4, large: big4 },
  { thumb: thumb5, large: big5 },
  { thumb: thumb6, large: big6 },
  { thumb: thumb7, large: big7 },
  { thumb: thumb8, large: big8 },
  { thumb: thumb9, large: big9 },
  { thumb: thumb10, large: big10 },
  { thumb: thumb11, large: big11 },
  { thumb: thumb12, large: big12 },
  { thumb: thumb13, large: big13 },
  { thumb: thumb14, large: big14 },
  { thumb: thumb15, large: big15 },
];

export default function NewBoardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedBgIndex, setSelectedBgIndex] = useState(0);

  const handleCreate = () => {
  onCreate({
    title: title.trim() || 'Untitled board',
    icon: boardIcons[selectedIconIndex],
    background: backgrounds[selectedBgIndex].large,
    selectedIconIndex,
    selectedBgIndex,
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
          {backgrounds.map((bg, index) => (
            <button
              type="button"
              className={`${styles.bgOption} ${
                selectedBgIndex === index ? styles.selectedBg : ''
              }`}
              key={bg.thumb}
              onClick={() => setSelectedBgIndex(index)}
            >
              <img src={bg.thumb} alt="" />
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