// pages/yourPage.tsx
import { CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, ChangeEvent, useRef } from "react";
import { useStripe } from "@stripe/react-stripe-js";

const Pay = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const stripe = useStripe();

  const cvvInputRef = useRef<HTMLInputElement>(null);
  const expiryDateInputRef = useRef<HTMLInputElement>(null);

  const formatCardNumber = (input: string): void => {
    const numericValue: string = input.replace(/\D/g, "");
    const formattedValue: string = numericValue
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedValue);

    if (numericValue.length === 16) {
      cvvInputRef.current?.focus();
    }
  };

  const formatExpiryDate = (input: string): void => {
    const numericValue: string = input.replace(/\D/g, "");
    const formattedValue: string = numericValue
      .replace(/(\d{2})(\d{0,4})/, "$1 / $2")
      .trim();
    setExpiryDate(formattedValue);

    if (numericValue.length >= 4 && numericValue.length <= 7) {
      expiryDateInputRef.current?.focus();
    }
  };

  const formatCVV = (input: string): void => {
    const numericValue: string = input.replace(/\D/g, "");
    const formattedValue: string = numericValue.slice(0, 3);
    setCVV(formattedValue);

    if (formattedValue.length === 3) {
      expiryDateInputRef.current?.focus();
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const numericInput: string = e.target.value.replace(/\D/g, "");
    formatCardNumber(numericInput);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const numericInput: string = e.target.value.replace(/\D/g, "");
    formatExpiryDate(numericInput);
  };

  // this is to handle stripe
  const stripe_promise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  );

  const handleCVVChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const numericInput: string = e.target.value.replace(/\D/g, "");
    formatCVV(numericInput);
  };

  const handlepayment = async () => {
    console.log("we are about paying now ");

    if (!stripe) {
      console.log(
        "Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.",
      );
      return;
    }

    // const { token, error } = await stripe.createToken({
    //     {
    //     number: cardNumber,
    //     cvc: cvv,
    //     exp_month: parseInt(expiryDate.slice(0, 2), 10),
    //     exp_year: parseInt(expiryDate.slice(5), 10),
    //   } ,
    // });

    // if (error) {
    //   console.log(error.message);
    // } else {
    //   // Handle the token (e.g., send it to your server)
    //   console.log(token);
    // }
  };
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-[60%] z-[9999] flex justify-center items-center">
        <div className="w-[50vw] h-auto py-[3vw] rounded-[2vw] bg-[#111111] flex flex-col gap-[2vw] px-[2.5vw]">
          <h2 className="neuer text-white text-[1.5vw] ">Add Card Details</h2>

          {/* for the name on card  */}
          <div className="w-full h-auto flex justify-center items-start gap-[0.6vw]  flex-col ">
            <label
              htmlFor=""
              className="text-white text-opacity-[40%] neuer text-[0.9vw] pl-[0.1vw]"
            >
              Name on card
            </label>
            <input
              type="text"
              placeholder="Enter card name"
              name="cardNumber"
              id="cardNumber"
              autoComplete="name"
              className="w-full h-[3.8vw] bg-transparent text-[1.2vw]  text-white placeholder:text-white placeholder:text-opacity-[60%] border-white border-opacity-[50%] duration-[1s] transition focus:border-opacity-[100%] rounded-[1vw] px-[2vw] border-[0.1vw]"
            />
          </div>

          {/* for the name on card  */}
          <div className="w-full h-auto flex justify-center items-start gap-[0.6vw]  flex-col ">
            <label
              htmlFor=""
              className="text-white text-opacity-[40%] neuer text-[0.9vw] pl-[0.1vw]"
            >
              Card number
            </label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              name="cardNumber"
              id="cardNumber"
              autoComplete="cc-number"
              onChange={handleCardNumberChange}
              value={cardNumber}
              maxLength={19} // 16 digits + 3 spaces
              className="w-full h-[3.8vw] bg-transparent text-[1.2vw]  text-white placeholder:text-white placeholder:text-opacity-[45%] border-white border-opacity-[50%] duration-[1s] transition focus:border-opacity-[100%] rounded-[1vw] px-[2vw] border-[0.1vw]"
            />
          </div>

          {/* this is for the exp and date rol flex */}
          <div className="w-full h-auto flex gap-[2vw]">
            {/* now this is for the cvv*/}
            <div className="w-full h-auto flex justify-center items-start gap-[0.6vw]  flex-col ">
              <label
                htmlFor=""
                className="text-white text-opacity-[40%] neuer text-[0.9vw] pl-[0.1vw]"
              >
                CVV
              </label>
              <input
                type="text"
                placeholder="***"
                name="cardNumber"
                id="cardNumber"
                autoComplete="cc-number"
                value={cvv}
                onChange={handleCVVChange}
                maxLength={3}
                ref={cvvInputRef}
                className="w-full h-[3.8vw] bg-transparent text-[1.2vw]  text-white placeholder:text-white placeholder:text-opacity-[45%] border-white border-opacity-[50%] duration-[1s] transition focus:border-opacity-[100%] rounded-[1vw] px-[2vw] border-[0.1vw]"
              />
            </div>

            {/* now for the date exp */}
            <div className="w-full h-auto flex justify-center items-start gap-[0.6vw]  flex-col ">
              <label
                htmlFor=""
                className="text-white text-opacity-[40%] neuer text-[0.9vw] pl-[0.1vw]"
              >
                Expiry date
              </label>
              <input
                type="text"
                placeholder="MM / YYYY"
                name="cardNumber"
                id="cardNumber"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                autoComplete="cc-number"
                ref={expiryDateInputRef}
                maxLength={9} // MM/YYYY
                className="w-full h-[3.8vw] bg-transparent text-[1.2vw]  text-white placeholder:text-white placeholder:text-opacity-[45%] border-white border-opacity-[50%] duration-[1s] transition focus:border-opacity-[100%] rounded-[1vw] px-[2vw] border-[0.1vw]"
              />
            </div>
          </div>

          {/* now for the button */}
          <button
            className="w-full h-[3.4vw] bg-[#CCFF00] neuer text-black text-[1.3vw] hover:bg-opacity-[70%] flex justify-center items-center rounded-[1vw]"
            onClick={handlepayment}
          >
            Make payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Pay;
