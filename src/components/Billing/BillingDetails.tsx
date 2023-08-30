import React from "react";
import BillingEmail from "./BillingEmail";
import OrderDetails from "./OrderDetails";

type Props = {};

const BillingDetails = (props: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
      <BillingEmail/>
      <OrderDetails/>
    </div>
  );
};

export default BillingDetails;
