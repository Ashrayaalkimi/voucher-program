'use client'
import React, { useState } from "react";
import SuccessPage from "@/components/Success/SuccessPage";


const Success = () => {
  const[session_id,setSessionId] = useState("");
  const[emailId,setEmailId] = useState("");
  return (
    <div>
      <SuccessPage session_id={session_id} emailId={emailId} />
    </div>
  );
};

export default Success;
