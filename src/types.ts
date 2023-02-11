import { Dispatch, SetStateAction } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  fullPriceTickets: string;
  reducedPriceTickets: string;
  selectedSeats: string[];
  emailAdress: string;
}
//TODO fix ticket selection types as they vary between string and number all over the place
export interface StepProps {
  updateData: (data: Partial<FormData>) => void;
  displayErrors: boolean;
  validSteps: number[];
  setValidSteps: Dispatch<SetStateAction<number[]>>;
  currentStep: number;
}
