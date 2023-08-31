import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../../../public/tag.svg";

type Props = {};

const OrderDetails = (props: Props) => {
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-2xl font-medium">Your Order</h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h4 className="text-base font-medium">20 alerts</h4>
          <h4>£24.99/mo</h4>
        </div>
        <p className="text-sm font-light">
          1 GB Bandwidth, Subdomain, 1000 Users
        </p>
        <p className="text-xs font-light cursor-pointer text-[#FF6625]">
          Remove
        </p>
      </div>

      <div className="h-0.5 bg-[#313131]"></div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium">Discount Code</h3>
        <div className="relative flex">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image src={Tag} alt="Tag" className="absolute" />
          </div>
          <input
            type="text"
            placeholder="Enter the discount code"
            className="block w-full p-3 pl-10 border-2 border-[#242424] bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch gap-2 items-center"
          ></input>
          <button className="absolute right-2.5 bottom-1 focus:bg-black focus:translate-x-0.5 focus:text-bold focus:text-white focus:outline-none rounded-lg text-sm px-4 py-2 font-medium text-[#ababab]">
            Apply
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-[#313131]"></div>

      <div>
        <div className="flex justify-between">
          <h4 className="text-base font-normal">Subtotal</h4>
          <h4 className="text-base font-semibold">£24.99/mo</h4>
        </div>
        <div className="flex justify-between">
          <h4 className="text-base font-normal">Discount</h4>
          <h4 className="text-base font-semibold">-£2.49/mo</h4>
        </div>
      </div>

      <div className="h-0.5 bg-[#313131]"></div>

      <div className="flex justify-between">
        <h4 className="text-base font-medium">Total</h4>
        <h4>£22.49/mo</h4>
      </div>

      <div className="flex justify-center">
        <Link href="/payment">
          <button className="text-black block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl">
            Proceed to payment Method
          </button>
        </Link>
      </div>
     
      <p className="text-sm font-normal opacity-50 text-center">
        We protect your payment information using encryption to provide
        bank-level security.
      </p>
    </div>
  );
};

export default OrderDetails;
