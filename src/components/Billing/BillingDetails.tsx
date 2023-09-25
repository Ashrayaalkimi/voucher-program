"use client";
import React, { useState, useEffect } from "react";
import PaymentMethod from "../SelectPayment/PaymentMethod";
import Email from "./Email";
import Web3 from "web3";
import OrderDetails from "./OrderDetails";
import { useRouter } from "next/navigation";

const BillingDetails = () => {
  const router = useRouter();
  const [emailId, setEmailId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");
  const [totalPrice, setTotalPrice] = useState(0);
  const [NametoPass, setNametoPass] = useState("");
  const [CurrencytoPass, setCurrencytoPass] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [session_id, setSessionId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [web3, setWeb3] = useState<Web3 | null>(null); // Initialize web3 as null

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const ethereum = (window as any).ethereum; // Use any type to access ethereum
      if (ethereum) {
        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);
      } else {
        console.error("MetaMask or similar Ethereum wallet is not available.");
      }
    }
  }, []);

  // const web3 = new Web3(window.ethereum);
  // const web3 = window.ethereum ? new Web3(window.ethereum) : null;

  if (!web3) {
    console.error(
      "Web3 is not available. Please install MetaMask or a similar Ethereum wallet."
    );
    return null;
  }

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
      return;
    }

    if (!emailId) {
      setEmailError("Enter your email to proceed with payment");
    }
    // if (!couponCode) {
    //   setEmailError("Enter the affiliate code to proceed");
    //   return;
    // }

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
              name: NametoPass,
              amount: totalPrice,
              currency: CurrencytoPass,
              quantity: 1,
              mode: "payment",
              success_url:
                // `http://localhost:3000/payment-success?emailId=${emailId}`,
                `https://voucher-project.netlify.app/payment-success?emailId=${emailId}`,
              cancel_url: "https://voucher-project.netlify.app/payment-failure",
              email_id: emailId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Stripe Checkout Session URL");
        }
        setEmailId(emailId);
        const data = await response.json();
        setSessionId(data.session_id);
        console.log("session id stored is - ", data.session_id);
        // Store session_id in local storage
        localStorage.setItem("session_id", data.session_id);
        window.location.href = data.url;

        // router.push(`/payment-success?session_id=${sessionId}&emailId=${emailId}`);
        // window.location.href = `http://localhost:3000/payment-success?session_id=${sessionData.session_id}`;
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else if (selectedPaymentMethod === "metamask") {
      try {
        const exchangeRate = await fetchExchangeRate();
        console.log("Exchange Rate", exchangeRate);
        const amountInETH = totalPrice / exchangeRate;
        console.log("TotalPrice", totalPrice);
        console.log("Amount in etherum", amountInETH);
        const amountInWei = web3.utils.toWei(amountInETH.toString(), "ether");
        console.log("Amount in wei", amountInWei);
        const transactionObject = {
          from: userAddress,
          to: "0x45a2b69C21b11a7e00a26eD19A1582342911EfE6", // Replace with the recipient's Ethereum address
          value: amountInWei, // Amount in wei
        };

        const response = await web3.eth.sendTransaction(transactionObject);
        console.log("Transaction sent with hash:", response.transactionHash);
        const txHash = response.transactionHash;
        // localStorage.setItem("txHash", txHash);
        
        router.push(
          `https://voucher-project.netlify.app/payment-success?emailId=${emailId}&txHash=${txHash}`
          // `http://localhost:3000/payment-success?emailId=${emailId}&txHash=${txHash}`
        );
        // console.log("Transaction sent with hash:", txHash);
      } catch (error) {
        console.error("Error processing payment:", error);
        // router.push("https://voucher-project.netlify.app/payment-failure");
      }
    }
  };
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
        <OrderDetails
          setTotalPrice={setTotalPrice}
          setNametoPass={setNametoPass}
          setCurrencytoPass={setCurrencytoPass}
        />
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

export default BillingDetails;
