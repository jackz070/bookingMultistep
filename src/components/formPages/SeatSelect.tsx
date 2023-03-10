import React, { lazy, useEffect, useState } from "react";
import FormWrapper from "../FormWrapper";
import { StepProps } from "../../types";

interface SeatSelect {
  selectedSeats: string[];
  fullPriceTickets: string;
  reducedPriceTickets: string;
}

type SeatSelectProps = SeatSelect & StepProps;

const seats = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

const SeatSelect = ({
  selectedSeats,
  fullPriceTickets,
  reducedPriceTickets,
  updateData,
  validSteps,
  setValidSteps,
  currentStep,
  displayErrors,
}: SeatSelectProps) => {
  const stepIsValid =
    selectedSeats.length === +fullPriceTickets + +reducedPriceTickets;
  const [error, setError] = useState("");

  const handleUpdateSelectedSeats = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const clickedSeat = e.target.value;

    if (
      !stepIsValid &&
      selectedSeats.length < +fullPriceTickets + +reducedPriceTickets
    ) {
      const updatedSeats = selectedSeats.includes(clickedSeat)
        ? selectedSeats.filter((seat) => seat !== clickedSeat)
        : [...selectedSeats, e.target.value];

      updateData({ selectedSeats: updatedSeats });
    } else {
      if (selectedSeats.includes(clickedSeat)) {
        const updatedSeats = selectedSeats.includes(clickedSeat)
          ? selectedSeats.filter((seat) => seat !== clickedSeat)
          : undefined;
        updateData({ selectedSeats: updatedSeats });
      }
    }
  };

  useEffect(() => {
    if (stepIsValid && !validSteps.includes(currentStep)) {
      setValidSteps((prev) => [...prev, currentStep]);
      setError("");
    } else if (!stepIsValid) {
      let newValidSteps = validSteps.filter((step) => step !== currentStep);
      setValidSteps(newValidSteps);
      setError(
        `Select ${+fullPriceTickets + +reducedPriceTickets} seat${
          +fullPriceTickets + +reducedPriceTickets > 1 ? "s" : ""
        }`
      );
    }
  }, [stepIsValid]);

  return (
    <FormWrapper title="Choose Your Seats">
      <p className="text-sm font-light text-gray-700 -mt-3 mb-3">
        Top of the chart is front of the bus. Unavailable seats are shown in
        gray.
      </p>
      <div
        className="w-full flex justify-center
      "
      >
        <div className="grid grid-cols-4 gap-y-2 sm:h-44 h-64 w-fit">
          {seats.map((seat, index) => (
            <div
              key={seat}
              className={`flex justify-center ${
                parseInt(seat) % 2 === 0 && parseInt(seat) % 4 !== 0
                  ? "mr-6"
                  : null
              } ${index % 2 === 0 && index % 4 !== 0 ? "ml-6" : null}`}
            >
              <label htmlFor={seat}>
                <input
                  id={seat}
                  name={seat}
                  value={seat}
                  checked={selectedSeats.includes(seat)}
                  type="checkbox"
                  onChange={(e) => handleUpdateSelectedSeats(e)}
                  className="sm:w-6 sm:h-6 w-9 h-9 opacity-0 peer absolute cursor-pointer"
                />
                <label
                  htmlFor={seat}
                  className="sm:w-6 sm:h-6 w-9 h-9 bg-blue-100 text-gray-700 peer-checked:bg-blue-400 peer-checked:text-white rounded-md flex items-center justify-center sm:text-xs text-base"
                >
                  {seat}
                </label>
              </label>
            </div>
          ))}
        </div>
      </div>
      {displayErrors && error.length > 0 && (
        <div className="text-xs text-red-500 h-3 mt-4 ml-4">{error}</div>
      )}
    </FormWrapper>
  );
};

export default SeatSelect;
