import style from "./Hero.module.css";
import Classess from "./page.module.css";
import Image from "next/image";
import Banner from "./banner";
import { useRouter } from "next/navigation";
import Cards from "./Cards";

function Hero() {
  const router = useRouter();
  return (
    <>
      <Banner />
      <section className={`${style.hero__wrapper} ${style.no__img}`}>
        <div className={Classess.container}>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className={style.text}>
                <h2 className="mb-4">
                  As a full-service agency, we provide qualitative and
                  quantitative research services worldwide.
                </h2>
                <p className="mb-4">
                  Through our well-trained professional researchers, we take the
                  task off your table. At Researchers, we operate a full-service
                  agency. We conduct the feasibility study with a thorough
                  market analysis and customer need using natural field data to
                  make a beneficial decision that propels your business ahead of
                  the competition.
                </p>
                <button onClick={() => router.push("/contact")}>
                  Become a Client{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <Cards />
              {/* <div className="row mt-5"> 
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className={style.single_feature_box}>
                    <div className={style.img_holder}>
                      <div className={style.inner}>
                        <Image
                          src="/Web-Banner-01.jpg"
                          width={363}
                          height={563}
                          alt="bottleneck image"
                        />
                      </div>
                      <div className={style.title}>
                        <h3>What are your present business bottlenecks?</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className={style.single_feature_box} data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className={style.img_holder}>
                      <div className={style.inner}>
                        <Image
                          src="/Web-Banner-02.jpg"
                          width={363}
                          height={563}
                          alt="bottleneck image"
                        />
                      </div>
                      <div className={style.title}>
                        <h3>Are you stuck in the middle of making a decision?</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className={style.single_feature_box} data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className={style.img_holder}>
                      <div className={style.inner}>
                        <Image
                          src="/Web-Banner-03.jpg"
                          width={363}
                          height={563}
                          alt="bottleneck image"
                        />
                      </div>
                      <div className={style.title}>
                        <h3>Want to discover why people aren't purchasing?</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col overflow-hidden"></div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row mb-5">
          <div className="col col-md-9">
            <h2 className="fs-1 mb-4 fw-bolder">
              Research With A Consultative Approach
            </h2>
            <p className="fw-semibold ">
              Today’s leaders are navigating an unprecedented, complex
              environment. Forrester Decisions represents a new option for
              business and technology leaders who need help solving problems,
              making decisions, and taking action to deliver results. Leaders
              who are looking to achieve break-out growth. Each research service
              includes:
            </p>
          </div>
        </div>
      </div>
      <section className={style.page_block}>
        <div className={style.page_block__bg_img}>
          <Image
            src="/one.webp"
            width={1440}
            className="featureImage"
            height={600}
            alt="section image"
          />
        </div>
        <div className={style.two_column_content}>
          <div className="container">
            <div className="align-items-start">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-9">
                    <h2 className={style.two_column__fwheader}>
                      Lorem, ipsum.
                    </h2>
                    <div className={style.two_column__body}>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi, repellat quam et a neque accusamus magnam
                        placeat, iste nostrum dolor iusto harum officiis alias
                        soluta in corrupti, earum quidem itaque.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className={style.two_column__subheading}>
                  Lorem, ipsum.
                </div>
                <h3 className={style.two_column__header}>
                  Lorem ipsum dolor sit.
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos quisquam veniam debitis sapiente dolore
                    doloremque voluptates voluptate, quia cumque minima.
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/establish-customer-experience/journey-mapping/"
                      target="_self"
                    >
                      <span>Get Your Free Report Today</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.two_column__subheading}>Lorem.</div>
                <h3 className={style.two_column__header}>
                  Lorem ipsum dolor sit.
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore nesciunt molestias vero fugiat illo impedit
                    perferendis dignissimos! Eveniet, iste voluptate?
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/b2b-marketing-planning/marketing-plan-on-a-page/"
                      target="_self"
                    >
                      <span>Access Exclusive Research </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.page_block}>
        <div className={style.page_block__bg_img}>
          <Image
            src="/two.webp"
            width={1440}
            className="featureImage"
            height={600}
            alt="section image"
          />
        </div>
        <div className={style.two_column_content}>
          <div className="container">
            <div className="align-items-start">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-9">
                    <h2 className={style.two_column__fwheader}>
                      Lorem ipsum dolor sit.
                    </h2>
                    <div className={style.two_column__body}>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Et suscipit accusamus aspernatur voluptates non officia,
                        ea vitae corporis adipisci iure expedita pariatur
                        veritatis cumque nemo asperiores quidem doloremque
                        architecto ducimus optio tenetur. Laborum, excepturi
                        placeat?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className={style.two_column__subheading}>E-book</div>
                <h3 className={style.two_column__header}>
                  Kickstart Your CX Transformation
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    This complimentary guide will show you how to leverage
                    customer journey maps to spur investment and interest in CX,
                    as well as boost performance.
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/establish-customer-experience/journey-mapping/"
                      target="_self"
                    >
                      <span>Trusted Research, Ready for You—Download Now!</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.two_column__subheading}>Template</div>
                <h3 className={style.two_column__header}>
                  The Six Elements Of A Meaningful Marketing Plan{" "}
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    Without the right inputs, a marketing annual plan may simply
                    be a list of tactics. Learn how to build a plan that drives
                    business value.
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/b2b-marketing-planning/marketing-plan-on-a-page/"
                      target="_self"
                    >
                      <span>Download Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.page_block}>
        <div className={style.page_block__bg_img}>
          <Image
            src="/three.webp"
            width={1440}
            className="featureImage"
            height={600}
            alt="section image"
          />
        </div>
        <div className={style.two_column_content}>
          <div className="container">
            <div className="align-items-start">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-9">
                    <h2 className={style.two_column__fwheader}>
                      Lorem-sum dolor sit.
                    </h2>
                    <div className={style.two_column__body}>
                      <p>
                        Et suscipit accusamus aspernatur voluptates non officia,
                        ea vitae corporis adipisci iure expedita pariatur
                        veritatis cumque nemo asperiores quidem doloremque
                        architecto ducimus optio tenetur. Laborum, excepturi
                        placeat?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className={style.two_column__subheading}>Evant</div>
                <h3 className={style.two_column__header}>
                  Kickstart Your CX Transformation Lorem, ipsum.
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    This complimentary guide will show you how to leverage
                    customer journey maps to spur investment and interest in CX,
                    as well as boost performance.
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/establish-customer-experience/journey-mapping/"
                      target="_self"
                    >
                      <span>Download Now</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.two_column__subheading}>Evant</div>
                <h3 className={style.two_column__header}>
                  The Six Elements Of A Meaningful Marketing Plan
                </h3>
                <div className={style.two_column__body}>
                  <p>
                    Without the right inputs, a marketing annual plan may simply
                    be a list of tactics. Learn how to build a plan that drives
                    business value.
                  </p>
                </div>
                <div className={style.forr_ctas}>
                  <div className={style.forr_ctas__row}>
                    <a
                      className={style.forr_cta}
                      href="/resources/b2b-marketing-planning/marketing-plan-on-a-page/"
                      target="_self"
                    >
                      <span>Download Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;
