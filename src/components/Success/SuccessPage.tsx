import Image from "next/image";
import React, { useEffect, useState } from "react";
import Tick from "../../../public/tick.svg";
import Copy from "../../../public/copyicon.svg";
import QR from "../../../public/qrcode.svg";
import Link from "next/link";
type Props = {};

const SuccessPage = (props: Props) => {
  const [transactionId, setTransactionId] = useState("");
  // const [voucherCode, setVoucherCode] = useState("");
  // const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the transaction id using the session_id from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      // Fetch transaction id using the session_id
      fetch(
        `https://alkimi-payment-gateway-dev-xsm5l.ondigitalocean.app/payment/get-product-intent/?session_id=${sessionId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch transaction id");
          }
          return response.json();
        })
        .then((data) => {
          setTransactionId(data.payment_intent_id);
        })
        .catch((error) => {
          console.error("Error fetching transaction id:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center bg-[#131313] rounded-3xl lg:mt-40 p-6 lg:mx-auto lg:w-[700px] 2xl:w-[700px] ">
        <div className="flex flex-col gap-3 justify-center items-center">
          <Image src={Tick} alt="Success-tick" />
          <h2 className="text-[32px] leading-normal font-semibold">Success</h2>
          <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-[360px]">
            Transaction id: <span className="text-white">{transactionId}</span>.We
            have also sent the voucher code to your email
            <span className="text-white font-light"> name@gmail.com</span>
          </p>
          <div className="flex gap-2">
            <h4>Code:</h4>
            <div className="flex gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110">
              <h4>345677654567890</h4>
              <Image src={Copy} alt="Copy icon" />
            </div>
          </div>
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
