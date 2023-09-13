"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  // onEmailChange:(email:string) => void;
  setEmailId: (email: string) => void;
  // onEmailEnter: () => void;
};

const BillingEmail = ({ setEmailId }: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setEmailId(values.email);
      // onEmailEnter();
      // onEmailChange(values.email); // Pass email to parent component
    },
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailValidation = () => {
    if (formik.isValid) {
      setIsEmailValid(true);
      setEmailId(formik.values.email);
      // onEmailChange(formik.values.email);
    } else {
      setIsEmailValid(false);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   formik.handleChange(e);
  //   handleEmailValidation();
  // };

  const handleValidateClick = () => {
    // Trigger validation when the "Validate" button is clicked
    handleEmailValidation();

    // If the email is valid, you can perform additional actions here
    if (isEmailValid) {
      // Perform any actions you want when the email is valid
      setEmailId(formik.values.email);
    }
  };

  // setEmailId(email);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-medium">Billing Details</h3>
        <h4 className="text-base font-medium">Email Address</h4>
        <div
          className={`relative p-3 bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretc flex gap-2 items-center xl:w-[390px] ${
            formik.touched.email
              ? isEmailValid
                ? "border-green-500" // Add green border for valid input
                : "border-red-500" // Add red border for invalid input
              : "border-[#242424]" // Default border color
          }`}
        >
          <input
            type="email"
            required
            id="email"
            placeholder="Enter Your Email Address"
            className=" outline-none block w-full bg-transparent text-[#ABABAB]"
            {...formik.getFieldProps("email")}
            // onBlur={handleEmailValidation} // Trigger validation on blur
            // onChange={handleInputChange} // Trigger validation on change
          />
          <button
            onClick={handleValidateClick}
            className="absolute right-2.5 bottom-1 focus:bg-black focus:translate-x-0.5 focus:text-bold focus:text-white focus:outline-none rounded-lg text-sm px-4 py-2 font-medium text-[#ababab]"
          >
            Validate
          </button>
        </div>

        <h6 className="text-xs font-normal opacity-50">
          You will get a confirmation code on your email.
        </h6>

        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
    </form>
  );
};

export default BillingEmail;
