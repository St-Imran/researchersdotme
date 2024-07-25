import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

const InnerPage = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <div className="container-fluid px-5">
            <div className="row">
                <div className="col-md-8 m-auto text-center my-5 py-5">
                    <h1 className="display-4 font-weight-bolder text-center">WHAT WE DO?</h1>
                    <p className="lead text-dark">We would like to take this opportunity to welcome you to Researchers, where we specialize in providing companies with complete feasibility studies, notably in the fields of web3 and other novel start-ups. It is vital for businesses to conduct feasibility studies in order to evaluate the viability of their initiatives and determine whether or not it is worthwhile to pursue them. To gain a better understanding of the current trends in the industry and to evaluate the potential of your project, the knowledgeable members of our team carry out exhaustive market research and data analysis.</p>
                </div>
            </div>
            <div className="row">
                <div className="col text-justify my-5 py-5 px-4">
                    <h1 className="display-4 font-weight-bolder">OUR EXPERTISE</h1>
                    <p className="lead text-dark">We are aware that companies just starting out in the web3 arena confront a distinct set of obstacles, which calls for an all-encompassing method of conducting feasibility studies. Because of our team's significant knowledge and experience in the web3 and start-up arena, we are able to assist you in navigating this intricate environment. We go above and beyond what is typically involved in feasibility studies in order to present you with an all-encompassing view of the potential of your project. In order to assist you in making well-informed decisions regarding your project, our data-driven strategy integrates market research, media planning, and digital marketing.</p>
                </div>
            </div>
            <section class="container-fluid py-4 py-md-5 my-sm-3 my-md-0">
                <div class="row row-cols-1 row-cols-md-2 g-0 overflow-hidden rounded-5">

                    <div class="col position-relative">
                        <div class="ratio ratio-4x3"></div>
                        <img src="/service1.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" alt="Image" />
                        <div class="position-absolute start-0 bottom-0 d-flex align-items-end w-100 h-100 z-2 p-4">
                            <a class="btn btn-lg btn-light rounded-pill m-md-2" href="https://www.youtube.com/watch?v=X7lCwxswYnE" data-glightbox="" data-gallery="video1">
                                Professionalism
                            </a>
                        </div>
                    </div>

                    <div class="col bg-dark py-5 px-4 px-xl-5" data-bs-theme="dark">
                        <div class="text-light">
                            <h1>Dedication And Professionalism</h1>
                            <p class="text-body pb-sm-2 pb-lg-0 mb-4 mb-lg-5">Our staff is dedicated to delivering the insights and information you require to achieve your goals in a timely manner. We design individualized strategies in close collaboration with our customers in order to better comprehend their objectives and provide for their particular requirements. There are a lot of advantages to cooperating with our company. Because of our extensive knowledge and experience in the startup and web3 industries, you can rest assured that the findings of your feasibility study will be accurate and pertinent to your business. In addition, the data-driven approach that we use assures that you will receive information and insights that are rich in data, which will assist you in making decisions that are informed regarding your project.</p>

                            <a class="btn btn-lg btn-outline-light rounded-pill" href="#!">Learn more</a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container-fluid pt-5 pb-5 mt-md-4 mt-xl-5 mb-xxl-3">
                <h2 class="h1 text-center pt-xxl-3 mx-auto mb-2" style={{ maxWidth: '620px' }}>
                    Design that inspires a better way to work
                </h2>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 ps-md-3 ps-lg-4 ps-xxl-5">
                            <h3 class="mb-4">Commitment And Results</h3>
                            <p>In summing up, Researchers is your one-stop solution for doing all-encompassing feasibility studies. We have the knowledge and experience to assist you in achieving success, regardless of whether you are a startup operating in the web3 domain or any other breakthrough technology.</p>
                            <hr class="my-lg-5" />
                            <span class="h6 pt-1 mb-0">Get in touch with us right now to find out more about the ways in which we can assist you in achieving your objectives.</span>
                        </div>
                    </div>
                </div>

                <h2 class="h1 text-center pt-xxl-3 mx-auto mb-2" style={{ maxWidth: '620px' }}>
                    Feasibility Studies Overview
                </h2>
                <p>Ever wondered how ideas transform into successful business projects? Feasibility studies hold the key, unraveling the practicality, economics, and logistics that pave the way for turning concepts into reality.They are conducted to assess the viability of a proposed project, idea, or initiative. They help decision-makers determine whether a project is worth pursuing or not.But that’s not all – there’s a variety of feasibility study types, each uncovering a unique facet of the project’s potential.”</p>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7 order-md-2">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 order-md-1">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 pe-md-3 pe-lg-4 pe-xxl-5">
                            <h3 class="mb-4">Technical Feasibility</h3>
                            <p>Diving into the heart of innovation lies a crucial element – technical feasibility.Imagine uncovering whether the technology needed for your project is not just within reach, but perfectly aligned with your vision.Meanwhile, that’s just the tip of the iceberg. Delving deeper, this type of feasibility study also peels back the layers to evaluate the prowess of your team.Get ready to unearth the secrets behind the tech and talent that can make or break your project!</p>
                            <hr class="my-lg-3" />
                            <p>Example?</p>
                            <p class="fs-base h6 pt-1 mb-0">Determining if a new software system can be developed given the existing infrastructure and resources.</p>

                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 ps-md-3 ps-lg-4 ps-xxl-5">
                            <h3 class="mb-4">Economic Feasibility</h3>
                            <p>Picture this: a realm where ideas are not just sparks of creativity, but also heaps of profit.</p>
                            <p>Economic feasibility is your secret passage to this realm, where the dance of numbers reveals whether your project is a golden opportunity or a fleeting mirage. Brace yourself for a journey of cost calculations, revenue forecasts, and ROI evaluation.</p>
                            <hr class="my-lg-5" />
                            <p>Perfect Example?</p>
                            <span class="h6 pt-1 mb-0">Analyzing whether opening a new branch of a restaurant chain in a certain location will generate enough profit to justify the initial investment.</span>
                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7 order-md-2">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 order-md-1">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 pe-md-3 pe-lg-4 pe-xxl-5">
                            <h3 class="mb-4">Operational Feasibility</h3>
                            <p>From concept to synergy, Operational Feasibility unfolds the tale. It helps you  discover how your project synchronize with the organization’s pulse,Operational feasibility examines whether a project aligns with the organization’s existing processes, systems, and human resources. It assesses how well the project can be integrated into the daily operations.</p>
                            <hr class="my-lg-3" />
                            <p>Example:</p>
                            <p class="h6 pt-1 mb-0">Determining whether implementing a new project management software will be smoothly adopted by the project teams and improve overall efficiency.</p>

                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 ps-md-3 ps-lg-4 ps-xxl-5">
                            <h3 class="mb-4">Legal and Regulatory Feasibility</h3>
                            <p>This  is the lantern that lights your path, revealing whether your project can gracefully waltz within the legal confines or stumble upon hidden obstacles.</p>
                            <p>It’s the realm where feasibility meets legality, promising to uncover the secrets that could either thwart or champion your project’s ambitions.</p>
                            <hr class="my-lg-5" />
                            <p>And a perfect example is:</p>
                            <span class="h6 pt-1 mb-0">evaluating whether a proposed pharmaceutical product complies with health and safety regulations before it can be manufactured and marketed.</span>
                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7 order-md-2">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 order-md-1">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 pe-md-3 pe-lg-4 pe-xxl-5">
                            <h3 class="mb-4">Market Feasibility</h3>
                            <p>From concept to synergy, Operational Feasibility unfolds the tale. It helps you  discover how your project synchronize with the organization’s pulse,Operational feasibility examines whether a project aligns with the organization’s existing processes, systems, and human resources. It assesses how well the project can be integrated into the daily operations.</p>
                            <hr class="my-lg-3" />
                            <p>Example:</p>
                            <p class="h6 pt-1 mb-0">Determining whether implementing a new project management software will be smoothly adopted by the project teams and improve overall efficiency.</p>

                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5">
                    <div class="col-md-6 col-lg-7">
                        <div class="position-relative h-100">
                            <div class="ratio ratio-16x9"></div>
                            <img src="/service2.jpg" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-5" alt="Image" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5">
                        <div class="pt-4 py-md-5 my-lg-3 my-xl-4 my-xxl-5 ps-md-3 ps-lg-4 ps-xxl-5">
                            <h3 class="mb-4">Financial Feasibility</h3>
                            <p>Step into the treasury of possibility, where dreams and digits intertwine. Financial feasibility focuses specifically on the financial aspects of the project, including costs, revenue projections, and funding sources. Financial Feasibility; the alchemist’s workshop of projects, unlocks the vault that safeguards your aspirations. But it’s not just about numbers – it’s a symphony of costs and revenue, an art of projections that paint the canvas of potential</p>
                            <hr class="my-lg-5" />
                            <p>Example:</p>
                            <span class="h6 pt-1 mb-0">Assessing whether a startup business idea is financially viable by estimating startup costs, operational expenses, and potential revenue streams.</span>
                            <span class="h6 pt-1 mb-0">In other words, feasibility studies often consider multiple types of feasibility to provide a comprehensive evaluation of a project’s viability. The specific types of feasibility to be assessed depend on the nature of the project and the industry it belongs to.</span>
                        </div>
                    </div>
                </div>
                <div class="row py-4 py-lg-5 justify-content-center">
                    <div class="col-md-8">
                        <Accordion
                            expanded={expanded}
                            onChange={handleExpansion}
                            slots={{ transition: Fade }}
                            slotProps={{ transition: { timeout: 400 } }}
                            sx={{
                                '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>1.	What is Researchers, and how can it help my business?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Researchers specializes in providing comprehensive feasibility studies, especially for web3 startups and innovative projects. We offer market research, data analysis, and consulting services to help you determine whether your project is viable and worth pursuing.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography>2.	Why should I consider conducting a feasibility study before starting my project?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Feasibility studies help you assess the practicality, economics, and logistics of your project. They provide valuable insights that prevent costly mistakes and increase your chances of success by showing if a project is worth pursuing.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <Typography>3.	What makes Researchers worthy to work with web3 and startup firms?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Our team has extensive experience and expertise in web3 technologies and startup environments. They understand the unique challenges these sectors face and provide tailored feasibility studies that go beyond standard practices to help you navigate these complexities.</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4-content"
                                id="panel4-header"
                            >
                                <Typography>4.	How does Researchers ensure their feasibility studies are reliable and relevant?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Researchers employs a data-driven approach. We combine our industry knowledge with individualized strategies to deliver precise and pertinent insights. We collaborate closely with you to understand your specific goals and needs.</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel5-content"
                                id="panel5-header"
                            >
                                <Typography>5.	What types of feasibility studies does Researchers offer?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p>Researchers conducts various feasibility studies, we list some of them with an example to give you an idea of how best we can serve you:</p>
                                    <ul>
                                        <li><b>Technical Feasibility:</b> Checks if your current IT infrastructure can support a new software system.</li>
                                        <li><b>Economic Feasibility:</b> Assesses if opening a new restaurant branch will generate enough profit to cover the investment.</li>
                                        <li><b>Operational Feasibility:</b> Evaluates whether new project management software will be smoothly adopted by your team.</li>
                                        <li><b>Legal and Regulatory Feasibility:</b> Determines if a new pharmaceutical product meets health regulations before production.</li>
                                        <li><b>Market Feasibility:</b>Examines market conditions and potential customer acceptance.</li>
                                        <li><b>Financial Feasibility:</b> Estimates the costs and potential revenues of a startup to see if it’s financially viable.</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div class="row py-4 py-lg-5 justify-content-center">
                    <div class="col-md-8 text-center">
                        <h2>Identify viable growth opportunities for your Business</h2>
                        <p>Let us assist you optimize marketing campaigns by leveraging consumer insights and savor higher conversion rates and.</p>
                        <button class="btn btn-primary">BECOME A CLIENT</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InnerPage;
