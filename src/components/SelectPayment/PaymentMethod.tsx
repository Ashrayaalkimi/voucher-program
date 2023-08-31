import React from "react";
import Image from "next/image";
import Cardicons from "../../../public/icons.svg";
import Metamask from "../../../public/Etherium.svg";
import Paypal from "../../../public/PayPal.svg";

type Props = {};

const PaymentMethod = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Payment Method</h3>
        <div className="flex flex-col w-80 gap-3">
          <label htmlFor="creditCard" className="flex cursor-pointer">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              className="mr-2"
            />
            <div className="flex justify-between w-full">
              <h6>Credit Card</h6>
              <Image src={Cardicons} alt="Card Icons" />
            </div>
          </label>
          <label htmlFor="paypal" className="flex cursor-pointer">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              className="mr-2"
            />
            <div className="flex justify-between w-full">
              <h6>PayPal</h6>
              <Image src={Paypal} alt="Paypal Icons" />
            </div>
          </label>
          <label htmlFor="metamask" className="flex cursor-pointer">
            <input
              type="radio"
              id="metamask"
              name="paymentMethod"
              className="mr-2"
            />
            <div className="flex justify-between w-full">
              <h6>MetaMask</h6>
              <Image src={Metamask} alt="Metamask Icons" />
            </div>
          </label>

          {/* <div className="flex justify-between">
            <h6>Credit Card</h6>
            <Image src={Cardicons} alt="Card Icons" />
          </div>
          <div className="flex justify-between">
            <h6>PayPal</h6>
            <Image src={Paypal} alt="Paypal Icons" />
          </div>
          <div className="flex justify-between">
            <h6>MetaMask</h6>
            <Image src={Metamask} alt="Metamask Icons" />
          </div> */}
        </div>

        {/* <h6 className="text-sm font-normal">
          You will get confirmation code on your email.
        </h6> */}
      </div>
    </>
  );
};

export default PaymentMethod;
