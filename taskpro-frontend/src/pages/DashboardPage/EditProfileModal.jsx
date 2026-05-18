import { useState, useRef } from 'react';
import styles from './EditProfileModal.module.css';

import defaultAvatar from '../../assets/user.webp';
import plusIcon from '../../assets/svg/plus.svg';

export default function EditProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name ?? '');
  const [previewUrl, setPreviewUrl] = useState(user.avatarUrl ?? null);
  const fileInputRef = useRef(null);

  const handleFileChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSave({ name: name.trim(), avatarUrl: previewUrl });
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.title}>Edit profile</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.avatarWrapper}>
            <img
              src={previewUrl || defaultAvatar}
              alt="Profile"
              className={styles.avatar}
              onError={e => { e.currentTarget.src = defaultAvatar; }}
            />
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
            >
              <img src={plusIcon} alt="" className={styles.plusIcon} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
          </div>

          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
          />

          <button type="submit" className={styles.submitBtn}>
            Edit profile
          </button>
        </form>
      </div>
    </div>
  );
}
