"use client";
import React, { useState, useEffect } from "react";
import PaymentMethod from "../SelectPayment/PaymentMethod";
import Email from "./Email";
import Web3 from "web3";
import OrderDetails from "./OrderDetails";
import { useRouter } from "next/navigation";
import contractABI from "./abi.json";
import { checkOutSession, getCoinDetails } from "@/service";
import { CheckoutDetails } from "@/types";

const BillingDetails = () => {
  const router = useRouter();
  const [emailId, setEmailId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");
  const [selectedTokenType, setSelectedTokenType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [NametoPass, setNametoPass] = useState("");
  const [CurrencytoPass, setCurrencytoPass] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [session_id, setSessionId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [web3, setWeb3] = useState<Web3 | null>(null); // Initialize web3 as null
  const [showError, setShowError] = useState("");
  const [storedDiscountCode, setStoredDiscountCode] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ethereum = (window as any).ethereum;
      setStoredDiscountCode(localStorage.getItem("discountCode"));
      if (ethereum) {
        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);
      } else {
        console.error("MetaMask or similar Ethereum wallet is not available.");
      }
    }
  }, []);

  if (!web3) {
    console.error(
      "Web3 is not available. Please install MetaMask or a similar Ethereum wallet."
    );
    return null;
  }

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether,ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      if (
        data &&
        data.ethereum &&
        data.tether &&
        data.ethereum.usd &&
        data.tether.usd
      ) {
        const ethereum_amount = data.ethereum.usd;
        const tether_amount = data.tether.usd;

        return { ethereum_amount, tether_amount };
      } else {
        throw new Error("Unable to fetch exchange rate.");
      }
    } catch (error: any) {
      console.error("Error fetching exchange rate:", error);
      setShowError(error.status);
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
      return;
    }
    const storedDiscountCode = sessionStorage.getItem("discountCode");
    if (storedDiscountCode === null) {
      setPaymentError(
        "Please enter your discount code to proceed with payment"
      );
    } else if (selectedPaymentMethod === "creditCard") {
      let data: CheckoutDetails = {
        name: NametoPass,
        amount: totalPrice,
        currency: CurrencytoPass,
        quantity: 1,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL}payment-success?emailId=${emailId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL}payment-failure`,
        email_id: emailId,
      };
      await checkOutSession(data)
        .then((response) => {
          setEmailId(emailId);
          setSessionId(response.session_id);
          sessionStorage.setItem("session_id", response.session_id);
          window.location.href = response.url;
        })
        .catch((error) => {
          console.error("Error processing payment:", error);
        });
    } else if (selectedPaymentMethod === "metamask") {
      try {
        const exchangeRates = await fetchExchangeRate();
        // console.log("Ethereum Exchange rate:", exchangeRates.ethereum_amount);
        // console.log(`1 ETH =${exchangeRates.ethereum_amount} USD`);

        // console.log("Tether Exchange Rate:", exchangeRates.tether_amount);
        // console.log(`1 USDT =${exchangeRates.tether_amount} USD`);

        const ETH_AMOUNT = exchangeRates.ethereum_amount;
        const TETHER_AMOUNT = exchangeRates.tether_amount;

        const recipientAddress = "0x9c4a1876aA0f4C4AdF251a0F7e9504caE565e0e0";

        if (selectedTokenType === "eth") {
          const amountInETH = totalPrice / ETH_AMOUNT;
          // console.log("TotalPrice", totalPrice);
          // console.log("Amount in etherum", amountInETH);
          if (!web3) {
            console.error(
              "Web3 is not available. Please install MetaMask or a similar Ethereum wallet."
            );
            return null;
          }
          const amountInWei = web3.utils.toWei(amountInETH.toString(), "ether");
          // console.log("Amount in wei", amountInWei);
          // Check user's wallet balance before proceeding
          const userBalanceInWei = await web3.eth.getBalance(userAddress);
          const userBalanceInETH = web3.utils.fromWei(
            userBalanceInWei,
            "ether"
          );

          if (parseFloat(userBalanceInETH) < amountInETH) {
            alert("Insufficient funds in your Metamask wallet.");
            return;
          }
          const transactionObject = {
            from: userAddress,
            to: recipientAddress,
            value: amountInWei,
          };

          const response = await web3.eth.sendTransaction(transactionObject);
          const txHash = response.transactionHash;
          router.push(
            `${process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL}payment-success-metamask?emailId=${emailId}&txHash=${txHash}`
          );
        } else if (selectedTokenType === "usdt") {
          try {
            const amountInUSDT = totalPrice / TETHER_AMOUNT;
            // console.log("AMOUNT IN USDT:", amountInUSDT);

            const usdtAmountWei = web3.utils.toWei(amountInUSDT, "tether");
            // console.log("USDT AMOUNT IN WEI", usdtAmountWei);

            const usdtContractAddress =
              "0xdAC17F958D2ee523a2206206994597C13D831ec7";
            const usdtContractAbi = contractABI.contractABI;
            const usdtContract = new web3.eth.Contract(
              usdtContractAbi,
              usdtContractAddress
            );

            const transferTransactionObject = {
              from: userAddress,
              to: usdtContractAddress,
              data: usdtContract.methods
                .transfer(recipientAddress, usdtAmountWei)
                .encodeABI(),
            };

            // Send the transaction to transfer USDT
            const response = await web3.eth.sendTransaction(
              transferTransactionObject
            );

            // Get the transaction hash
            const txHash = response.transactionHash;

            router.push(
              `${process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL}payment-success-metamask?emailId=${emailId}&txHash=${txHash}`
            );

            // await usdtContract.methods
            //   .transfer(recipientAddress, usdtAmountWei)
            //   .send({ from: userAddress });

            alert(`Payment of ${amountInUSDT} USDT sent successfully.`);
          } catch (error) {
            console.error("Error sending USDT:", error);
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        router.push("/payment-failure");
      }
    }
  };
  return (
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
      <div className="flex flex-col gap-12">
        <Email setEmailId={setEmailId} />
        <PaymentMethod
          selectedTokenType={selectedTokenType}
          setSelectedTokenType={setSelectedTokenType}
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
      <div className="text-yellow text-xl font-bold">{showError}</div>
    </section>
  );
};

export default BillingDetails;
