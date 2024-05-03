import './Crousel.css'
import Image from 'next/image';

function Crousel({ imageUrls }) {
    return (
        <div className="carousel">
            {imageUrls.map((url, index) => (
                <div key={index} className="carousel-item">
                    <Image src={url} alt={`Carousel item ${index + 1}`} width={700} height={400} />
                </div>
            ))}
        </div>
    );
}

export default Crousel;
