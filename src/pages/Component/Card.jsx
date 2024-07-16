import React from 'react';
// import './Card.css';
import Link from 'next/link';

const Card = (props) => {
  let url = 'https://www.researchers.me/wp-content/uploads/2023/08/Australian-Financial-Regulator.png';
  return (
    <div style={{ padding: '20px'}}>
      <div className="card">
        <img src={url} alt="" className="bgImg" />
        <div className="backgroundOverlay"></div>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
          <h2 className="cardHeading">Red Flags Raised Over Surging Silver Imports from Dubai via Gift City: Potential Revenue Losses and Trade Conflicts</h2>
          <Link className="button" href="/blogs">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
