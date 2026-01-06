import { useState, useEffect } from 'react';
import styles from './ImageSeoModal.module.css';

const ImageSeoModal = ({ isOpen, onClose, onSubmit, defaultValue = '' }) => {
  const [altText, setAltText] = useState(defaultValue);

  useEffect(() => {
    setAltText(defaultValue);
  }, [defaultValue, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Focus on the input when modal opens
      setTimeout(() => {
        document.getElementById('image-alt-text')?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (altText.trim()) {
      onSubmit(altText.trim());
      setAltText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Image SEO Description</h3>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <label htmlFor="image-alt-text" className={styles.label}>
              Enter a brief, descriptive alt text for this image
            </label>
            <textarea
              id="image-alt-text"
              className={styles.input}
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Business analytics dashboard showing growth metrics"
              maxLength={125}
              rows={3}
              required
            />
            <small className={styles.hint}>
              Good alt text helps with SEO and accessibility. Describe what's in the image clearly and concisely.
              {altText.length > 0 && ` (${altText.length}/125 characters)`}
            </small>
          </div>
          
          <div className={styles.modalFooter}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!altText.trim()}
            >
              Insert Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageSeoModal;
