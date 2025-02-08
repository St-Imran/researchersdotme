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
            <div className={style.flex}>
              <button>Explore Now</button>
              <button>Download <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg></button>
            </div>
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
