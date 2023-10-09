"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShimmerPlanCards from "./ShimmerPlanCards";
import { Product } from "@/types";
import { getAllproduct } from "@/service";

type PlanCardProps = {
  onSelectPlan: (product: Product) => void;
};

const PlanCard = ({ onSelectPlan }: PlanCardProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await getAllproduct().then((response) => {
        setProducts(response);
        setLoading(false);
      })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        })
    }
    fetchData()
  }, []);

  const handleViewPlanbyId = (id: number) => {
    router.push(`/billing?productId=${id}`);
  };

  return (
    <section>
      {loading ? (
        <ShimmerPlanCards />
      ) : (
        <div className="flex flex-col mx-4 gap-10 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-12 cursor-pointer">
          {products.map((product, index) => {
            const centPrice =
              product.noOfAlerts !== 0
                ? (product.basePrice / product.noOfAlerts).toFixed(2)
                : 0;

            return (
              <article
                key={index}
                className="group flex flex-col items-center p-5 gap-3 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-105 lg:hover:scale-110"
              >
                <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
                  <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
                    {product.noOfAlerts} alerts
                  </button>
                </div>

                <h1 className="text-4xl font-semibold">
                  $ {product.basePrice}
                </h1>
                <p className="text-sm font-semibold leading-9">
                  ({centPrice}¢ per alert)
                </p>
                <p className="my-2 gap-3 text-center text-[#cacaca] text-sm font-light w-[165px]">
                  Telegram, Email & In-app real-time alerts.{" "}
                </p>
                <button
                  onClick={() => handleViewPlanbyId(product.id)}
                  className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl"
                >
                  Proceed to payment
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PlanCard;
