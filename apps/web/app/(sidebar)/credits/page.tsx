import DodoPayments from "dodopayments";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
});

function CreditsPage() {
  const handleClick = async () => {

  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1>Your Credits:</h1>
      <h2></h2>
      <Link href={`"aihdailda"adadasd"asdada"`}>
        <Button variant={"outline"}>Buy more credits</Button>
      </Link>
    </div>
  );
}

export default CreditsPage;
