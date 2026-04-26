import { useState } from 'react';
import styles from './DashboardPage.module.css';
import NewBoardModal from './NewBoardModal';
import EditBoardModal from './EditBoardModal';
import HelpModal from './HelpModal';

import iconLogo from '../../assets/svg/icon.svg';
import menuIcon from '../../assets/svg/menu.svg';
import filterIcon from '../../assets/svg/filter.svg';
import themeIcon from '../../assets/svg/theme-svg.svg';
import plusIcon from '../../assets/svg/plus.svg';
import logoutIcon from '../../assets/svg/logout.svg';

import helpIcon from '../../assets/svg-navigate/help-circle.svg';
import projectIcon from '../../assets/svg-navigate/Project.svg';
import puzzleIcon from '../../assets/svg-navigate/puzzle-piece-02.svg';
import pencilIcon from '../../assets/svg-navigate/pencil-01.svg';
import trashIcon from '../../assets/svg-navigate/trash-04.svg';

import cactusImg from '../../assets/2.png';
import userImg from '../../assets/user.png';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [createdBoard, setCreatedBoard] = useState(null);

  const openNewBoardModal = () => setIsNewBoardModalOpen(true);
  const closeNewBoardModal = () => setIsNewBoardModalOpen(false);

  const handleCreateBoard = boardData => {
    setCreatedBoard(boardData);
    setIsNewBoardModalOpen(false);
    setIsSidebarOpen(false);
  };

  const handleEditBoard = boardData => {
    setCreatedBoard(boardData);
    setIsEditBoardModalOpen(false);
    setIsSidebarOpen(false);
  };

  const handleDeleteBoard = () => {
    setCreatedBoard(null);
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.page}>
      {isSidebarOpen && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ''
        }`}
      >
        <div className={styles.logo}>
          <img src={iconLogo} alt="" />
          <span>Task Pro</span>
        </div>

        <div className={styles.boardsBlock}>
          <p className={styles.boardsTitle}>My boards</p>

          <div className={styles.createBoard}>
            <p>
              Create a <br />
              new board
            </p>

            <button
              type="button"
              className={styles.plusBtn}
              onClick={openNewBoardModal}
              aria-label="Create new board"
            >
              <img src={plusIcon} alt="" />
            </button>
          </div>

          <nav className={styles.boardList}>
            {createdBoard ? (
              <div className={`${styles.boardItem} ${styles.activeBoard}`}>
                <div className={styles.boardName}>
                  <img src={createdBoard.icon || projectIcon} alt="" />
                  <span>{createdBoard.title}</span>
                </div>

                <div className={styles.boardActions}>
                  <button
                    type="button"
                    aria-label="Edit board"
                    onClick={() => setIsEditBoardModalOpen(true)}
                  >
                    <img src={pencilIcon} alt="" />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete board"
                    onClick={handleDeleteBoard}
                  >
                    <img src={trashIcon} alt="" />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.boardItem}>
                <div className={styles.boardName}>
                  <img src={puzzleIcon} alt="" />
                  <span>No board yet</span>
                </div>
              </div>
            )}
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.helpCard}>
            <img src={cactusImg} alt="" className={styles.cactus} />

            <p className={styles.helpText}>
              If you need help with <span>TaskPro</span>, check out our support
              resources or reach out to our customer support team.
            </p>

            <button
              type="button"
              className={styles.helpBtn}
              onClick={() => setIsHelpModalOpen(true)}
            >
              <img src={helpIcon} alt="" />
              <span>Need help?</span>
            </button>
          </div>

          <button type="button" className={styles.logoutBtn}>
            <img src={logoutIcon} alt="" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <img src={menuIcon} alt="" />
          </button>

          <div className={styles.userPanel}>
            <button type="button" className={styles.themeBtn}>
              <span>Theme</span>
              <img src={themeIcon} alt="" />
            </button>

            <span className={styles.userName}>Ivetta</span>
            <img src={userImg} alt="User avatar" className={styles.avatar} />
          </div>
        </header>

        <main
          className={`${styles.content} ${
            createdBoard ? styles.boardContent : ''
          }`}
          style={
            createdBoard?.background
              ? { '--mobile-board-bg': `url(${createdBoard.background})` }
              : undefined
          }
        >
          <div className={styles.boardTopRow}>
            {createdBoard && (
              <h1 className={styles.boardTitle}>{createdBoard.title}</h1>
            )}

            <button type="button" className={styles.filterBtn}>
              <img src={filterIcon} alt="" />
              <span>Filters</span>
            </button>
          </div>

          {createdBoard ? (
            <div className={styles.addColumnBox}>
              <button type="button" className={styles.addColumnBtn}>
                <span>
                  <img src={plusIcon} alt="" />
                </span>
                Add another column
              </button>
            </div>
          ) : (
            <p className={styles.emptyText}>
              Before starting your project, it is essential{' '}
              <button type="button" onClick={openNewBoardModal}>
                to create a board
              </button>{' '}
              to visualize and track all the necessary tasks and milestones.
              This board serves as a powerful tool to organize the workflow and
              ensure effective collaboration among team members.
            </p>
          )}
        </main>
      </div>

      {isNewBoardModalOpen && (
        <NewBoardModal
          onClose={closeNewBoardModal}
          onCreate={handleCreateBoard}
        />
      )}

      {isEditBoardModalOpen && createdBoard && (
        <EditBoardModal
          board={createdBoard}
          onClose={() => setIsEditBoardModalOpen(false)}
          onEdit={handleEditBoard}
        />
      )}

      {isHelpModalOpen && (
        <HelpModal onClose={() => setIsHelpModalOpen(false)} />
      )}
    </div>
  );
}