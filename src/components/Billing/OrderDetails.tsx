"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tag from "../../../public/tag.svg";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  setTotalPrice: (price: number) => void;
};
interface ProductDetail {
  id: number;
  name: string;
  description: string;
  noOfAlerts: number;
  basePrice: number;
  discount: number;
  discountedPrice: number;
  totalPrice: number;
  currency: string;
  status: boolean;
}

const OrderDetails = ({ setTotalPrice }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getParams = searchParams.get("productId");

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  useEffect(() => {
    if (getParams) {
      setLoading(true);
      fetch(
        `https://voucher-dev-xffoq.ondigitalocean.app/voucher/api/v1/product/get/${getParams}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProductDetail(data);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError("Error fetching product details");
          setLoading(false);
        });
    }
  }, [getParams]);

  const handleApplyCoupon = () => {
    // Check if the entered coupon code is valid
    if (
      couponCode === "ALERT10" ||
      couponCode === "LIKE25" ||
      couponCode === "BIG50"
    ) {
      // Apply the corresponding discount based on the coupon code
      if (couponCode === "ALERT10") {
        setAppliedDiscount(10);
      } else if (couponCode === "LIKE25") {
        setAppliedDiscount(25);
      } else if (couponCode === "BIG50") {
        setAppliedDiscount(50);
      }
      setError(null);
    } else {
      setError("Coupon code doesn't exist! Sorry");
    }
  };

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // // Error state
  // if (error) {
  //   return <p>{error}</p>;
  // }

  // Check if productDetail is available
  if (!productDetail) {
    return <p>No product details found.</p>;
  }

  const discountedPrice =
    productDetail.basePrice - (productDetail.basePrice * appliedDiscount) / 100;
  setTotalPrice(discountedPrice);

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-2xl font-medium">Your Order</h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h4 className="text-base font-medium">
            {productDetail.noOfAlerts} alerts
          </h4>
          <h4>
            {productDetail.basePrice} {productDetail.currency}/mo
          </h4>
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
            <Image src={Tag} alt="Tag" className=" w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Enter the discount code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="block w-full p-3 pl-10 border-2 border-[#242424] bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch gap-2 items-center"
          ></input>
          <button
            onClick={handleApplyCoupon}
            className="absolute right-2.5 bottom-1 focus:bg-black focus:translate-x-0.5 focus:text-bold focus:text-white focus:outline-none rounded-lg text-sm px-4 py-2 font-medium text-[#ababab]"
          >
            Apply
          </button>
        </div>

        {error && <p className="text-[#FF6625] text-xs">{error}</p>}
      </div>
      <div className="h-0.5 bg-[#313131]"></div>

      <div>
        <div className="flex justify-between">
          <h4 className="text-base font-normal">Subtotal</h4>
          <h4 className="text-base font-semibold">
            {productDetail.basePrice} {productDetail.currency}/mo
          </h4>
        </div>
        <div className="flex justify-between">
          <h4 className="text-base font-normal">Discount</h4>
          <h4 className="text-base font-semibold">
            -{(productDetail.basePrice * appliedDiscount) / 100}
            {productDetail.currency}/mo
          </h4>
        </div>
      </div>

      <div className="h-0.5 bg-[#313131]"></div>

      <div className="flex justify-between">
        <h4 className="text-base font-medium">Total</h4>
        <h4>
          {discountedPrice.toFixed(2)} {productDetail.currency}/mo
        </h4>
      </div>
    </div>
  );
};

export default OrderDetails;
