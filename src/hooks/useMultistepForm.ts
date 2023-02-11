import { ReactElement, useState } from "react";
import { useMultistepStepValidation } from "../context/MultistepStepValidationContext";

export const useMultistepForm = (steps: ReactElement[]) => {
  const [currentStep, setCurrentStep] = useState(0);
//TODO touched state for fields to display errors on next() if untouched, atm the errors object is empty so there is nothing displayed
//TODO remove submit attempted multiples
  const { validSteps, setValidSteps, submitAttempted, setSubmitAttempted } =
    useMultistepStepValidation();

  const next = () => {
    if (validSteps.includes(currentStep + 1)) {
      setCurrentStep((step) => (step >= steps.length ? step : step + 1));
    } else {
      let modifiedSubmitAttempted = [...submitAttempted, currentStep + 1];
      if (setSubmitAttempted) {
        setSubmitAttempted(modifiedSubmitAttempted);
      }
    }
  };

  const prev = () => {
    setCurrentStep((step) => (step <= 0 ? step : step - 1));
  };

  return {
    steps,
    currentStep,
    step: steps[currentStep],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    next,
    prev,
  };
};
