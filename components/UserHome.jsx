import { useRouter } from "next/router";
import React from "react";

const UserHome = ({ userInfo }) => {
  const {push, reload} = useRouter();

  const handleStartTransaction = async() => {
      push("/make-transaction")
  }
  return (
    <div>
      <h1 className="text-5xl mt-32 mb-10">
        Welcome {userInfo.firstName} {userInfo.lastName}
      </h1>
      <p className="mb-16">You can start a new payment transaction and send me money using your credit card!</p>
      <div>
        <button
          className="py-2 px-4 mb-32 bg-cyan-700 text-white mx-4 text-xl rounded-md hover:bg-cyan-900 transition-all"
          onClick={handleStartTransaction}
        >
          Start a payment transaction
        </button>
      </div>
    </div>
  );
};

export default UserHome;
