
import { selectCardsByColumnMap } from '../../features/cards/cardsSelectors';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
import Card from './Card';
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  moveCard,
} from '../../features/cards/cardsOperations';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchColumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from '../../features/columns/columnsOperations';
import {
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../../features/boards/boardsOperations';

import styles from './DashboardPage.module.css';

import { logout, updateProfile } from '../../features/auth/authOperations';
import {
  selectIsRefreshing,
  selectToken,
  selectUser,
} from '../../features/auth/authSelectors';
import { setAuthHeader } from '../../services/api';

import {
  selectBoards,
  selectActiveBoard,
  selectActiveBoardId,
  selectBoardsLoading,
} from '../../features/boards/boardsSelectors';


import { setActiveBoardId } from '../../features/boards/boardsSlice';

import NewBoardModal from './NewBoardModal';
import EditBoardModal from './EditBoardModal';
import HelpModal from './HelpModal';
import AddColumnModal from './AddColumnModal';
import EditColumnModal from './EditColumnModal';
import AddCardModal from './AddCardModal';
import EditCardModal from './EditCardModal';
import FilterModal from './FilterModal';
import EditProfileModal from './EditProfileModal';
import ColumnCard from './ColumnCard';
import { selectColumns } from '../../features/columns/columnsSelectors';


import iconLogo from '../../assets/svg/icon.svg';
import menuIcon from '../../assets/svg/menu.svg';
import filterIcon from '../../assets/svg/filter.svg';
import plusIcon from '../../assets/svg/plus.svg';
import logoutIcon from '../../assets/svg/logout.svg';

import helpIcon from '../../assets/svg/help-circle.svg';
import projectIcon from '../../assets/svg/Project.svg';
import puzzleIcon from '../../assets/svg/puzzle-piece-02.svg';
import pencilIcon from '../../assets/svg/pencil-01.svg';
import trashIcon from '../../assets/svg/trash-04.svg';

import cactusImg from '../../assets/2.webp';
import userImg from '../../assets/user.webp';

import { findBgById } from '../../constants/backgroundConfig';

export default function DashboardPage() {
  const token=useSelector(selectToken);
  const authUser = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const isBoardsLoading = useSelector(selectBoardsLoading);
const activeBoard = useSelector(selectActiveBoard);
const activeBoardId = useSelector(selectActiveBoardId);
 const columns = useSelector(selectColumns);
  const cardsByColumnId = useSelector(selectCardsByColumnMap);
  
const navigate = useNavigate();
useEffect(() => {
  if (!token || isRefreshing || !authUser) return;

  setAuthHeader(token);
  dispatch(fetchBoards());
}, [authUser, dispatch, isRefreshing, token]);
useEffect(() => {
  if (!activeBoardId) return;

  dispatch(fetchColumns(activeBoardId));
}, [dispatch, activeBoardId]);
useEffect(() => {
  columns.forEach(column => {
    dispatch(fetchCards(column.id));
  });
}, [dispatch, columns]);


const handleLogout = async () => {
  const result = await dispatch(logout());

  if (logout.fulfilled.match(result)) {
    navigate('/login');
  }
};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [activeCardColumnId, setActiveCardColumnId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [activeDragCard, setActiveDragCard] = useState(null);

  const hasTouchInput =
    typeof window !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 80,
      tolerance: 6,
    },
  });

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    ...(hasTouchInput ? [] : [pointerSensor]),
  );

 const user = {
  name: authUser?.name || authUser?.email || '',
  avatarUrl:
    authUser?.avatarUrl || authUser?.avatarURL || authUser?.avatar || null,
};
  

  
 

const columnsWithCards = columns.map(column => ({
  ...column,
  cards: cardsByColumnId[column.id] || [],
}));

 

  const handleDragStart = event => {
    const { active } = event;
    if (active.data.current?.type === 'card') {
      setActiveDragCard(active.data.current.card);
    }
  };

 const handleDragEnd = async event => {
  const { active, over } = event;
  setActiveDragCard(null);

  if (active.data.current?.type !== 'card' || !over) {
    return;
  }

  const cardId = active.data.current?.card?.id ?? active.id;
  const sourceColumnId =
    active.data.current?.columnId ??
    columns.find(column =>
      (cardsByColumnId[column.id] || []).some(card => card.id === cardId),
    )?.id;
  const targetColumnId = over.data.current?.columnId ?? over.id;

  if (
    !cardId ||
    !sourceColumnId ||
    !targetColumnId ||
    String(sourceColumnId) === String(targetColumnId)
  ) {
    return;
  }

  const result = await dispatch(
    moveCard({
      cardId,
      targetColumnId,
    }),
  );

  if (moveCard.fulfilled.match(result)) {
    dispatch(fetchCards(sourceColumnId));
    dispatch(fetchCards(targetColumnId));
  }
};

  const handleDragCancel = () => {
    setActiveDragCard(null);
  };

  const handleSaveProfile = async profileData => {
    const result = await dispatch(updateProfile(profileData));

    if (updateProfile.fulfilled.match(result)) {
      setIsProfileOpen(false);
    }
  };

 const handleCreateBoard = async boardData => {
  const result = await dispatch(createBoard(boardData));

  if (createBoard.fulfilled.match(result)) {
    setFilterPriority(null);
    setIsNewBoardModalOpen(false);
    setIsSidebarOpen(false);
  }
};

  const handleEditBoard=async boardData=>{
    const result=await dispatch(
      updateBoard({
        boardId:activeBoardId,
        boardData,
      }),
    );
    if(updateBoard.fulfilled.match(result)){
      setIsEditBoardModalOpen(false);
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteBoard=async boardId=>{
    const result=await dispatch(deleteBoard(boardId));
    if(deleteBoard.fulfilled.match(result)){
      setFilterPriority(null);
      setIsSidebarOpen(false);
    }
  };

  const handleAddColumn = async columnTitle => {
  const result = await dispatch(
    createColumn({
      boardId: activeBoardId,
      title: columnTitle,
    }),
  );

  if (createColumn.fulfilled.match(result)) {
  setIsAddColumnModalOpen(false);
  dispatch(fetchColumns(activeBoardId));
}
};

  const handleEditColumn = async updatedTitle => {
  const result = await dispatch(
    updateColumn({
      columnId: editingColumn.id,
      title: updatedTitle,
    }),
  );

  if (updateColumn.fulfilled.match(result)) {
    setEditingColumn(null);
    dispatch(fetchColumns(activeBoardId));
  }
};

  const handleDeleteColumn = async columnId => {
  const result = await dispatch(deleteColumn(columnId));

  if (deleteColumn.fulfilled.match(result)) {
    dispatch(fetchColumns(activeBoardId));
  }
};

  const handleOpenAddCard = (columnId, event) => {
    event.stopPropagation();
    setActiveCardColumnId(columnId);
    setIsAddCardModalOpen(true);
  };

 const handleAddCard = async cardData => {
  const result = await dispatch(
    createCard({
      columnId: activeCardColumnId,
      cardData,
    }),
  );

  if (createCard.fulfilled.match(result)) {
    setIsAddCardModalOpen(false);
    setActiveCardColumnId(null);
    
  }
};

  const handleDeleteCard = async cardId => {
    await dispatch(deleteCard(cardId));
  };
const handleMoveCard = async cardId => {
  const currentColumn = columns.find(column =>
    (cardsByColumnId[column.id] || []).some(card => card.id === cardId),
  );

  const targetColumnId = columns.find(
    column => column.id !== currentColumn?.id,
  )?.id;

  if (!targetColumnId) return;

  const result = await dispatch(
    moveCard({
      cardId,
      targetColumnId,
    }),
  );

  if (moveCard.fulfilled.match(result)) {
    if (currentColumn?.id) {
      dispatch(fetchCards(currentColumn.id));
    }

    dispatch(fetchCards(targetColumnId));
  }
};

  const handleEditCard = (columnId, card) => {
    setEditingCard({ card, columnId });
  };

 const handleSaveCard = async updatedCard => {
  const result = await dispatch(
    updateCard({
      cardId: updatedCard.id,
      cardData: updatedCard,
    }),
  );

  if (updateCard.fulfilled.match(result)) {
    dispatch(fetchCards(editingCard.columnId));
    setEditingCard(null);
  }
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
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
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
              onClick={() => setIsNewBoardModalOpen(true)}
              aria-label="Create new board"
            >
              <img src={plusIcon} alt="" />
            </button>
          </div>

          <nav className={styles.boardList}>
            {isBoardsLoading && boards.length === 0 ? (
              <div className={styles.boardItem}>
                <div className={styles.boardName}>
                  <img src={puzzleIcon} alt="" />
                  <span>Loading boards...</span>
                </div>
              </div>
            ) : boards.length === 0 ? (
              <div className={styles.boardItem}>
                <div className={styles.boardName}>
                  <img src={puzzleIcon} alt="" />
                  <span>No board yet</span>
                </div>
              </div>
            ) : (
              boards.map(board => (
                <div
                  key={board.id}
                  className={`${styles.boardItem} ${
                    board.id === activeBoardId ? styles.activeBoard : ''
                  }`}
                 onClick={() => {
  dispatch(setActiveBoardId(board.id));
  setFilterPriority(null);
  setIsSidebarOpen(false);
}}
                >
                  <div className={styles.boardName}>
                    <img src={board.icon || projectIcon} alt="" />
                    <span>{board.title}</span>
                  </div>

                  {board.id === activeBoardId && (
                    <div className={styles.boardActions}>
                      <button
                        type="button"
                        aria-label="Edit board"
                        onClick={event => {
                          event.stopPropagation();
                          setIsEditBoardModalOpen(true);
                        }}
                      >
                        <img src={pencilIcon} alt="" />
                      </button>

                      <button
                        type="button"
                        aria-label="Delete board"
                        onClick={event => {
                          event.stopPropagation();
                          handleDeleteBoard(board.id);
                        }}
                      >
                        <img src={trashIcon} alt="" />
                      </button>
                    </div>
                  )}
                </div>
              ))
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

          <button 
            type="button" 
            className={styles.logoutBtn} 
            onClick={e => {
              e.stopPropagation();
              handleLogout();
            }}
          >
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
            <span className={styles.userName}>{user.name}</span>
            <button
              type="button"
              className={styles.avatarBtn}
              onClick={() => setIsProfileOpen(true)}
              aria-label="Edit profile"
            >
              <img
                src={user.avatarUrl ?? userImg}
                alt="User avatar"
                className={styles.avatar}
              />
            </button>
          </div>
        </header>

        <main
          className={`${styles.content} ${activeBoard ? styles.boardContent : ''}`}
          style={(() => {
            const bg = findBgById(activeBoard?.bgId);
            return {
              ...(bg?.mobile   ? { '--mobile-board-bg':  `url(${bg.mobile})`   } : {}),
              ...(bg?.tablet   ? { '--tablet-board-bg':  `url(${bg.tablet})`   } : {}),
              ...(bg?.desktop  ? { '--desktop-board-bg': `url(${bg.desktop})`  } : {}),
            };
          })()}
        >
          <div className={styles.boardTopRow}>
            {activeBoard && (
              <h1 className={styles.boardTitle}>{activeBoard.title}</h1>
            )}

            <div className={styles.filterWrapper}>
              <button
                type="button"
                className={`${styles.filterBtn} ${filterPriority ? styles.filterBtnActive : ''}`}
                onClick={() => setIsFilterOpen(prev => !prev)}
              >
                <img src={filterIcon} alt="" />
                <span>Filters</span>
              </button>

              {isFilterOpen && (
                <FilterModal
                  active={filterPriority}
                  onSelect={id => {
                    setFilterPriority(id);
                    setIsFilterOpen(false);
                  }}
                  onShowAll={() => {
                    setFilterPriority(null);
                    setIsFilterOpen(false);
                  }}
                  onClose={() => setIsFilterOpen(false)}
                />
              )}
            </div>
          </div>

          {isBoardsLoading && boards.length === 0 ? (
            <p className={styles.emptyText}>Loading boards...</p>
          ) : activeBoard ? (
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
            <div className={styles.boardWorkspace}>
              {columnsWithCards.map(column => (
                <ColumnCard
                  key={column.id}
                  column={column}
                  filterPriority={filterPriority}
                  onEdit={() => setEditingColumn(column)}
                  onDelete={() => handleDeleteColumn(column.id)}
                  onAddCard={event => handleOpenAddCard(column.id, event)}
                  onDeleteCard={handleDeleteCard}
                  onEditCard={card => handleEditCard(column.id, card)}
                   onMoveCard={handleMoveCard}
                />
              ))}

              <div className={styles.addColumnBox}>
                <button
                  type="button"
                  className={styles.addColumnBtn}
                  onClick={() => setIsAddColumnModalOpen(true)}
                >
                  <span>
                    <img src={plusIcon} alt="" />
                  </span>
                  Add another column
                </button>
              </div>
            </div>
            <DragOverlay>
              {activeDragCard ? (
                <div style={{ pointerEvents: 'none' }}>
                  <Card card={activeDragCard} isOverlay />
                </div>
              ) : null}
            </DragOverlay>
            </DndContext>
          ) : (
            <p className={styles.emptyText}>
              Before starting your project, it is essential{' '}
              <button
                type="button"
                onClick={() => setIsNewBoardModalOpen(true)}
              >
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
          onClose={() => setIsNewBoardModalOpen(false)}
          onCreate={handleCreateBoard}
        />
      )}

      {isEditBoardModalOpen && activeBoard && (
        <EditBoardModal
          board={activeBoard}
          onClose={() => setIsEditBoardModalOpen(false)}
          onEdit={handleEditBoard}
        />
      )}

      {isHelpModalOpen && (
        <HelpModal onClose={() => setIsHelpModalOpen(false)} />
      )}

      {isAddColumnModalOpen && (
        <AddColumnModal
          onClose={() => setIsAddColumnModalOpen(false)}
          onAdd={handleAddColumn}
        />
      )}

      {editingColumn && (
        <EditColumnModal
          column={editingColumn}
          onClose={() => setEditingColumn(null)}
          onEdit={handleEditColumn}
        />
      )}

      {isAddCardModalOpen && (
        <AddCardModal
          onClose={() => {
            setIsAddCardModalOpen(false);
            setActiveCardColumnId(null);
          }}
          onAdd={handleAddCard}
        />
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard.card}
          onClose={() => setEditingCard(null)}
          onSave={handleSaveCard}
        />
      )}

      {isProfileOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
