import { useState, useEffect, useRef } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragTranslate, setDragTranslate] = useState(0);
  const thumbnailRef = useRef(null);
  
  const thumbnailWidth = 210; // Width of one thumbnail (including margin)

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    scrollThumbnails(index);
  };

  const scrollThumbnails = (index) => {
    const maxScroll = -(images.length - 1) * thumbnailWidth;
    const newTranslate = Math.max(Math.min(0, -(index * thumbnailWidth)), maxScroll); // Keep within bounds
    setDragTranslate(newTranslate);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dragMove = e.clientX - dragStart;
      const newTranslate = dragTranslate + dragMove;
      if (thumbnailRef.current) {
        thumbnailRef.current.style.transform = `translateX(${newTranslate}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const index = Math.round(-dragTranslate / thumbnailWidth);
    goToSlide(index); // Snap to the closest thumbnail
  };

  return (
    <div className="carousel" 
         onMouseLeave={handleMouseUp} // End dragging when leaving the carousel
         onMouseMove={isDragging ? handleMouseMove : undefined} // Only handle mouse move if dragging
    >
      {/* Main Image */}
      <div className="main-image">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>

      {/* Navigation Arrows */}
      <button className="prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="next" onClick={goToNext}>
        &#10095;
      </button>

      {/* Draggable Thumbnails */}
      <div
        className={`thumbnails ${isDragging ? 'grabbing' : ''}`}
        ref={thumbnailRef}
        onMouseDown={handleMouseDown} // Start dragging on mouse down
        onMouseUp={handleMouseUp} // Stop dragging on mouse up
        style={{ cursor: isDragging ? 'grabbing' : 'grab', transition: 'none' }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)} // Change image on click
          >
            <img src={image} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .carousel {
          position: relative;
          max-width: 100%;
        }

        .main-image img {
          width: 100%;
          height: auto;
        }

        .prev, .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
        }

        .prev {
          left: 0;
        }

        .next {
          right: 0;
        }

        .thumbnails {
          display: flex;
          margin-top: 15px;
          overflow: hidden; /* Prevent overflow when dragging */
        }

        .thumbnail {
          margin: 0 5px;
          cursor: pointer;
        }

        .thumbnail img {
          width: 200px;
          height: 105px;
          object-fit: cover;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .thumbnail.active img {
          opacity: 1;
          border: 2px solid #000;
        }

        .thumbnail:hover img {
          opacity: 1;
        }

        .thumbnails.grabbing {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
