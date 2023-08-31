'use client'

import React, { useState } from "react";

type Props = {};

const BillingEmail = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(e.target.checkValidity());
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Billing Details</h3>
        <h4 className="text-base font-medium">Email Address</h4>
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className={`p-3 border-2 ${
            isEmailValid ? "border-[#242424]" : "border-red-500"
          } bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch flex gap-2 items-center xl:w-[390px]`}
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && (
          <p className="text-red-500 text-sm font-normal">
            Please enter a valid email address.
          </p>
        )}
        <h6 className="text-sm font-normal opacity-50">
          You will get a confirmation code on your email.
        </h6>
      </div>
    </>
  );
};

export default BillingEmail;

