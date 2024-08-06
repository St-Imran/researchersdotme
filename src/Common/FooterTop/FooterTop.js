import styles from './FooterTop.module.css'
function FooterTop(){
    return (
        <section className={styles.footer__top}>
            <div className={styles.form}>
                <h2>CONTACT US</h2>
                <form action="">
                    <input type="text" placeholder='Name' />
                    <input type="email" placeholder='Email' />
                    <input type="number" placeholder='Phone' />
                    <textarea name="message" placeholder='Message' cols="30" rows="5"></textarea>
                    <input type="submit" value={'Send'}/>
                </form>
            </div>
            <div className={styles.tech}>
                <h2>TECHNOLOGIES</h2>
                <nav>
                    <ul>
                        <li><a href="">Strategy & Consultation</a></li>
                        <li><a href="">UI/UX</a></li>
                        <li><a href="">Business Consultation & Implementaion</a></li>
                        <li><a href="">On Chain Ecosystem Consulting</a></li>
                        <li><a href="">Blockchain Infra Consulting</a></li>
                        <li><a href="">Asset Tokenization</a></li>
                        <li><a href="">DeFi Consultation</a></li>
                        <li><a href="">Web 3.0 Strategy & Consultation</a></li>
                        <li><a href="">Ideation</a></li>
                        <li><a href="">Tokenzation</a></li>
                        <li><a href="">Market Making</a></li>
                    </ul>
                </nav>
            </div>
            <div className={styles.service}>
                <h2></h2>
                <nav>
                    <ul>
                        <li><a href="">Feasibility Studies</a></li>
                        <li><a href="">Data Story Telling</a></li>
                        <li><a href="">Mystery Shopping</a></li>
                        <li><a href="">Customers Experience & Happiness</a></li>
                        <li><a href="">Employee Satisfaction & Engagement</a></li>
                    </ul>
                </nav>
            </div>
           
        </section>
    )
}
export default FooterTop;