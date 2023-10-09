"use client";
import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import AffiliatePopup from "./AffiliatePopup";
import { Product } from "@/interfaces/ClientInterfaces";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);
  const [showAffiliatePopup, setShowAffiliatePopup] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAffiliatePopup(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSelectPlan = (product: Product) => {
    setSelectedPlan(product);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-10 lg:gap-20 py-16 xl:justify-center">
        <header className="flex flex-col items-center gap-3 ">
          <h1 className="text-5xl font-bold leading-[52px]">Alert packs</h1>
          <p className="text-[#CACACA] text-sm font-light leading-6 text-center max-w-prose">
            Feel free to get on with your day knowing you won&apos;t miss a great trading
            opportunity. Our alert packs will notify you in real-time on your
            terms.
          </p>
        </header>
        <section>
          <PlanCard onSelectPlan={handleSelectPlan} />
        </section>
      </div>
      {showAffiliatePopup && <AffiliatePopup />}
    </>
  );
};

export default PricingPage;
