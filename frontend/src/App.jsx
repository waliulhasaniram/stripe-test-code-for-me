//import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  // const [product, setProduct] = useState({
  //   name: "T-shirt",
  //   price: 20,
  //   productBy: "facebook",
  // });

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Stripe payment</h1>
        </div>
        <StripeCheckout stripeKey="" token="" name="by react">
            <button className="btn">Buy now</button>
        </StripeCheckout>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
