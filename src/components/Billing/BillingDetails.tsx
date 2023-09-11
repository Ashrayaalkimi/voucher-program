"use client";
import React, { useState } from "react";
import BillingEmail from "./BillingEmail";
import OrderDetails from "./OrderDetails";
import PaymentMethod from "../SelectPayment/PaymentMethod";
import CustomAlertBox from "@/common/CustomAlert";

const BillingDetails = () => {
  const [emailId, setEmailId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // const [emailEntered, setEmailEntered] = useState(false);
  // const [showAlert, setShowAlert] = useState(false); 
  // const handleEmailChange = (email: string) => {
  //   setEmailId(email);
  //   console.log("Email received in parent component:", email);
  // };
  // const setEmail = (emailValue : any) => {
  //   setEmailId(emailValue);
  //   console.log("Email received in parent component:", emailValue);
  // };

  const handlePayment = async () => {
    // Check if email is entered
    // if (!emailEntered) {
    //   // setShowAlert(true); 
    //   alert("You must enter an email address to proceed with payment.");
    //   return; // Prevent further execution
    // }

    // Check if credit/debit card is selected
    if (selectedPaymentMethod === "creditCard") {
      try {
        // Fetching Stripe Checkout Session URL from backend
        const response = await fetch(
          "https://alkimi-payment-gateway-dev-xsm5l.ondigitalocean.app/payment/product-checkout-session/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Name",
              amount: totalPrice,
              currency: "inr",
              quantity: 1,
              mode: "payment",
              success_url:
                "https://voucher-project.netlify.app/payment-success",
              cancel_url: "https://voucher-project.netlify.app/payment-failure",
              email_id: emailId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Stripe Checkout Session URL");
        }

        const sessionData = await response.json();
        window.location.href = sessionData.url;
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else {
      // Need to handle Paypal and Metamask here
    }
  };
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
      <div className="flex flex-col gap-12">
        <BillingEmail
          setEmailId={setEmailId}
          // onEmailEnter={() => setEmailEntered(true)}
        />
        <PaymentMethod
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </div>

      <div className="flex flex-col gap-6 max-w-lg">
        <OrderDetails setTotalPrice={setTotalPrice} />
        <div className="flex flex-col gap-4 justify-center">
          <button
            onClick={handlePayment}
            className="text-black w-full block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl"
          >
            Pay {totalPrice}
          </button>
          <p className="text-sm font-normal opacity-50 text-center">
            We protect your payment information using encryption to provide
            bank-level security.
          </p>
        </div>
      </div>

      {/* {showAlert && (
        <CustomAlertBox
          message="You must enter an email address to proceed with payment."
          onClose={() => setShowAlert(false)} // Close the alert box
        />
      )} */}
    </div>
  );
};

export default BillingDetails;
