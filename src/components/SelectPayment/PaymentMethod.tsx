"use client";
import React, { useState } from "react";
import Image from "next/image";
import Cardicons from "../../../public/icons.svg";
import Metamask from "../../../public/Etherium.svg";
import Paypal from "../../../public/PayPal.svg";
import { Web3Button } from "@web3modal/react";
import ProviderWeb3Modal from "@/app/ProviderWeb3Modal";

type Props = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
};

const PaymentMethod = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: Props) => {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
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

  return (
    <ProviderWeb3Modal>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Payment Method</h3>
        <div className="flex flex-col w-80 gap-3">
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
          {selectedPaymentMethod === "metamask" && <Web3Button></Web3Button>}
        </div>
      </div>
    </ProviderWeb3Modal>
  );
};

export default PaymentMethod;
