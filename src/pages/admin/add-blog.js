import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./AddBlog.module.css";
import { getApiUrl } from "../../config/api";
import ImageSeoModal from "../../components/ImageSeoModal/ImageSeoModal";

const AddBlog = () => {
  const router = useRouter();
  const { id } = router.query; // Get id (slug or _id) from query params for editing
  const contentRef = useRef(null);
  const imageInputRef = useRef(null);
  const featuredImageInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showImageModal, setShowImageModal] = useState(false);
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [editingImage, setEditingImage] = useState(null); // Track image being edited
  const [savedSelection, setSavedSelection] = useState(null); // Store cursor position
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    subCategory: "",
    author: "",
    excerpt: "",
    description: "",
    content: "",
    image: "",
    bg: "",
    featured: false,
    tags: "",
    keywords: "",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setFormData(prev => ({ ...prev, slug }));
  };

  // Rich text editor functions
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  // Upload image to server
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(getApiUrl('/api/upload-image'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      return data.path; // Returns /services/filename.jpg
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Resize image using Canvas API
  const resizeImage = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a new File object with the resized blob
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          }, file.type, 0.92); // 0.92 quality for good balance
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const insertImage = async () => {
    // Save current selection/cursor position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange());
    }
    
    // Trigger hidden file input
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP, or AVIF)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Store the file and show modal for alt text
    setPendingImageFile(file);
    setShowImageModal(true);
    
    // Reset file input
    e.target.value = '';
  };

  const handleImageModalSubmit = async (altText, resizeOptions = null) => {
    if (!pendingImageFile) return;
    
    setShowImageModal(false);
    
    // If editing an existing image, just update its attributes
    if (editingImage) {
      const imgElement = editingImage.element;
      
      // Update alt text
      imgElement.alt = altText;
      
      // Update size if resize options provided
      if (resizeOptions && resizeOptions.width) {
        imgElement.style.maxWidth = `${resizeOptions.width}px`;
        imgElement.style.width = '100%';
        imgElement.style.height = 'auto';
      }
      
      // Update form data
      if (contentRef.current) {
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
      }
      
      setEditingImage(null);
      setPendingImageFile(null);
      setupImageClickHandlers();
      
      setMessage({ type: 'success', text: 'Image updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
      
      return;
    }
    
    // Original insert logic for new images
    setUploadingImage(true);
    
    try {
      let fileToUpload = pendingImageFile;
      
      // Show placeholder in editor while uploading
      if (contentRef.current && savedSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedSelection);
        
        const placeholder = document.createElement('div');
        placeholder.className = styles.imagePlaceholder;
        placeholder.innerHTML = '<div class="' + styles.placeholderSpinner + '"></div><p>Uploading image...</p>';
        placeholder.id = 'temp-image-placeholder';
        
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(placeholder);
        }
      }
      
      // Resize image if options provided
      if (resizeOptions && resizeOptions.width && resizeOptions.height) {
        setMessage({ type: 'info', text: 'Resizing image...' });
        fileToUpload = await resizeImage(
          pendingImageFile, 
          resizeOptions.width, 
          resizeOptions.height
        );
      }
      
      // Upload to server
      const imagePath = await uploadImageToServer(fileToUpload);
      
      // Remove placeholder if it exists
      const placeholder = document.getElementById('temp-image-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
      
      // Insert into editor at saved cursor position
      if (contentRef.current) {
        contentRef.current.focus();
        
        // Restore the saved selection
        const selection = window.getSelection();
        if (savedSelection) {
          selection.removeAllRanges();
          selection.addRange(savedSelection);
        }
        
        // Create and insert the image element
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = altText;
        imgElement.style.maxWidth = resizeOptions ? `${resizeOptions.width}px` : '100%';
        imgElement.style.width = '100%';
        imgElement.style.height = 'auto';
        imgElement.style.margin = '20px 0';
        imgElement.style.borderRadius = '8px';
        
        // Insert at current cursor position
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(imgElement);
          
          // Add a line break after the image for better UX
          const br = document.createElement('br');
          range.collapse(false);
          range.insertNode(br);
          
          // Move cursor after the break
          range.setStartAfter(br);
          range.setEndAfter(br);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Fallback: append to end if no selection
          contentRef.current.appendChild(imgElement);
          contentRef.current.appendChild(document.createElement('br'));
        }
        
        // Update form data
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
        
        // Setup click handlers for the newly inserted image
        setupImageClickHandlers();
      }
      
      // Show success message briefly
      setMessage({ type: 'success', text: 'Image uploaded and inserted successfully!' });
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 2000);
      
    } catch (error) {
      // Remove placeholder if upload failed
      const placeholder = document.getElementById('temp-image-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploadingImage(false);
      setPendingImageFile(null);
      setSavedSelection(null); // Clear saved selection
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const text = window.getSelection().toString() || prompt("Enter link text:");
      if (text) {
        const linkHtml = `<a href="${url}" target="_blank">${text}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      }
    }
  };

  const setFontSize = (size) => {
    execCommand('fontSize', size);
  };

  const setHeading = (level) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  // Color functions
  const setFontColor = (color) => {
    execCommand('foreColor', color);
    contentRef.current?.focus();
  };

  const setBackgroundColor = (color) => {
    execCommand('backColor', color);
    contentRef.current?.focus();
  };

  // Insert blockquote
  const insertBlockquote = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
      const quoteHtml = `<blockquote>${selectedText}</blockquote><p><br></p>`;
      document.execCommand('insertHTML', false, quoteHtml);
    } else {
      const quoteHtml = `<blockquote>Enter your quote here...</blockquote><p><br></p>`;
      document.execCommand('insertHTML', false, quoteHtml);
    }
  };

  // Insert code block
  const insertCodeBlock = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const code = selectedText || 'Enter your code here...';
    const codeHtml = `<pre><code>${code}</code></pre><p><br></p>`;
    document.execCommand('insertHTML', false, codeHtml);
  };

  // Insert horizontal rule
  const insertHorizontalRule = () => {
    execCommand('insertHorizontalRule');
  };

  // Insert bordered text box
  const insertTextBox = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const text = selectedText || 'Enter your text here...';
    const boxHtml = `<div style="border: 2px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 8px; background: #f8f9fa;">${text}</div><p><br></p>`;
    document.execCommand('insertHTML', false, boxHtml);
  };

  // Insert highlighted text box
  const insertHighlightBox = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const text = selectedText || 'Enter highlighted text here...';
    const boxHtml = `<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 4px;">${text}</div><p><br></p>`;
    document.execCommand('insertHTML', false, boxHtml);
  };

  // Insert table
  const insertTable = () => {
    // Insert a default 3x3 table that users can modify
    let tableHtml = '<div style="margin: 20px 0; border: 2px solid #667eea; border-radius: 8px; padding: 15px; background: #f8f9fa;">';
    tableHtml += '<div style="margin-bottom: 10px; display: flex; gap: 10px; flex-wrap: wrap;">';
    tableHtml += '<button onclick="addTableRow(this); return false;" type="button" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">+ Add Row</button>';
    tableHtml += '<button onclick="removeTableRow(this); return false;" type="button" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">- Remove Row</button>';
    tableHtml += '<button onclick="addTableColumn(this); return false;" type="button" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">+ Add Column</button>';
    tableHtml += '<button onclick="removeTableColumn(this); return false;" type="button" style="padding: 6px 12px; background: #ffc107; color: #333; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">- Remove Column</button>';
    tableHtml += '</div>';;
    tableHtml += '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; background: white;">';
    tableHtml += '<thead><tr>';
    
    // Header row - 3 columns by default
    for (let j = 0; j < 3; j++) {
      tableHtml += '<th style="border: 1px solid #ddd; padding: 12px; background: #667eea; color: white; text-align: left;" contenteditable="true" onclick="window.lastClickedTableCell=this">Header ' + (j + 1) + '</th>';
    }
    tableHtml += '</tr></thead><tbody>';
    
    // Data rows - 2 rows by default
    for (let i = 0; i < 2; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        tableHtml += '<td style="border: 1px solid #ddd; padding: 12px;" contenteditable="true" onclick="window.lastClickedTableCell=this">Cell ' + (i+1) + ',' + (j+1) + '</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div><p><br></p>';
    
    document.execCommand('insertHTML', false, tableHtml);
    
    // Add global functions for table manipulation if not already added
    if (typeof window.addTableRow === 'undefined') {
      // Track last clicked cell globally
      window.lastClickedTableCell = null;
      
      window.addTableRow = function(btn) {
        const table = btn.parentElement.nextElementSibling;
        const row = table.insertRow(-1);
        const colCount = table.rows[0].cells.length;
        for (let i = 0; i < colCount; i++) {
          const cell = row.insertCell(i);
          cell.style.border = '1px solid #ddd';
          cell.style.padding = '12px';
          cell.contentEditable = 'true';
          cell.textContent = 'New cell';
          cell.onclick = function() { window.lastClickedTableCell = this; };
        }
      };
      
      window.removeTableRow = function(btn) {
        const table = btn.parentElement.nextElementSibling;
        let rowToDelete = -1;
        
        // Use last clicked cell to find row
        if (window.lastClickedTableCell) {
          let node = window.lastClickedTableCell;
          while (node && node !== table) {
            if (node.tagName === 'TR') {
              rowToDelete = Array.from(table.rows).indexOf(node);
              break;
            }
            node = node.parentElement;
          }
        }
        
        // If no row is selected or header is selected, default to last row
        if (rowToDelete <= 0) {
          rowToDelete = table.rows.length - 1;
        }
        
        if (table.rows.length > 2) {
          table.deleteRow(rowToDelete);
          window.lastClickedTableCell = null;
        } else {
          alert('Table must have at least one data row!');
        }
      };
      
      window.addTableColumn = function(btn) {
        const table = btn.parentElement.nextElementSibling;
        const rows = table.rows;
        const headerRow = table.querySelector('thead tr');
        const headerCell = document.createElement('th');
        headerCell.style.border = '1px solid #ddd';
        headerCell.style.padding = '12px';
        headerCell.style.background = '#667eea';
        headerCell.style.color = 'white';
        headerCell.style.textAlign = 'left';
        headerCell.contentEditable = 'true';
        headerCell.textContent = 'Header ' + (headerRow.cells.length + 1);
        headerCell.onclick = function() { window.lastClickedTableCell = this; };
        headerRow.appendChild(headerCell);
        
        for (let i = 1; i < rows.length; i++) {
          const cell = rows[i].insertCell(-1);
          cell.style.border = '1px solid #ddd';
          cell.style.padding = '12px';
          cell.contentEditable = 'true';
          cell.textContent = 'New cell';
          cell.onclick = function() { window.lastClickedTableCell = this; };
        }
      };
      
      window.removeTableColumn = function(btn) {
        const table = btn.parentElement.nextElementSibling;
        const rows = table.rows;
        let colToDelete = -1;
        
        // Use last clicked cell to find column
        if (window.lastClickedTableCell) {
          let node = window.lastClickedTableCell;
          while (node && node !== table) {
            if (node.tagName === 'TD' || node.tagName === 'TH') {
              colToDelete = node.cellIndex;
              break;
            }
            node = node.parentElement;
          }
        }
        
        // If no column is selected, default to last column
        if (colToDelete === -1) {
          colToDelete = rows[0].cells.length - 1;
        }
        
        if (rows[0].cells.length > 1) {
          for (let i = 0; i < rows.length; i++) {
            rows[i].deleteCell(colToDelete);
          }
          window.lastClickedTableCell = null;
        } else {
          alert('Table must have at least one column!');
        }
      };
    }
    
    setMessage({ type: 'success', text: 'Table inserted! Use the buttons above the table to add/remove rows and columns.' });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  // Text case transformations
  const transformText = (type) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
      let transformed = selectedText;
      switch(type) {
        case 'uppercase':
          transformed = selectedText.toUpperCase();
          break;
        case 'lowercase':
          transformed = selectedText.toLowerCase();
          break;
        case 'capitalize':
          transformed = selectedText.replace(/\b\w/g, char => char.toUpperCase());
          break;
      }
      document.execCommand('insertHTML', false, transformed);
    }
  };

  // Insert special characters
  const insertSpecialChar = (char) => {
    document.execCommand('insertHTML', false, char);
    contentRef.current?.focus();
  };

  // Select all content
  const selectAllContent = () => {
    if (contentRef.current) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Clear all content with confirmation
  const clearAllContent = () => {
    if (window.confirm('Are you sure you want to clear all content? This cannot be undone.')) {
      if (contentRef.current) {
        contentRef.current.innerHTML = '';
        setFormData(prev => ({ ...prev, content: '' }));
      }
    }
  };

  // Get word count
  const getWordCount = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      return words.length;
    }
    return 0;
  };

  // Set font family
  const setFontFamily = (font) => {
    execCommand('fontName', font);
  };

  // Float image left or right for text wrapping
  const floatImage = (direction) => {
    const selection = window.getSelection();
    let imgElement = null;
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const node = range.commonAncestorContainer;
      
      // Check various ways the image might be selected
      if (node.nodeName === 'IMG') {
        imgElement = node;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.querySelector('img')) {
        imgElement = node.querySelector('img');
      } else if (node.parentNode && node.parentNode.nodeName === 'IMG') {
        imgElement = node.parentNode;
      } else if (range.startContainer && range.startContainer.nodeType === Node.ELEMENT_NODE) {
        const element = range.startContainer;
        if (element.nodeName === 'IMG') {
          imgElement = element;
        } else if (element.querySelector('img')) {
          imgElement = element.querySelector('img');
        }
      }
      
      // Also check if anything in the range is an image
      if (!imgElement && contentRef.current) {
        const allImages = contentRef.current.querySelectorAll('img');
        allImages.forEach(img => {
          if (selection.containsNode(img, true)) {
            imgElement = img;
          }
        });
      }
    }
    
    if (imgElement) {
      if (direction === 'left') {
        imgElement.style.float = 'left';
        imgElement.style.margin = '10px 20px 10px 0';
        imgElement.style.display = 'block';
      } else if (direction === 'right') {
        imgElement.style.float = 'right';
        imgElement.style.margin = '10px 0 10px 20px';
        imgElement.style.display = 'block';
      } else if (direction === 'none') {
        imgElement.style.float = 'none';
        imgElement.style.margin = '20px 0';
        imgElement.style.display = 'block';
      }
      
      // Update form data
      if (contentRef.current) {
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
      }
      
      // Show brief confirmation
      const floatText = direction === 'left' ? 'left' : direction === 'right' ? 'right' : 'reset';
      setMessage({ type: 'success', text: `Image floated ${floatText}!` });
      setTimeout(() => setMessage({ type: '', text: '' }), 1500);
    } else {
      setMessage({ type: 'error', text: 'Please click on an image first, then use the float buttons.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleContentBlur = () => {
    if (contentRef.current) {
      setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
    }
  };

  // Upload featured image
  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP, or AVIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploadingFeaturedImage(true);
    try {
      const imagePath = await uploadImageToServer(file);
      setFormData(prev => ({ ...prev, image: imagePath }));
      setMessage({ type: 'success', text: 'Featured image uploaded successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    } catch (error) {
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploadingFeaturedImage(false);
      e.target.value = '';
    }
  };

  // Make images in editor clickable for editing
  const setupImageClickHandlers = () => {
    if (!contentRef.current) return;
    
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      // Remove old listeners
      img.style.cursor = 'pointer';
      img.title = 'Double-click to edit image size/alt text';
      
      // Clone to remove old event listeners
      const newImg = img.cloneNode(true);
      
      // Single click - just select the image (for float buttons)
      newImg.addEventListener('click', (e) => {
        e.preventDefault();
        // Select the image for floating
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNode(newImg);
        selection.removeAllRanges();
        selection.addRange(range);
      });
      
      // Double click - open edit modal
      newImg.addEventListener('dblclick', (e) => {
        e.preventDefault();
        handleImageEdit(newImg);
      });
      
      img.parentNode.replaceChild(newImg, img);
    });
  };

  // Handle editing an existing image
  const handleImageEdit = (imgElement) => {
    const currentWidth = imgElement.naturalWidth || parseInt(imgElement.style.maxWidth) || imgElement.width;
    const currentAlt = imgElement.alt || '';
    
    // Store reference to the image being edited
    setEditingImage({
      element: imgElement,
      currentWidth: currentWidth,
      currentAlt: currentAlt
    });
    
    // Create a temporary file object from the image src for preview
    fetch(imgElement.src)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'current-image.jpg', { type: blob.type });
        setPendingImageFile(file);
        setShowImageModal(true);
      })
      .catch(err => {
        console.error('Failed to load image for editing:', err);
        alert('Failed to load image for editing');
      });
  };

  // Handle deleting an image
  const handleImageDelete = () => {
    if (editingImage && editingImage.element) {
      // Remove the image element from the editor
      editingImage.element.remove();
      
      // Update form data
      if (contentRef.current) {
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
      }
      
      // Close modal and reset state
      setShowImageModal(false);
      setEditingImage(null);
      setPendingImageFile(null);
      
      setMessage({ type: 'success', text: 'Image deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    }
  };

  // Set initial content only once
  useEffect(() => {
    if (contentRef.current && !contentRef.current.innerHTML) {
      contentRef.current.innerHTML = formData.content || '';
      setupImageClickHandlers();
    }
  }, []);

  // Setup image click handlers when content changes
  useEffect(() => {
    setupImageClickHandlers();
  }, [formData.content]);

  // Load blog data if editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setBlogId(id);
      setLoading(true);
      
      fetch(getApiUrl(`/api/blogs/${id}`))
        .then((res) => {
          if (!res.ok) throw new Error('Blog not found');
          return res.json();
        })
        .then((data) => {
          // Convert arrays to comma-separated strings for form
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "",
            subCategory: data.subCategory || "",
            author: data.author || "",
            excerpt: data.excerpt || "",
            description: data.description || "",
            content: data.content || "",
            image: data.image || "",
            bg: data.bg || "",
            featured: data.featured || false,
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
            keywords: Array.isArray(data.keywords) ? data.keywords.join(", ") : "",
            status: data.status || "active"
          });
          
          // Set content in editor
          if (contentRef.current) {
            contentRef.current.innerHTML = data.content || '';
          }
          
          setLoading(false);
        })
        .catch((err) => {
          setMessage({ type: "error", text: `Failed to load blog: ${err.message}` });
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Capture content from editor before submitting
    if (contentRef.current) {
      formData.content = contentRef.current.innerHTML;
    }

    try {
      // Convert comma-separated strings to arrays
      const blogData = {
        ...formData,
        tags: formData.tags 
          ? formData.tags.split(",").map(t => t.trim()).filter(t => t)
          : [],
        keywords: formData.keywords 
          ? formData.keywords.split(",").map(k => k.trim()).filter(k => k)
          : []
      };

      let response;
      if (isEditMode) {
        // Update existing blog
        response = await fetch(getApiUrl(`/api/blogs/${blogId}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData)
        });
      } else {
        // Create new blog
        response = await fetch(getApiUrl("/api/blogs"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData)
        });
      }

      if (!response.ok) {
        throw new Error(isEditMode ? "Failed to update blog" : "Failed to create blog");
      }

      const result = await response.json();
      setMessage({ 
        type: "success", 
        text: isEditMode 
          ? `Blog "${formData.title}" updated successfully!` 
          : `Blog "${formData.title}" created successfully!`
      });
      
      // Redirect after success
      setTimeout(() => {
        if (confirm(`Blog ${isEditMode ? 'updated' : 'created'}! Do you want to view it?`)) {
          router.push(`/blogs/${formData.slug}`);
        } else if (isEditMode) {
          router.push('/admin/manage-blogs');
        } else {
          // Reset form for next entry
          setFormData({
            title: "",
            slug: "",
            category: "",
            subCategory: "",
            author: "",
            excerpt: "",
            description: "",
            content: "",
            image: "",
            bg: "",
            featured: false,
            tags: "",
            keywords: "",
            status: "active"
          });
          if (contentRef.current) {
            contentRef.current.innerHTML = '';
          }
        }
      }, 1000);

    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || `Failed to ${isEditMode ? 'update' : 'create'} blog. Make sure backend is running.` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ImageSeoModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setPendingImageFile(null);
          setEditingImage(null);
        }}
        onSubmit={handleImageModalSubmit}
        onDelete={editingImage ? handleImageDelete : null}
        isEditing={!!editingImage}
        defaultValue={editingImage ? editingImage.currentAlt : (pendingImageFile ? pendingImageFile.name.split('.')[0].replace(/-|_/g, ' ') : '')}
        imageFile={pendingImageFile}
      />
      
      {/* Loading overlay during image upload */}
      {uploadingImage && (
        <div className={styles.uploadOverlay}>
          <div className={styles.uploadSpinner}>
            <div className={styles.spinner}></div>
            <p>Uploading and inserting image...</p>
          </div>
        </div>
      )}
      
      <div className={styles.container}>
      <div className={styles.header}>
        <h1>{isEditMode ? 'Edit Blog' : 'Add New Blog'}</h1>
        <p>{isEditMode ? 'Update the blog information below' : 'Create a new blog post that will appear on the blogs page and have its own detail page'}</p>
      </div>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Basic Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">
              Blog Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., 10 Tips for Effective Market Research"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="slug">
                URL Slug <span className={styles.required}>*</span>
              </label>
              <div className={styles.slugGroup}>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="10-tips-effective-market-research"
                />
                <button 
                  type="button" 
                  onClick={generateSlug}
                  className={styles.slugButton}
                >
                  Generate
                </button>
              </div>
              <small>URL: /blogs/{formData.slug || "your-slug"}</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g., John Doe"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Market Research"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subCategory">Sub Category</label>
              <input
                type="text"
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                placeholder="e.g., Tips & Guides"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt">
              Excerpt <span className={styles.required}>*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="2"
              placeholder="Brief summary shown on blog cards"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">
              Description <span className={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Longer description for SEO and detail page"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Content</h2>
          
          <div className={styles.formGroup}>
            <label>
              Blog Content <span className={styles.required}>*</span>
            </label>
            
            {/* Word Count Display */}
            <div className={styles.wordCount}>
              📊 Words: <strong>{getWordCount()}</strong> | Characters: <strong>{contentRef.current?.innerText?.length || 0}</strong>
            </div>
            
            {/* Rich Text Editor Toolbar */}
            <div className={styles.editorToolbar}>
              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('undo')}
                  title="Undo (Ctrl+Z)"
                >
                  ↶
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('redo')}
                  title="Redo (Ctrl+Y)"
                >
                  ↷
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <select 
                  className={styles.toolbarSelect}
                  onChange={(e) => {
                    if(e.target.value) {
                      setFontFamily(e.target.value);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Font Family</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Comic Sans MS">Comic Sans</option>
                </select>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('bold')}
                  title="Bold (Ctrl+B)"
                >
                  <strong>B</strong>
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('italic')}
                  title="Italic (Ctrl+I)"
                >
                  <em>I</em>
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('underline')}
                  title="Underline (Ctrl+U)"
                >
                  <u>U</u>
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('strikeThrough')}
                  title="Strikethrough"
                >
                  <s>S</s>
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <select 
                  className={styles.toolbarSelect}
                  onChange={(e) => {
                    if(e.target.value) {
                      setHeading(e.target.value);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Select Heading</option>
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                  <option value="3">Heading 3</option>
                  <option value="4">Heading 4</option>
                </select>
                <select 
                  className={styles.toolbarSelect}
                  onChange={(e) => {
                    if(e.target.value) {
                      setFontSize(e.target.value);
                    }
                  }}
                  defaultValue="3"
                >
                  <option value="1">Small</option>
                  <option value="3">Normal</option>
                  <option value="5">Large</option>
                  <option value="7">Extra Large</option>
                </select>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  • List
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  1. List
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('justifyLeft')}
                  title="Align Left"
                >
                  ⬅
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('justifyCenter')}
                  title="Align Center"
                >
                  ↔
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('justifyRight')}
                  title="Align Right"
                >
                  ➡
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('justifyFull')}
                  title="Justify"
                >
                  ⬌
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => floatImage('left')}
                  title="Float Image Left (text wraps on right)"
                >
                  📷⬅
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => floatImage('right')}
                  title="Float Image Right (text wraps on left)"
                >
                  ➡📷
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => floatImage('none')}
                  title="Reset Image (no float)"
                >
                  📷
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertLink}
                  title="Insert Link"
                >
                  🔗 Link
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertImage}
                  title="Upload & Insert Image"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? '⏳' : '🖼️'} {uploadingImage ? 'Uploading...' : 'Image'}
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <span className={styles.toolbarLabel}>Text:</span>
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setFontColor('#000000')}
                  style={{background: '#000000'}}
                  title="Black"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setFontColor('#dc3545')}
                  style={{background: '#dc3545'}}
                  title="Red"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setFontColor('#28a745')}
                  style={{background: '#28a745'}}
                  title="Green"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setFontColor('#007bff')}
                  style={{background: '#007bff'}}
                  title="Blue"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setFontColor('#ffc107')}
                  style={{background: '#ffc107'}}
                  title="Yellow"
                />
                <input 
                  type="color" 
                  className={styles.colorInput}
                  onChange={(e) => setFontColor(e.target.value)}
                  title="Custom Text Color"
                  defaultValue="#000000"
                />
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <span className={styles.toolbarLabel}>BG:</span>
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setBackgroundColor('#ffffff')}
                  style={{background: '#ffffff', border: '1px solid #ccc'}}
                  title="White"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setBackgroundColor('#ffeb3b')}
                  style={{background: '#ffeb3b'}}
                  title="Yellow Highlight"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setBackgroundColor('#80ed99')}
                  style={{background: '#80ed99'}}
                  title="Green Highlight"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setBackgroundColor('#a8daff')}
                  style={{background: '#a8daff'}}
                  title="Blue Highlight"
                />
                <button 
                  type="button" 
                  className={styles.colorBtn}
                  onClick={() => setBackgroundColor('#ffc9e0')}
                  style={{background: '#ffc9e0'}}
                  title="Pink Highlight"
                />
                <input 
                  type="color" 
                  className={styles.colorInput}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  title="Custom Background Color"
                  defaultValue="#ffffff"
                />
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('indent')}
                  title="Indent"
                >
                  ➡️
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('outdent')}
                  title="Outdent"
                >
                  ⬅️
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('subscript')}
                  title="Subscript"
                >
                  X₂
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('superscript')}
                  title="Superscript"
                >
                  X²
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertBlockquote}
                  title="Insert Blockquote"
                >
                  💬 Quote
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertCodeBlock}
                  title="Insert Code Block"
                >
                  &lt;/&gt; Code
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertHorizontalRule}
                  title="Insert Horizontal Line"
                >
                  ―
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertTextBox}
                  title="Insert Bordered Text Box"
                >
                  📦 Box
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertHighlightBox}
                  title="Insert Highlight Box"
                >
                  ⭐ Highlight
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={insertTable}
                  title="Insert Table"
                >
                  ⊞ Table
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => transformText('uppercase')}
                  title="UPPERCASE"
                >
                  AA
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => transformText('lowercase')}
                  title="lowercase"
                >
                  aa
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => transformText('capitalize')}
                  title="Capitalize Each Word"
                >
                  Aa
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <select 
                  className={styles.toolbarSelect}
                  onChange={(e) => {
                    if(e.target.value) {
                      insertSpecialChar(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Symbols</option>
                  <option value="©">© Copyright</option>
                  <option value="®">® Registered</option>
                  <option value="™">™ Trademark</option>
                  <option value="€">€ Euro</option>
                  <option value="£">£ Pound</option>
                  <option value="¥">¥ Yen</option>
                  <option value="°">° Degree</option>
                  <option value="±">± Plus-Minus</option>
                  <option value="×">× Multiply</option>
                  <option value="÷">÷ Divide</option>
                  <option value="→">→ Arrow Right</option>
                  <option value="←">← Arrow Left</option>
                  <option value="↑">↑ Arrow Up</option>
                  <option value="↓">↓ Arrow Down</option>
                  <option value="✓">✓ Check</option>
                  <option value="✗">✗ Cross</option>
                  <option value="★">★ Star</option>
                  <option value="♥">♥ Heart</option>
                  <option value="•">• Bullet</option>
                  <option value="…">… Ellipsis</option>
                </select>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={selectAllContent}
                  title="Select All (Ctrl+A)"
                >
                  ⊡ All
                </button>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={clearAllContent}
                  title="Clear All Content"
                  style={{color: '#dc3545'}}
                >
                  🗑️ Clear
                </button>
              </div>

              <div className={styles.toolbarDivider}></div>

              <div className={styles.toolbarGroup}>
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection.toString()) {
                      execCommand('removeFormat');
                    } else {
                      // If nothing selected, select all and remove format
                      if (window.confirm('No text selected. Remove all formatting from entire content?')) {
                        selectAllContent();
                        setTimeout(() => {
                          execCommand('removeFormat');
                          // Deselect
                          window.getSelection().removeAllRanges();
                        }, 100);
                      }
                    }
                  }}
                  title="Remove Formatting (select text first, or click to format all)"
                >
                  ✕ Format
                </button>
              </div>
            </div>

            {/* Editable Content Area */}
            <div
              ref={contentRef}
              className={styles.richTextEditor}
              contentEditable
              onBlur={handleContentBlur}
              suppressContentEditableWarning
            />
            
            {/* Hidden file input for image upload */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            
            <small>
              Use the toolbar to format text. Click the 🖼️ button to upload images from your computer. Images are automatically saved to the server.
              <br />
              <strong>Image controls:</strong> Single-click an image to select it for floating (📷⬅ ➡📷 📷 buttons). Double-click an image to edit its size and alt text.
            </small>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Media & SEO</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="image">Featured Image (Optional)</label>
              <div className={styles.imageUploadGroup}>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/services/blog-featured-image.jpg"
                />
                <button 
                  type="button"
                  onClick={() => featuredImageInputRef.current?.click()}
                  className={styles.uploadImageBtn}
                  disabled={uploadingFeaturedImage}
                >
                  {uploadingFeaturedImage ? '⏳ Uploading...' : '📤 Upload'}
                </button>
              </div>
              <input
                ref={featuredImageInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                onChange={handleFeaturedImageUpload}
                style={{ display: 'none' }}
              />
              <small>Optional: Additional featured image for detail page</small>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="market research, tips, business strategy"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="keywords">Keywords (comma-separated)</label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="market research, data analysis, business insights"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Settings</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>&nbsp;</label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Featured Blog</span>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={() => router.push(isEditMode ? "/admin/manage-blogs" : "/admin")}
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (isEditMode ? "Updating Blog..." : "Creating Blog...") : (isEditMode ? "Update Blog" : "Create Blog")}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddBlog;
