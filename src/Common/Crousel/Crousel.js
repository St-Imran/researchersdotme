import styles from './Crousel.module.css'
import Image from 'next/image';

function Crousel({ imageUrls }) {
    return (
        <div className={styles.carousel}>
            {imageUrls.map((url, index) => (
                <div key={index} className={styles['carousel-item']}>
                    <Image src={url} alt={`Carousel item ${index + 1}`} width={700} height={400} />
                </div>
            ))}
        </div>
    );
}

export default Crousel;
