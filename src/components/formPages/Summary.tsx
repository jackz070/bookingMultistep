import React from "react";
import FormWrapper from "../FormWrapper";
import { FormData } from "../../types";

const Summary = ({
  firstName,
  lastName,
  emailAdress,
  fullPriceTickets,
  reducedPriceTickets,
}: Partial<FormData>) => {
  return (
    <FormWrapper title="Summary">
      <div className="leading-relaxed">
        Dear {firstName} {lastName}. You are ordering:
        <br />
        <div className="flex flex-col  gap-2 mx-4 my-4">
          {fullPriceTickets && parseInt(fullPriceTickets) >= 1 && (
            <span>
              {fullPriceTickets} full price ticket
              {parseInt(fullPriceTickets) > 1 ? "s" : ""}
            </span>
          )}
          {reducedPriceTickets && parseInt(reducedPriceTickets) >= 1 && (
            <span>
              {reducedPriceTickets} reduced price ticket
              {parseInt(reducedPriceTickets) > 1 ? "s" : ""}
            </span>
          )}
        </div>
        If everything is alright confirm your order below.
        <br /> Confirmation will be sent to {emailAdress}.<br /> If something is
        wrong go back and update your order.
      </div>
    </FormWrapper>
  );
};

export default Summary;
