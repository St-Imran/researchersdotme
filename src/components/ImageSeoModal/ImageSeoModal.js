import { useState, useEffect } from 'react';
import styles from './ImageSeoModal.module.css';

const ImageSeoModal = ({ isOpen, onClose, onSubmit, onDelete, defaultValue = '', imageFile = null, isEditing = false }) => {
  const [altText, setAltText] = useState(defaultValue);
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [showArticlePreview, setShowArticlePreview] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    setAltText(defaultValue);
    if (imageFile && isOpen) {
      // Load image to get dimensions
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setResizeWidth(img.width);
        setResizeHeight(img.height);
        
        // Calculate initial preview scale to fit in modal (max 450px width)
        const maxPreviewWidth = 450;
        if (img.width > maxPreviewWidth) {
          setPreviewScale(maxPreviewWidth / img.width);
        } else {
          setPreviewScale(1);
        }
      };
      img.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [defaultValue, isOpen, imageFile]);

  // Update preview scale when resize dimensions change
  useEffect(() => {
    if (resizeWidth && originalDimensions.width) {
      const maxPreviewWidth = 450;
      const scale = Math.min(1, maxPreviewWidth / parseInt(resizeWidth));
      setPreviewScale(scale);
    }
  }, [resizeWidth, resizeHeight, originalDimensions.width]);

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
      const resizeOptions = (resizeWidth && resizeHeight) ? {
        width: parseInt(resizeWidth),
        height: parseInt(resizeHeight)
      } : null;
      onSubmit(altText.trim(), resizeOptions);
      setAltText('');
      setResizeWidth('');
      setResizeHeight('');
      setPreviewUrl(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this image?')) {
      onDelete?.();
    }
  };

  const handleWidthChange = (e) => {
    const width = e.target.value;
    setResizeWidth(width);
    
    if (maintainAspectRatio && width && originalDimensions.width) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setResizeHeight(Math.round(parseInt(width) * ratio));
    }
  };

  const handleHeightChange = (e) => {
    const height = e.target.value;
    setResizeHeight(height);
    
    if (maintainAspectRatio && height && originalDimensions.height) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setResizeWidth(Math.round(parseInt(height) * ratio));
    }
  };

  // Interactive resize with mouse drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = parseInt(resizeWidth) || originalDimensions.width;
    const startHeight = parseInt(resizeHeight) || originalDimensions.height;
    
    const handleMouseMove = (e) => {
      // Calculate delta based on actual pixels moved, scaled up for better control
      const deltaX = (e.clientX - startX) / previewScale;
      const newWidth = Math.max(100, Math.round(startWidth + deltaX));
      
      setResizeWidth(newWidth);
      
      if (maintainAspectRatio && originalDimensions.width) {
        const ratio = originalDimensions.height / originalDimensions.width;
        setResizeHeight(Math.round(newWidth * ratio));
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetToOriginal = () => {
    setResizeWidth(originalDimensions.width);
    setResizeHeight(originalDimensions.height);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Image Upload & Optimization</h3>
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
            {previewUrl && (
              <div className={styles.previewSection}>
                <div className={styles.previewTabs}>
                  <button 
                    type="button" 
                    className={!showArticlePreview ? styles.activeTab : styles.tab}
                    onClick={() => setShowArticlePreview(false)}
                  >
                    📐 Resize Preview
                  </button>
                  <button 
                    type="button" 
                    className={showArticlePreview ? styles.activeTab : styles.tab}
                    onClick={() => setShowArticlePreview(true)}
                  >
                    📄 Article Preview
                  </button>
                </div>
                
                {!showArticlePreview ? (
                  <div className={styles.resizePreviewContainer}>
                    <div className={styles.scaleIndicator}>
                      Preview scale: {Math.round(previewScale * 100)}% (Target size: {resizeWidth} × {resizeHeight}px)
                    </div>
                    <div 
                      className={`${styles.resizableImageWrapper} ${isResizing ? styles.resizing : ''}`}
                      style={{ 
                        width: `${Math.min(parseInt(resizeWidth) * previewScale, 450)}px`,
                        maxWidth: '100%'
                      }}
                    >
                      <img 
                        src={previewUrl} 
                        alt="Resizable preview" 
                        className={styles.resizableImage}
                        draggable={false}
                      />
                      <div 
                        className={styles.resizeHandle}
                        onMouseDown={handleMouseDown}
                        title="Drag to resize"
                      >
                        ⇲
                      </div>
                      <div className={styles.sizeLabel}>
                        {resizeWidth} × {resizeHeight}px
                      </div>
                    </div>
                    <div className={styles.dimensionInfo}>
                      <span className={styles.originalSize}>Original: {originalDimensions.width} × {originalDimensions.height}px</span>
                      {(resizeWidth !== originalDimensions.width || resizeHeight !== originalDimensions.height) && (
                        <>
                          <span className={styles.separator}>→</span>
                          <span className={styles.newSize}>Resized: {resizeWidth} × {resizeHeight}px</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.articlePreviewContainer}>
                    <div className={styles.mockArticle}>
                      <h2 className={styles.mockHeading}>Sample Article Content</h2>
                      <p className={styles.mockParagraph}>
                        This is how your image will appear within the article content. 
                        The image will be responsive and adapt to different screen sizes.
                      </p>
                      <img 
                        src={previewUrl} 
                        alt={altText || 'Preview'}
                        className={styles.articlePreviewImage}
                        style={{ 
                          maxWidth: `${resizeWidth}px`,
                          width: '100%',
                          height: 'auto'
                        }}
                      />
                      <p className={styles.mockParagraph}>
                        Content continues below the image. You can adjust the size using 
                        the resize preview tab to see how it affects the layout.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <label htmlFor="image-alt-text" className={styles.label}>
              Alt Text (SEO & Accessibility)
            </label>
            <textarea
              id="image-alt-text"
              className={styles.input}
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Business analytics dashboard showing growth metrics"
              maxLength={125}
              rows={2}
              required
            />
            <small className={styles.hint}>
              {altText.length > 0 && `${altText.length}/125 characters`}
            </small>
            
            {originalDimensions.width > 0 && (
              <div className={styles.resizeSection}>
                <div className={styles.sectionHeader}>
                  <label className={styles.label}>
                    Resize Options
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    />
                    <span>Lock aspect ratio</span>
                  </label>
                </div>
                
                <div className={styles.controlGroup}>
                  <div className={styles.resizeControls}>
                    <div className={styles.dimensionInput}>
                      <label htmlFor="resize-width">Width</label>
                      <input
                        id="resize-width"
                        type="number"
                        value={resizeWidth}
                        onChange={handleWidthChange}
                        min="50"
                        max="4000"
                        className={styles.numberInput}
                      />
                      <span className={styles.unit}>px</span>
                    </div>
                    <span className={styles.timesSymbol}>×</span>
                    <div className={styles.dimensionInput}>
                      <label htmlFor="resize-height">Height</label>
                      <input
                        id="resize-height"
                        type="number"
                        value={resizeHeight}
                        onChange={handleHeightChange}
                        min="50"
                        max="4000"
                        className={styles.numberInput}
                      />
                      <span className={styles.unit}>px</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.presetButtons}>
                  <button type="button" className={styles.presetBtn} onClick={() => { setResizeWidth(800); if(maintainAspectRatio) setResizeHeight(Math.round(800 * originalDimensions.height / originalDimensions.width)); }}>800px</button>
                  <button type="button" className={styles.presetBtn} onClick={() => { setResizeWidth(1200); if(maintainAspectRatio) setResizeHeight(Math.round(1200 * originalDimensions.height / originalDimensions.width)); }}>1200px</button>
                  <button type="button" className={styles.presetBtn} onClick={() => { setResizeWidth(1920); if(maintainAspectRatio) setResizeHeight(Math.round(1920 * originalDimensions.height / originalDimensions.width)); }}>1920px</button>
                  <button type="button" className={styles.presetBtn} onClick={resetToOriginal}>🔄 Reset</button>
                </div>
                
                <div className={styles.helpText}>
                  💡 Tip: Use the "Resize Preview" tab above to drag and resize visually, or use the "Article Preview" tab to see how it will look in your content.
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.modalFooter}>
            {isEditing && onDelete && (
              <button 
                type="button" 
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                🗑️ Delete Image
              </button>
            )}
            <div className={styles.footerRight}>
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
                {isEditing ? 'Update Image' : 'Insert Image'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageSeoModal;
