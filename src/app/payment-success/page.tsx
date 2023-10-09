"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Tick from "../../../public/tick.svg";
import Copy from "../../../public/copyicon.svg";
import QR from "../../../public/qrcode.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const copyToClipboard = () => {
    const textToCopy = voucherCode;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const productId = sessionStorage.getItem("productId");
  const session_id = sessionStorage.getItem("session_id");
  const emailId = searchParams.get("emailId");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const storedDiscountCode = sessionStorage.getItem("discountCode");
  console.log("Stored discount code:", storedDiscountCode);
  useEffect(() => {
    console.log("session id is here in success page " + session_id);
    const fetchPaymentIntentId = async () => {
      try {
        const response = await fetch(
          `https://alkimi-payment-gateway-dev-xsm5l.ondigitalocean.app/payment/get-product-intent/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id: session_id,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment_intent_id");
        }

        const data = await response.json();
        setPaymentIntentId(data.payment_intent_id);
        console.log("transaction id", data);

        if (data.payment_intent_id && emailId) {
          await fetchVoucherCode(data.payment_intent_id, emailId);
        }
        // sessionStorage.removeItem("session_id");
        sessionStorage.clear();
      } catch (error) {
        console.error("Error fetching payment_intent_id:", error);
      }
    };

    const fetchVoucherCode = async (transactionId: string, email: string) => {
      try {
        const requestBody = {
          userEmail: email,
          affiliateCode: storedDiscountCode,
          productId: productId,
          transactionId: transactionId,
          paymentStatus: "SUCCESS",
          paymentMethod: "METAMASK",
          walletId: "12djh478r9",
          currency: "USD",
        };

        const response = await fetch(
          "https://voucher-dev-xffoq.ondigitalocean.app/voucher/api/v1/purchase/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch voucher code");
        }

        const voucherData = await response.json();
        setVoucherCode(voucherData.voucherCode);
        // sessionStorage.removeItem("discountCode");
        console.log("Voucher code:", voucherData.voucherCode);
      } catch (error) {
        console.error("Error fetching voucher code:", error);
      }
    };

    if (session_id) {
      fetchPaymentIntentId();
    }
  }, [session_id, emailId, productId, storedDiscountCode]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424] bg-opacity-50 m-4 lg:m-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center bg-[#1b1b1b] rounded-3xl p-6 lg:mx-auto lg:w-[700px] 2xl:w-[700px] ">
        <div className="flex flex-col gap-3 justify-center items-center">
          <Image src={Tick} alt="Success-tick" />
          <h2 className="text-[32px] leading-normal font-semibold">Success</h2>
          <p className="text-[#b8b8b8] font-normal leading-6text-sm text-center lg:w-[360px]">
            Transaction id:
            <span className="text-white mr-4"> {paymentIntentId}</span>
          </p>
          <p className="text-[#b8b8b8] font-normal leading-6text-sm text-center lg:w-[360px]">
            We have also sent the voucher code to your email
            <span className="text-white font-light"> {emailId}</span>
          </p>

          {voucherCode && (
            <div className="flex flex-col gap-2">
              <h4>Voucher Code:</h4>
              <div
                className={`flex items-center gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110 ${
                  copied ? "bg-[#53902a]" : ""
                }`}
                onClick={copyToClipboard}
              >
                <h4 className="text-base  font-medium">
                  {copied ? (
                    "Copied!"
                  ) : (
                    <div className="flex gap-1">
                      <p>{voucherCode}</p>
                      <Image src={Copy} alt="Copy icon" />
                    </div>
                  )}
                </h4>
              </div>
            </div>
          )}
        </div>

        <div className="h-0.5 lg:hidden w-full bg-[#434343]"></div>
        <div className="h-72 hidden lg:flex w-0.5 bg-[#434343]"></div>
        <div className="flex flex-col gap-3 items-center">
          <Image src={QR} alt="Success-tick" />
          <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-72">
            Please download app.leopard.ai to complete sign up and use voucher!
          </p>
        </div>
      </div>
      <Link href="/">
        <button className="fixed right-4 bottom-4 bg-[#131313] text-white py-2 px-4 rounded-full text-sm hover:bg-white hover:text-black">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
