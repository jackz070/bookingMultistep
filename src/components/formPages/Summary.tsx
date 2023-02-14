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
        {firstName} {lastName}, your order consists of:
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
        Confirm your order below and receive order summary at {emailAdress}.
        <br />
      </div>
    </FormWrapper>
  );
};

export default Summary;
