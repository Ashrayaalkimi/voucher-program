import React from "react";

type Props = {};

const ShimmerPlanCards = (props: Props) => {
  return (
    <div className="flex flex-col mx-4 gap-10 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-12 cursor-pointer">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="group lg:w-80 flex flex-col items-center p-5 gap-6 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-105 lg:hover:scale-110"
          >
            <div className="bg-[#404242] mt-6 rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
              <button className="py-1 px-4 bg-[#242424] text-transparent bg-clip-text group-hover:text-black lg:px-12"></button>
            </div>

            <ul className="my-2 flex flex-col gap-3 text-center text-[#c1bebe]">
             {Array(3).fill("").map((_,index1)=>(
                <li key={index1} className="bg-[#404242] rounded-lg w-full h-4 py-3 px-16 lg:px-24"></li>
             ))} 
            </ul>
            <button className="text-black w-full h-10 text-base font-medium py-3 px-16 lg:px-16 bg-[#737575] rounded-lg"></button>
          </div>
        ))}
    </div>
  );
};

export default ShimmerPlanCards;
