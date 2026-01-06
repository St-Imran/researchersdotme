import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./AddService.module.css";
import { getApiUrl } from "../../config/api";
import ImageSeoModal from "../../components/ImageSeoModal/ImageSeoModal";

const AddService = () => {
  const router = useRouter();
  const { id } = router.query; // Get id (slug or _id) from query params for editing
  const contentRef = useRef(null);
  const imageInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showImageModal, setShowImageModal] = useState(false);
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    heading: "",
    subTitle: "",
    description: "",
    content: "",
    image: "",
    featured: false,
    features: "",
    benefits: "",
    keywords: "",
    order: 0,
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

  const insertImage = async () => {
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

  const handleImageModalSubmit = async (altText) => {
    if (!pendingImageFile) return;
    
    setShowImageModal(false);
    setUploadingImage(true);
    
    try {
      // Upload to server
      const imagePath = await uploadImageToServer(pendingImageFile);
      
      // Insert into editor
      const imgHtml = `<img src="${imagePath}" alt="${altText}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />`;
      
      // Focus the editor first
      if (contentRef.current) {
        contentRef.current.focus();
        
        // Insert the image HTML
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          
          const imgElement = document.createElement('img');
          imgElement.src = imagePath;
          imgElement.alt = altText;
          imgElement.style.maxWidth = '100%';
          imgElement.style.height = 'auto';
          imgElement.style.margin = '20px 0';
          imgElement.style.borderRadius = '8px';
          
          range.insertNode(imgElement);
          
          // Move cursor after the image
          range.setStartAfter(imgElement);
          range.setEndAfter(imgElement);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // No selection, append to end
          contentRef.current.innerHTML += imgHtml;
        }
        
        // Update form data
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
      }
      
      // Show success message briefly
      setMessage({ type: 'success', text: 'Image uploaded and inserted successfully!' });
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 2000);
      
    } catch (error) {
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploadingImage(false);
      setPendingImageFile(null);
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

  const handleContentBlur = () => {
    if (contentRef.current) {
      setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
    }
  };

  // Set initial content only once
  useEffect(() => {
    if (contentRef.current && !contentRef.current.innerHTML) {
      contentRef.current.innerHTML = formData.content || '';
    }
  }, []);

  // Load service data if editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setServiceId(id);
      setLoading(true);
      
      fetch(getApiUrl(`/api/services/${id}`))
        .then((res) => {
          if (!res.ok) throw new Error('Service not found');
          return res.json();
        })
        .then((data) => {
          // Convert arrays to newline/comma-separated strings for form
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "",
            heading: data.heading || "",
            subTitle: data.subTitle || "",
            description: data.description || "",
            content: data.content || "",
            image: data.image || "",
            featured: data.featured || false,
            features: Array.isArray(data.features) ? data.features.join("\n") : "",
            benefits: Array.isArray(data.benefits) ? data.benefits.join("\n") : "",
            keywords: Array.isArray(data.keywords) ? data.keywords.join(", ") : "",
            order: data.order || 0,
            status: data.status || "active"
          });
          
          // Set content in editor
          if (contentRef.current) {
            contentRef.current.innerHTML = data.content || '';
          }
          
          setLoading(false);
        })
        .catch((err) => {
          setMessage({ type: "error", text: `Failed to load service: ${err.message}` });
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
      const serviceData = {
        ...formData,
        features: formData.features 
          ? formData.features.split("\n").map(f => f.trim()).filter(f => f)
          : [],
        benefits: formData.benefits 
          ? formData.benefits.split("\n").map(b => b.trim()).filter(b => b)
          : [],
        keywords: formData.keywords 
          ? formData.keywords.split(",").map(k => k.trim()).filter(k => k)
          : [],
        order: parseInt(formData.order) || 0
      };

      let response;
      if (isEditMode) {
        // Update existing service
        response = await fetch(getApiUrl(`/api/services/${serviceId}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData)
        });
      } else {
        // Create new service
        response = await fetch(getApiUrl("/api/services"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData)
        });
      }

      if (!response.ok) {
        throw new Error(isEditMode ? "Failed to update service" : "Failed to create service");
      }

      const result = await response.json();
      setMessage({ 
        type: "success", 
        text: isEditMode 
          ? `Service "${formData.title}" updated successfully!` 
          : `Service "${formData.title}" created successfully!`
      });
      
      // Redirect after success
      setTimeout(() => {
        if (confirm(`Service ${isEditMode ? 'updated' : 'created'}! Do you want to view it?`)) {
          router.push(`/services/${formData.slug}`);
        } else if (isEditMode) {
          router.push('/admin/manage-services');
        } else {
          // Reset form for next entry
          setFormData({
            title: "",
            slug: "",
            category: "",
            heading: "",
            subTitle: "",
            description: "",
            content: "",
            image: "",
            featured: false,
            features: "",
            benefits: "",
            keywords: "",
            order: 0,
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
        text: error.message || `Failed to ${isEditMode ? 'update' : 'create'} service. Make sure backend is running.` 
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
        }}
        onSubmit={handleImageModalSubmit}
        defaultValue={pendingImageFile ? pendingImageFile.name.split('.')[0].replace(/-|_/g, ' ') : ''}
      />
      
      <div className={styles.container}>
      <div className={styles.header}>
        <h1>{isEditMode ? 'Edit Service' : 'Add New Service'}</h1>
        <p>{isEditMode ? 'Update the service information below' : 'Create a new service that will appear on the services page and have its own detail page'}</p>
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
              Service Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Feasibility Studies"
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
                  placeholder="feasibility-studies"
                />
                <button 
                  type="button" 
                  onClick={generateSlug}
                  className={styles.slugButton}
                >
                  Generate
                </button>
              </div>
              <small>URL: /services/{formData.slug || "your-slug"}</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Market Research Services"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Short catchy heading"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subTitle">
              Subtitle <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              required
              placeholder="Brief description shown on card"
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
              placeholder="Longer description for SEO and hero section"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Content</h2>
          
          <div className={styles.formGroup}>
            <label>
              Service Content <span className={styles.required}>*</span>
            </label>
            
            {/* Rich Text Editor Toolbar */}
            <div className={styles.editorToolbar}>
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
                <button 
                  type="button" 
                  className={styles.toolbarBtn}
                  onClick={() => execCommand('removeFormat')}
                  title="Clear Formatting"
                >
                  ✕ Clear
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
            </small>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Features & Benefits</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="features">Features (one per line)</label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows="8"
              placeholder="Technical Feasibility Assessment&#10;Economic & Financial Analysis&#10;Market Research & Demand Analysis"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="benefits">Benefits (one per line)</label>
            <textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows="6"
              placeholder="Make informed decisions&#10;Identify risks early&#10;Validate market demand"
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
              placeholder="feasibility study, project viability, business analysis"
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
                <span>Featured Service</span>
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
            onClick={() => router.push(isEditMode ? "/admin/manage-services" : "/services")}
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
            {loading ? (isEditMode ? "Updating Service..." : "Creating Service...") : (isEditMode ? "Update Service" : "Create Service")}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddService;
