import React from "react";
import OrderDetails from "../Billing/OrderDetails";
import PaymentMethod from "./PaymentMethod";

type Props = {};

const SelectPayment = (props: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center lg:pt-20 p-6">
      <PaymentMethod />
      <OrderDetails />
    </div>
  );
};

export default SelectPayment;
