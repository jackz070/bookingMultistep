import { useState, createContext, useContext } from "react";

interface ValidStepsState {
  validSteps: number[];
  setValidSteps?: (prev: number[]) => void;
}

type AllState = ValidStepsState;

const MultistepStepValidationContext = createContext<AllState | undefined>(
  undefined
);

MultistepStepValidationContext.displayName = "MultistepStepValidationContext";

const MultistepStepValidationProvider = (props) => {
  const [validSteps, setValidSteps] = useState<ValidStepsState>([]);

  const value = {
    validSteps,
    setValidSteps,
  };

  return <MultistepStepValidationContext.Provider value={value} {...props} />;
};

const useMultistepStepValidation = () => {
  const context = useContext(MultistepStepValidationContext);

  if (context === undefined) {
    throw new Error(
      "useMultistepStepValidation must be used within a MultistepStepValidationContext context"
    );
  }
  return context;
};

export { MultistepStepValidationProvider, useMultistepStepValidation };
