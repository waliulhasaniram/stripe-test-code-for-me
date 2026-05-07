import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.log(error.message);
      return;
    }

    const product = {
      name: "T-shirt",
      price: 20,
    };

    const response = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        product,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error:", errorText);
      return;
    }

    // Check if the response actually has a body before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Success:", data);
    } else {
      const text = await response.text();
      console.log("Received non-JSON response:", text);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
