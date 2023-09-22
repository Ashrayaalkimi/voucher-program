"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  noOfAlerts: number;
  basePrice: number;
  currency: string;
  status: boolean;
}

type PlanCardProps = {
  onSelectPlan: (product: Product) => void;
};

const PlanCard = ({ onSelectPlan }: PlanCardProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://voucher-dev-xffoq.ondigitalocean.app/voucher/api/v1/product/getall"
    )
      .then((response) => response.json())
      .then((responseData) => {
        setProducts(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleViewPlanbyId = (id: any) => {
    const url = `/billing?productId=${id}`;
    router.push(url);
  };

  return (
    <div className="flex flex-col mx-4 gap-10 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-12 cursor-pointer">
      <div
        // key={product.id}
        className="group flex flex-col items-center p-5 gap-6 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-105 lg:hover:scale-110"
      >
        <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
          <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
            View real-time patterns{" "}
          </button>
        </div>

        <h1 className="text-4xl font-semibold">Free</h1>
        <p className="my-2 gap-3 text-center text-[#cacaca] text-sm font-light w-48">
          View all pattern formations at any time series
        </p>
        <button
          // onClick={() => handleViewPlanbyId(product.id)}
          className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl"
        >
          Proceed to payment
        </button>
      </div>
      {products.map((product) => (
        <div
          key={product.id}
          className="group flex flex-col items-center p-5 gap-3 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-105 lg:hover:scale-110"
        >
          <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
            <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
              {product.noOfAlerts} alerts
            </button>
          </div>

          <h1 className="text-4xl font-semibold">
            $ {product.basePrice}
            {/* {product.currency}/mo */}
          </h1>
          <p className="text-sm font-semibold leading-9">(20¢ per alert)</p>
          <p className="my-2 gap-3 text-center text-[#cacaca] text-sm font-light w-[165px]">
            Telegram, Email & In-app real-time alerts.{" "}
          </p>
          {/* <ul className="my-2 flex flex-col gap-3 text-center text-[#cacaca]">
            <li>Telegram</li>
            <li>Email</li>
            <li>In-app</li>
            <li>Real time alerts</li>
          </ul> */}
          <button
            onClick={() => handleViewPlanbyId(product.id)}
            className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl"
          >
            Proceed to payment
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;
