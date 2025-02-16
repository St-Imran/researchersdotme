import styles from './Cards.module.css';

export default function Cards() {
    return (
        <div className={styles.cardsContainer}>
            <div className={styles.card}>
                <img src="/Web-Banner-01.jpg" alt="Market Expert Firm" className={styles.image} />
                <div className={styles.content}>
                    <h3 className={styles.h3} style={{ color: '#9fe78b' }} ><b style={{ color: '#c7ff9e' }}>5 Ways</b> a <b style={{ color: '#c7ff9e' }}>Market Expert Firm</b> Can Maximize Your Business Profitability in the <b style={{ color: '#c7ff9e' }}>GCC</b></h3>
                    <a className={styles.Cardbutton}>MAXIMISE YOUR GCC PROFITS</a>
                </div>
            </div>

            <div className={styles.card}>
                <img src="/Web-Banner-02.jpg" alt="Key Strategies for MENA" className={styles.image} />
                <div className={styles.content} >
                    <h3 className={styles.h3} style={{ color: '#917d70' }}><b style={{ color: '#7c5b4a' }}>Key Strategies</b> for Breaking into <b style={{ color: '#7c5b4a' }}>MENA's Competitive Markets</b></h3>
                    <a className={styles.Cardbutton}>LEARN YOUR GROWTH CHECKLIST</a>
                </div>
            </div>

            <div className={styles.card}>
                <img src="/Web-Banner-03.jpg" alt="Data-Backed Guide" className={styles.image} />
                <div className={styles.content}>
                    <h3 className={styles.h3} style={{ color: '#6b7682' }}>A Data-Backed <b style={{ color: '#313f50' }}>Guide</b> to <b style={{ color: '#313f50' }}>Emerging Investment</b> Spots in <b style={{ color: '#313f50' }}>the Gulf</b></h3>
                    <a className={styles.Cardbutton}>ACCESS THE GUIDE NOW</a>
                </div>
            </div>
        </div>
    );
}