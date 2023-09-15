import React from "react";
import SuccessPage from "@/components/Success/SuccessPage";

type Props = {
  session_id: string; // Pass session_id as a prop
  emailId: string; // Pass emailId as a prop
};

const Success = ({ session_id, emailId }: Props) => {
  return (
    <div>
      <SuccessPage session_id={session_id} emailId={emailId} />
    </div>
  );
};

export default Success;
