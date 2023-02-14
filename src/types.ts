import { Dispatch, SetStateAction } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  fullPriceTickets: string;
  reducedPriceTickets: string;
  selectedSeats: string[];
  emailAdress: string;
}

export interface StepProps {
  updateData: (data: Partial<FormData>) => void;
  displayErrors: boolean;
  validSteps: number[];
  setValidSteps: Dispatch<SetStateAction<number[]>>;
  currentStep: number;
}

export interface FieldProps {
  updateData: (data: Partial<FormData>) => void;
  displayErrors: boolean;
}
