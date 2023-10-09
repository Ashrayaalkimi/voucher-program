"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tag from "../../../public/tag.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductDetail } from "@/types";

type Props = {
  setTotalPrice: (price: number) => void;
  setNametoPass: (name: string) => void;
  setCurrencytoPass: (currency: string) => void;
};

const OrderDetails = ({
  setTotalPrice,
  setNametoPass,
  setCurrencytoPass,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getParams = searchParams.get("productId");

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<
    string | null
  >(null);

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
          setTotal(data.basePrice);
          setName(data.name);
          setCurrency(data.currency);
          setLoading(false);
          setError(null);
          sessionStorage.setItem("productId", getParams);
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

  useEffect(() => {
    setNametoPass(name);
  }, [name, setNametoPass]);

  useEffect(() => {
    setNametoPass(name);
  }, [name, setNametoPass]);

  useEffect(() => {
    setCurrencytoPass(currency);
  }, [currency, setCurrencytoPass]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!productDetail) {
    return <p>No product details found.</p>;
  }

  const handleInputChange = (e: any) => {
    const inputText = e.target.value;
    setCouponCode(inputText);
    setError("");
  };

  const handleBackspace = (e: any) => {
    if (e.keyCode === 8) {
      setError("");
    }
  };

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
        if (
          data.products &&
          data.products.length > 0 &&
          data.products[0].id === Number(getParams)
        ) {
          setAppliedDiscount(data.products[0].discountedPrice);
          setTotal(data.products[0].totalPrice);
          setName(data.products[0].name);
          setCurrency(data.products[0].currency);
          setCouponAppliedMessage(
            `Hurray!! You got ${data.products[0].discount}% off with ${couponCode} !`
          );
          sessionStorage.setItem("discountCode", couponCode);
        } else {
          setError("This coupon code cannot be applied to this product");
          setAppliedDiscount(0);
          setTotal(productDetail.basePrice);
        }
      })
      .catch((error) => {
        setError("Invalid affiliate code! Try another");
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
          Telegram, Email & In-app real-time alerts.{" "}
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
            // onChange={(e) => setCouponCode(e.target.value)}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
            required
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
        {couponAppliedMessage && (
          <h5 className="text-xs text-green-400 font-light">
            {couponAppliedMessage}
          </h5>
        )}
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
