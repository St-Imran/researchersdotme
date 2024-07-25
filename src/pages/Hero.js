// import Crousel from '@/Common/Crousel/Crousel';
import style from './Hero.module.css';
import { styles } from './Hero.styles';
import Classess from './page.module.css';
import Image from 'next/image';

function Hero() {
    // const imageUrls = [
    //     '/img/crousel_image_1.jpeg',
    //     '/img/crousel_image_2.jpeg',
    //     '/img/crousel_image_3.jpeg'
    // ];


    return (
        <>
            <section style={styles.gradiant2}>
                <div className={Classess.container}>
                    <div className={style.hero__wrapper}>
                        <div className={style.text} >
                            <h1 style={styles.headingColor}>REMOVE THE GUESSWORK AND MAKE THE RIGHT DECISION</h1>
                            <p>Welcome To Researchers! We Help You Unlock Your Business Potentials Through Our <b>"ProfitPulse"</b> Approach, With Zero Data Pollution.</p>
                            <button>Sign Up</button>
                        </div>
                        <div className={style.frame}>
                            <Image src='/guessWork.png' width={400}
                                height={400}
                                alt="Picture of the author" />
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${style.hero__wrapper} ${style.no__img}`}>
                <div className={Classess.container}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className={style.text}>
                                <h2 className='mb-4'>As a full-service agency, we provide qualitative and quantitative research services worldwide.</h2>
                                <p className='mb-4'>Through our well-trained professional researchers, we take the task off your table. At Researchers, we operate a full-service agency. We conduct the feasibility study with a thorough market analysis and customer need using natural field data to make a beneficial decision that propels your business ahead of the competition.</p>
                                <button>Schedule a Demo</button>
                            </div>
                            <div className={style.about_info_boxes}>
                                <ul className='mt-5'>
                                    <li><div>What are your present business bottlenecks?</div></li>
                                    <li><div>Are you stuck in the middle of making a decision?</div></li>
                                    <li><div>Do you want to discover why people aren't purchasing your goods and services?</div></li>
                                    <li><div>Are you interested in introducing a new service, product, or even marketing campaign but need clarification on what your target market wants?</div></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Hero;