"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Tick from "../../../public/tick.svg";
import Copy from "../../../public/copyicon.svg";
import QR from "../../../public/qrcode.svg";
import Link from "next/link";

type SuccessPageProps = {
  session_id: string; // Pass session_id as a prop
  emailId: string; // Pass emailId as a prop
};

const SuccessPage = ({ session_id, emailId }: SuccessPageProps) => {
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  useEffect(() => {
    // Make an API call to fetch payment_intent_id using session_id
    const fetchPaymentIntentId = async () => {
      try {
        const response = await fetch(
          "https://alkimi-payment-gateway-dev-xsm5l.ondigitalocean.app/payment/get-product-intent/",
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

        // Call the API to get voucher code
        if (data.payment_intent_id && emailId) {
          await fetchVoucherCode(data.payment_intent_id, emailId);
        }
      } catch (error) {
        console.error("Error fetching payment_intent_id:", error);
      }
    };

    const fetchVoucherCode = async (transactionId:string, email:string) => {
      try {
        const requestBody = {
          userEmail: email,
          affiliateCode: "ALERT10",
          productId: 5,
          transactionId: transactionId,
          paymentStatus: "SUCCESS",
          paymentMethod: "METAMASK",
          walletId: "12djh478r9", // Update with the actual wallet ID
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
        console.log("Voucher code:", voucherData.voucherCode);
      } catch (error) {
        console.error("Error fetching voucher code:", error);
      }
    };

    if (session_id) {
      fetchPaymentIntentId();
    }
  }, [session_id, emailId]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center bg-[#131313] rounded-3xl lg:mt-40 p-6 lg:mx-auto lg:w-[700px] 2xl:w-[700px] ">
        <div className="flex flex-col gap-3 justify-center items-center">
          <Image src={Tick} alt="Success-tick" />
          <h2 className="text-[32px] leading-normal font-semibold">Success</h2>
          <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-[360px]">
            Transaction id:{" "}
            <span className="text-white">{paymentIntentId}</span>.We have also
            sent the voucher code to your email
            <span className="text-white font-light"> {emailId}</span>
          </p>
          {voucherCode && (
            <div className="flex flex-col gap-2">
              <h4>Voucher Code:</h4>
              <div className="flex gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110">
                <h4>{voucherCode}</h4>
                <Image src={Copy} alt="Copy icon" />
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
    </>
  );
};

export default SuccessPage;
