import React, { useState, useEffect } from "react";
import FormWrapper from "../FormWrapper";
import FormField from "../FormField";
import { StepProps, FormData } from "../../types";

interface TicketSelect {
  fullPriceTickets: string;
  reducedPriceTickets: string;
}

type TicketSelectProps = TicketSelect & StepProps & { globalValidate: boolean };

const TicketSelect = ({
  fullPriceTickets,
  reducedPriceTickets,
  updateData,
  displayErrors,
  validSteps,
  setValidSteps,
  currentStep,
}: TicketSelectProps) => {
  const [isValid, setIsValid] = useState({
    fullPriceTickets: false,
    reducedPriceTickets: false,
  });
  const [globalValidationError, setGlobalValidationError] = useState("");

  const validateTickets = () =>
    (fullPriceTickets && +fullPriceTickets > 0) ||
    (reducedPriceTickets && +reducedPriceTickets > 0);

  const stepIsValid = Object.values(isValid).some((value) => value === true);

  useEffect(() => {
    if (stepIsValid && !validSteps.includes(currentStep)) {
      setValidSteps((prev) => [...prev, currentStep]);
    } else if (!stepIsValid) {
      let newValidSteps = validSteps.filter((step) => step !== currentStep);
      setValidSteps(newValidSteps);
    }
  }, [stepIsValid]);

  return (
    <section className="flex gap-4">
      <FormWrapper title="Select Tickets">
        <div className="flex flex-col gap-4 items-start max-w-xs ">
          <FormField
            fieldDesc="Full Price Tickets"
            fieldName="fullPriceTickets"
            value={fullPriceTickets}
            updateData={updateData}
            displayErrors={displayErrors}
            validation={validateTickets}
            isValid={isValid}
            setIsValid={setIsValid}
            type="number"
            globalValidate={true}
            setGlobalValidationError={setGlobalValidationError}
            min="0"
            max="8"
          />
          <FormField
            fieldDesc="Reduced Price Tickets"
            fieldName="reducedPriceTickets"
            value={reducedPriceTickets}
            updateData={updateData}
            displayErrors={displayErrors}
            validation={validateTickets}
            isValid={isValid}
            setIsValid={setIsValid}
            type="number"
            globalValidate={true}
            setGlobalValidationError={setGlobalValidationError}
            min="0"
            max="8"
          />
        </div>
        {displayErrors && globalValidationError && (
          <div className="text-xs text-red-500 h-3">
            {globalValidationError}
          </div>
        )}
      </FormWrapper>
    </section>
  );
};

export default TicketSelect;
