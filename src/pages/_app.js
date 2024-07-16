import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import './Component/Card.css'



export default function Home(props) {
  const { Component } = props;
  return (
    <>
      <Header />
      <div style={{ paddingTop: '85px' }}>
        <Component />
      </div>
      <Footer />
    </>
  );
} 
