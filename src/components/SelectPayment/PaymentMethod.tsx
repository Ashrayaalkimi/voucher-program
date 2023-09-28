"use client";
import React, { useState } from "react";
import Image from "next/image";
import Cardicons from "../../../public/icons.svg";
import Metamask from "../../../public/metamask.svg";
// import ETH from "../../../public/eth.svg";
// import USDT from "../../../public/usdt.svg";
import Paypal from "../../../public/PayPal.svg";
import { Web3Button } from "@web3modal/react";
import ProviderWeb3Modal from "@/app/ProviderWeb3Modal";

type Props = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  setUserAddress: (address: string) => void; //senders wallet address
};

const PaymentMethod = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setUserAddress,
}: Props) => {
  // const [selectedCurrency, setselectedCurrency] = useState(false);
  const [isCreditCardSelected, setIsCreditCardSelected] = useState(false);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMethod = event.target.value;
    setSelectedPaymentMethod(newMethod);

    // Set the flag when Credit Card is selected
    if (newMethod === "creditCard") {
      setIsCreditCardSelected(true);
    } else {
      setIsCreditCardSelected(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0]; // Assuming the first account
      setUserAddress(userAddress);
      console.log("Senders wallet address : ", userAddress);
      setSelectedPaymentMethod("metamask");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <ProviderWeb3Modal>
      <div className="flex flex-col gap-4 items-start">
        <h3 className="text-2xl font-medium">Payment Method</h3>
        <div className="flex flex-col gap-4 w-full md:w-96">
          <label htmlFor="creditCard" className="flex cursor-pointer">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              className="mr-2"
              value="creditCard"
              checked={selectedPaymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            <div className="flex justify-between w-full">
              <h6>Credit / Debit Card</h6>
              <Image src={Cardicons} alt="Card Icons" />
            </div>
          </label>

          {selectedPaymentMethod === "creditCard" && (
            <p className="text-xs font-normal opacity-50">
              You will be redirected to Stripe website to complete your order
              securely. Please do not refresh until the transaction is complete.
            </p>
          )}

          <label htmlFor="paypal" className="flex cursor-pointer">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              className="mr-2"
              value="paypal"
              checked={selectedPaymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <div className="flex justify-between w-full">
              <h6>PayPal</h6>
              <Image src={Paypal} alt="Paypal Icons" />
            </div>
          </label>

          {selectedPaymentMethod === "paypal" && (
            <p className="text-xs font-normal opacity-50">
              You will be redirected to PayPal website to complete your order
              securely. Please do not refresh until the transaction is complete.
            </p>
          )}

          <label htmlFor="metamask" className="flex cursor-pointer">
            <input
              type="radio"
              id="metamask"
              name="paymentMethod"
              className="mr-2"
              value="metamask"
              checked={selectedPaymentMethod === "metamask"}
              onChange={handlePaymentMethodChange}
            />
            <div className="flex justify-between w-full">
              <h6>MetaMask</h6>
              <Image src={Metamask} alt="Metamask Icons" />
            </div>
          </label>

          {/* {selectedPaymentMethod === "metamask" && (
            <div>
              <h6 className="mb-4">Select Currency: </h6>
              <div>
                <ul className="grid w-full gap-6 md:grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      id="eth"
                      name="currency"
                      value="eth"
                      onClick={()=>setselectedCurrency(true)}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor="eth"
                      className="inline-flex items-center justify-center gap-2 w-full p-2 text-white bg-[#131313] border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-black hover:text-black hover:bg-gray-100 "
                    >
                      <Image src={ETH} alt="ETH Icon" />
                      <div className="block">
                        <div className="w-full text-lg font-semibold">ETH</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="usdt"
                      name="currency"
                      value="usdt"
                      onClick={()=>setselectedCurrency(true)}

                      className="hidden peer"
                    />
                    <label
                      htmlFor="usdt"
                      className="inline-flex items-center w-full p-2 justify-center gap-2 text-white bg-[#131313] border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-black hover:text-black hover:bg-gray-100 "
                    >
                      <Image src={USDT} alt="USDT Icon" />
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          USDT{" "}
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          )} */}
        </div>

        {/* {selectedCurrency && (
          <>
            <button onClick={handleConnectWallet}>
              <Web3Button></Web3Button>
            </button>
          </>
        )} */}
        {selectedPaymentMethod === "metamask" && (
          <>
            <button onClick={handleConnectWallet}>
              <Web3Button></Web3Button>
            </button>
          </>
        )}
      </div>
    </ProviderWeb3Modal>
  );
};

export default PaymentMethod;
