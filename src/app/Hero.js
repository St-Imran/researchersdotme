import './Hero.css';

import Crousel from './Common/Crousel/Crousel';
function Hero() {
    const imageUrls = [
        '/img/crousel_image_1.jpeg',
        '/img/crousel_image_2.jpeg',
        '/img/crousel_image_3.jpeg'
    ];
    return (
        <>
            <section className="hero__wrapper">
                <div className='text'>
                    <h1>REMOVE GUESSWORK AND MAKE THE RIGHT DECISION</h1>
                    <p>Welcome To Researchers! We Help You Unlock Your Business Potentials Through Our <strong>"ProfitPulse"</strong> Approach, With Zero Data Pollution.</p>
                </div>
                <div className='frame'>
                    <Crousel  imageUrls={imageUrls}/>
                </div>
            </section>
            <section className="hero__wrapper no__img" style={{flexDirection:'column'}}>
                <div className='text' style={{width:'100%', textAlign:'center', margin:'50px auto'}}>
                    <h2>As a full-service agency, we provide qualitative and quantitative research services worldwide.</h2>
                    <p>Through our well-trained professional researchers, we take the task off your table. At Researchers, we operate a full-service agency. We conduct the feasibility study with a thorough market analysis and customer need using natural field data to make a beneficial decision that propels your business ahead of the competition.</p>
                </div>
                <div className='about_info_boxes' style={{width:'100%'}}>
                    <ul>
                        <li>What are your present business bottlenecks?</li>
                        <li>Are you stuck in the middle of making a decision?</li>
                        <li>Do you want to discover why people aren't purchasing your goods and services?</li>
                        <li>Are you interested in introducing a new service, product, or even marketing campaign but need clarification on what your target market wants?</li>
                    </ul>
                </div>
            </section>
        </>
    )
}
export default Hero;