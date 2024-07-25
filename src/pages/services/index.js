import { colors } from "@mui/material";
import React from "react";
import Image from 'next/image';
import InnerPage from './innerPages/index';

const styles = {
    main: {
        minHeight: '95vh',
    },
    bg: {
        backgroundImage: "url('/card1.webp')"
    },
    bg2: {
        backgroundImage: "url('/card2.webp')"
    },
    bg3: {
        backgroundImage: "url('/card3.webp')"
    },
    bg4: {
        backgroundImage: "url('/card3.webp')"
    },
    bg5: {
        backgroundImage: "url('/card2.webp')"
    },
    bg6: {
        backgroundImage: "url('/card1.webp')"
    },
    mxWidth: {
        maxWidth: '50px'
    }

}
const Services = () => {
    return (
        <>
            <InnerPage />
            <div style={styles.main}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center mb-5">
                            <h1 className="display-4 font-weight-bolder">Our Services</h1>
                            <p className="lead">Lorem ipsum dolor sit amet at enim hac integer volutpat maecenas pulvinar. </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg}>
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">Web Developmet Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg2}>
                            <Image className="card-img d-none" src="/card2.webp" width={600} height={900} alt="Picture" />
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">Creative Manner Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg3}>
                            <Image className="card-img d-none" src="/card3.webp" width={600} height={900} alt="Picture" />
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">Design Studio Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>

                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg4}>

                            <Image className="card-img d-none" src="/card3.webp" width={600} height={900} alt="Picture" />
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">UI/UX Design Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg5}>
                            <Image className="card-img d-none" src="/card2.webp" width={600} height={900} alt="Picture" />
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4"><div className="card text-dark card-has-bg click-col" style={styles.bg6}>
                            <Image className="card-img d-none" src="/card1.webp" width={600} height={900} alt="Picture" />
                            <div className="card-img-overlay d-flex flex-column">
                                <div className="card-body">
                                    <small className="card-meta mb-2">Thought Leadership</small>
                                    <h4 className="card-title mt-0 "><a className="text-dark" herf="https://creativemanner.com">Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                                    <small><i className="far fa-clock"></i> October 15, 2020</small>
                                </div>
                                <div className="card-footer">
                                    <div className="media">

                                        <a href="" className="media-body">
                                            <h6 className="my-0 text-dark d-block">
                                                View In Details
                                                <Image src='/link.svg' height={20} width={22} />
                                            </h6>
                                            <small>Our Services</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div></div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Services;
