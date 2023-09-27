import React, { useState } from "react";

type Props = {
    setEmailId: (email: string) => void;
};

const Email = ({ setEmailId }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [confirmEmailError, setConfirmEmailError] = useState<string | null>(
    null
  );

  const validateEmail = (input: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!input) {
      return "Email is required";
    } else if (!emailRegex.test(input)) {
      return "Invalid email format";
    }
    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setEmailError(validateEmail(inputValue));
    if (confirmEmail && inputValue !== confirmEmail) {
      setConfirmEmailError("The email doesn't match");
    } else {
      setConfirmEmailError(null);
    }
    setEmailId(inputValue);
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setConfirmEmail(inputValue);
    if (email !== inputValue) {
      setConfirmEmailError("The email doesn't match");
    } else {
      setConfirmEmailError(null);
    }
  };

  const isEmailMatched = email !== "" && email === confirmEmail;

  return (
    <form>
      <div className="flex flex-col gap-3 w-80">
        <h3 className="text-2xl font-medium">Billing Details</h3>
        <h4 className="text-sm font-medium">Email Address</h4>
        <div className="relative p-3 bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch flex gap-2 items-center xl:w-[390px]">
          <input
            type="email"
            required
            id="email"
            placeholder="Enter Your Email Address"
            className="outline-none block w-full bg-transparent text-[#ABABAB]"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {emailError && (
          <p className="text-red-500 text-xs">{emailError}</p>
        )}
        <h4 className="text-sm font-medium">Confirm email</h4>
        <div className="relative p-3 bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg self-stretch flex gap-2 items-center xl:w-[390px]">
          <input
            type="email"
            required
            id="confirmEmail"
            placeholder="Enter Your Email Address"
            className="outline-none block w-full bg-transparent text-[#ABABAB]"
            value={confirmEmail}
            onChange={handleConfirmEmailChange}
          />
        </div>
        {confirmEmailError && (
          <p className="text-red-500 text-xs">{confirmEmailError}</p>
        )}
        {isEmailMatched && (
          <h6 className="text-xs font-normal opacity-50 text-[#66ffff]">
            You will get a confirmation code on your email.
          </h6>
        )}
      </div>
    </form>
  );
};

export default Email;
