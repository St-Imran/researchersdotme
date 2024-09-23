import { useState, useEffect, useRef } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
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
    const scrollAmount = index * thumbnailWidth;
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
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
    if (thumbnailRef.current) {
      setScrollStart(thumbnailRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && thumbnailRef.current) {
      const dragMove = dragStart - e.clientX;
      thumbnailRef.current.scrollLeft = scrollStart + dragMove;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="carousel"
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
        className={`thumbnails ${isDragging ? "grabbing" : ""}`}
        ref={thumbnailRef}
        onMouseDown={handleMouseDown} // Start dragging on mouse down
        onMouseUp={handleMouseUp} // Stop dragging on mouse up
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          overflowX: "hidden",
        }}
      >
        <div className="thumbnail-container" style={{ display: "flex" }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${currentIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)} // Change image on click
              draggable="false"
            >
              <img src={image} alt={`Thumbnail ${index}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel {
          position: relative;
          max-width: 100%;
        }

        .main-image img {
          width: 100%;
          height: 550px;
        }

        .prev,
        .next {
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
          overflow-x: hidden;
          transition: all 0.4s ease;
        }

        .thumbnail-container {
          display: flex;
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
          pointer-events: none;
          user-select: none;
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
