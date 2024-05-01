import './Hero.css';
import Image from 'next/image';
import frameImage from './assets/img/fram4.webp';
function Hero() {
    return (
        <>
            <section className="hero__wrapper">
                <div className='text'>
                    <h1>REMOVE GUESSWORK AND MAKE THE RIGHT DECISION</h1>
                    <p>Welcome To Researchers! We Help You Unlock Your Business Potentials Through Our <strong>"ProfitPulse"</strong> Approach, With Zero Data Pollution.</p>
                </div>
                <div className='frame'>
                    <Image
                        src={frameImage}
                        alt="hero section right image"
                    />
                </div>
            </section>
        </>
    )
}
export default Hero;