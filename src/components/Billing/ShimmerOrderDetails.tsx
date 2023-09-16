import React from 'react'

type Props = {}

const ShimmerOrderDetails = (props: Props) => {
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
   
    </div>

    <div className="h-0.5 bg-[#313131]"></div>

    <div className="flex justify-between">
      <h4 className="text-base font-medium">Total</h4>
      <h4>

      </h4>
    </div>
  </div>
  )
}

export default ShimmerOrderDetails