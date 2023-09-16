"use client";
import React, { useState } from "react";
import PaymentMethod from "../SelectPayment/PaymentMethod";
import Email from "./Email";
import Neworderdetails from "./Neworderdetails";

const BillingDetails = () => {
  const [emailId, setEmailId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [session_id, setSessionId] = useState("");
  const [userAddress, setUserAddress] = useState('');
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("Response of exchange rate", data);

      if (data && data.ethereum && data.ethereum.usd) {
        return data.ethereum.usd;
      } else {
        throw new Error("Unable to fetch exchange rate.");
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (totalPrice === 0) {
      setPaymentError("You cannot pay zero money");
      return; // Don't proceed with payment if the total price is zero
    }
    if (!emailId) {
      setEmailError("Enter your email to proceed with payment");
    }
    if (selectedPaymentMethod === "creditCard") {
      try {
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
        setSessionId(sessionData.session_id);
        console.log("sessioid stored is - ", sessionData.session_id);
        window.location.href = sessionData.url;
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else if (selectedPaymentMethod === "metamask") {
      try {
        const exchangeRate = await fetchExchangeRate();
        const amountInETH = totalPrice / exchangeRate;
        const transactionObject = {
          // from: "0x45a2b69C21b11a7e00a26eD19A1582342911EfE6",
          from:userAddress,
          to: "0x45a2b69C21b11a7e00a26eD19A1582342911EfE6", // Replace with the recipient's Ethereum address
          value: amountInETH, // Amount in ETH
        };
        // Send the transaction using MetaMask
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionObject],
        });
        console.log("Transaction sent with hash:", txHash);

        // Store the email address for later use
        // ...

        // Redirect to a success page
        // ...
      } catch (error) {
        console.error("Error processing payment:", error);
        // console.log("payment with metamsk");
        // let params = [
        //   {
        //     from: "0x45a2b69C21b11a7e00a26eD19A1582342911EfE6",
        //     to: "0x45a2b69C21b11a7e00a26eD19A1582342911EfE6",
        //     gas: Number(21000).toString(16),
        //     gasPrice: Number(2500000).toString(16),
        //     value: Number(1000000000000000).toString(16),
        //   },
        // ];

        // let result = await window.ethereum
        //   .request({ method: "eth_sendTransaction", params })
        //   .catch((err: any) => {
        //     console.log(err);
        //   });
      }
      // Need to handle Paypal and Metamask here
    }
    return (
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
        <div className="flex flex-col gap-12">
          <Email setEmailId={setEmailId} />
          <PaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setUserAddress={setUserAddress}
          />
        </div>
        <div className="flex flex-col gap-6 max-w-lg">
          {/* <OrderDetails setTotalPrice={setTotalPrice} /> */}
          <Neworderdetails setTotalPrice={setTotalPrice} />
          <div className="flex flex-col gap-4 justify-center">
            {paymentError && (
              <p className="text-red-500 text-sm">{paymentError}</p>
            )}
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            <button
              onClick={handlePayment}
              className="text-black w-full block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl"
            >
              Proceed to payment
            </button>

            <p className="text-sm font-normal opacity-50 text-center">
              We protect your payment information using encryption to provide
              bank-level security.
            </p>
          </div>
        </div>
      </div>
    );
  };
};

export default BillingDetails;
