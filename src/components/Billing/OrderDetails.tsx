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

const OrderDetails = ({setTotalPrice}: Props) => {
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
  const [total, setTotal] = useState<number>(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<string | null>(
    null
  );


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
          console.log("ProductDetail data",data);
          setTotal(data.basePrice);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError("Error fetching product details");
          setLoading(false);
        });
    }
  }, [getParams]);

  useEffect(() => {
    setTotalPrice(total);
  }, [total, setTotalPrice]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!productDetail) {

    return <p>No product details found.</p>;
  }

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setError("Please enter a coupon code");
      return;
    }
  
    setError(null);
  
    fetch(
      `https://voucher-dev-xffoq.ondigitalocean.app/voucher/api/v1/affiliate/get/${couponCode}/${getParams}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("coupon",data);
        // Check if the product in the response matches the getParams
        if (
          data.products &&
          data.products.length > 0 &&
          data.products[0].id === Number(getParams)
        ) {
          // Update the appliedDiscount and total based on the response
          setAppliedDiscount(data.products[0].discountedPrice);
          setTotal(data.products[0].totalPrice);
          setCouponAppliedMessage(`Hurray!! You got ${data.products[0].discount}% off with ${couponCode} !`);
          console.log("ProductDetail basePrice",productDetail.basePrice);

        } else {
          setError("This coupon code cannot be applied to this product");
          setAppliedDiscount(0);
          setTotal(productDetail.basePrice);
        }
      })
      .catch((error) => {
        setError("Coupon code doesn't exist! Sorry");
        setAppliedDiscount(0);
        setTotal(productDetail.basePrice);
      });
  };
  
  // setTotalPrice(total);

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
            -{appliedDiscount} {productDetail.currency} /mo
          </h4>
        </div>
        {couponAppliedMessage && <h5 className="text-xs text-green-400 font-light">{couponAppliedMessage}</h5>}
        {/* {couponCode && <h5 className="text-xs text-green-400 font-light">Hurray!! {couponCode} got applied!</h5>} */}
      </div>

      <div className="h-0.5 bg-[#313131]"></div>

      <div className="flex justify-between">
        <h4 className="text-base font-medium">Total</h4>
        <h4>
          {total.toFixed(2)} {productDetail.currency}/mo
        </h4>
      </div>
    </div>
  );
};

export default OrderDetails;
