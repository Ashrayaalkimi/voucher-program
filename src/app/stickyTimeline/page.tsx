import Image from "next/image";
import React from "react";

type Props = {};

const TimeLine = (props: Props) => {
  return (
    <div>
      <section>
        <div>
          <div>
            {/* <Image
              src="https://appwrite.io/images/icons/illustrated/dark/auth.png"
              alt="Image"
              width={200}
              height={200}
            /> */}
            <h3 className="text-[#e4e4e7] text-xl font-semibold">Auth</h3>
          </div>
          <h1>Secure login for all users</h1>
          <p>
            Authenticate users securely with multiple login methods like
            Email/Password, SMS, OAuth, Annoymous, Magic URLs and more.
          </p>
          <ul>
            {/* <Image src={IconImage} alt="Image" /> */}
            <li>30+ login methods</li>
            <li>Support for teams, roles and user labels</li>
            <li>Rate-limits and advanced user protection</li>
            <li>Custom SMTP and email templates</li>l
          </ul>
        </div>
        <div>
          {/* <Image
            src="https://appwrite.io/images/products/auth.png"
            alt="Image"
            width={200}
            height={200}
          /> */}
        </div>
      </section>
    </div>
  );
};

export default TimeLine;
