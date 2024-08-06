import React from 'react';
import Slider from 'react-slick';
import styles from './HomeCrousel.module.css';
import Image from 'next/image';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    draggable: true,
    customPaging: (i) => (
      <div className={styles.customDot}>
        <Image 
          src={`/image${i + 1}.jpeg`} 
          width={50} 
          height={50} 
          alt={`indicator ${i + 1}`} 
          style={{ width: 'auto', height: '100%' }} // Maintain aspect ratio
        />
      </div>
    ),
  };

  const slides = [
    { id: 1, content: 'Slide 1 Content' },
    { id: 2, content: 'Slide 2 Content' },
    { id: 3, content: 'Slide 3 Content' },
    { id: 4, content: 'Slide 4 Content' },
  ];

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <h3>{slide.content}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
