import React from "react";

type Props = {};

const BillingEmail = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Billing Details</h3>
        <h4 className="text-base font-medium">Email Address</h4>
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="p-3 border-2 border-[#242424] bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch flex gap-2 items-center xl:w-[390px]"
        ></input>
        <h6 className="text-sm font-normal opacity-50">
          You will get confirmation code on your email.
        </h6>
      </div>
    </>
  );
};

export default BillingEmail;
