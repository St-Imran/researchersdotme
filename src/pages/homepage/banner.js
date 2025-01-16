import style from "./Hero.module.css";
import { styles } from "../../styles/Hero.styles";
import Classess from "./page.module.css";
import Image from "next/image";

function Banner() {
  return (
    <section style={styles.gradiant2}>
      <div className={Classess.container}>
        <div className={style.hero__wrapper}>
          <div className={style.text}>
            <h1 style={styles.headingColor}>
              REMOVE THE GUESSWORK AND MAKE THE RIGHT DECISION
            </h1>
            <p>
              Welcome To Researchers! We Help You Unlock Your Business
              Potentials Through Our <b>"ProfitPulse"</b> Approach, With Zero
              Data Pollution.
            </p>
            <button>Explore Now</button>
          </div>
          <div className={style.frame}>
            <Image
              src="/guessWork.png"
              width={400}
              height={400}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
