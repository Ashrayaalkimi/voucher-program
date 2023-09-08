'use client'
import React, { useState } from "react";
import OrderDetails from "../Billing/OrderDetails";
import PaymentMethod from "./PaymentMethod";
import Link from "next/link";

type Props = {};

const SelectPayment = (props: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
      <PaymentMethod />
      <div className="flex flex-col gap-6 max-w-lg">
        <OrderDetails/>
        <div className="flex flex-col gap-4 justify-center">
          {/* <Link href="/payment"> */}
            <button className="text-black w-full block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl">
              Pay
            </button>
          {/* </Link> */}
          <p className="text-sm font-normal opacity-50 text-center">
            We protect your payment information using encryption to provide
            bank-level security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectPayment;
