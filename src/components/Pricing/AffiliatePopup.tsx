import React, { useState } from "react";
import Image from "next/image";
import { getCouponDetail } from "@/service";

const AffiliatePopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [existMsg, setExistMsg] = useState(false);

  const handleCloseButton = () => {
    setIsVisible(false);
  };

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

  const handleProceedButton = async () => {
    await getCouponDetail(couponCode).then(response => {
      const validTo = new Date(response.validTo);
      const today = new Date();
      if (validTo < today) {
        setError("Affiliate code expired");
      } else {
        setExistMsg(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
        setError(""); // Clear any previous error
      }
    }).catch((error) => {
      console.log("error", error)
      setError("Sorry! Affiliate code does not exist");
    })
  };

  return (
    <>
      {isVisible && (
        <section className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424] bg-opacity-50 m-4 lg:m-0">
          <div className="bg-[#131313] flex justify-center items-center gap-5 flex-wrap p-4 lg:p-12 flex-col text-center  text-white rounded-3xl lg:w-[516px]">
            <Image src="/icons/leopardIcon.svg" alt="Tag" className=" w-18 h-18" width={70} height={70} />
            <h2 className="text-4xl lg:text-5xl font-bold leading-[52px]">
              Do you have affiliate code?
            </h2>
            <div className="relative flex w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src="/icons/tag.svg" alt="Tag" className=" w-4 h-4" width={20} height={20} />
              </div>
              <input
                type="text"
                placeholder="Enter the discount code"
                value={couponCode}
                // onChange={(e) => setCouponCode(e.target.value)}
                onChange={handleInputChange}
                onKeyDown={handleBackspace}
                className="flex w-full p-3 pl-10 border-none bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg "
              ></input>
            </div>
            <button
              onClick={handleProceedButton}
              className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl">
              Proceed
            </button>
            {error && <div className="text-red-500 text-xs">{error}</div>}
            {existMsg && <div className="text-green-500 text-xs">Yay! You got affiliate code {couponCode}!! Congratulations</div>}
            <button
              onClick={handleCloseButton}
              className="text-white w-full text-base font-medium py-3 px-16 lg:px-16 bg-[#131313] border rounded-xl"
            >
              Close
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default AffiliatePopup;
