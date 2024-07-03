import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";



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
