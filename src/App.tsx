import { useState } from "react";
import PersonalInfo from "./components/formPages/PersonalInfo";
import SeatSelect from "./components/formPages/SeatSelect";
import Summary from "./components/formPages/Summary";
import TicketSelect from "./components/formPages/TicketSelect";
import { FormData } from "./types";
import pic1 from "./assets/pic1.jpg";

const INIT_DATA: FormData = {
  firstName: "",
  lastName: "",
  fullPriceTickets: "0",
  reducedPriceTickets: "0",
  selectedSeats: [],
  emailAdress: "",
};

function App() {
  const [data, setData] = useState(INIT_DATA);

  const updateData = (data: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...data };
    });
  };

  const [validSteps, setValidSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayErrors, setDisplayErrors] = useState(false);
  const currentStepIsValid = validSteps.includes(currentStep);

  const steps = [
    <TicketSelect
      {...data}
      updateData={updateData}
      displayErrors={displayErrors}
      validSteps={validSteps}
      setValidSteps={setValidSteps}
      currentStep={currentStep}
      globalValidate={true}
    />,
    <SeatSelect
      {...data}
      updateData={updateData}
      displayErrors={displayErrors}
      validSteps={validSteps}
      setValidSteps={setValidSteps}
      currentStep={currentStep}
    />,

    <PersonalInfo
      {...data}
      updateData={updateData}
      displayErrors={displayErrors}
      validSteps={validSteps}
      setValidSteps={setValidSteps}
      currentStep={currentStep}
    />,

    <Summary {...data} />,
  ];

  const next = () => {
    if (currentStepIsValid) {
      setCurrentStep((step) => (step >= steps.length ? step : step + 1));
      setDisplayErrors(false);
    } else {
      setDisplayErrors(true);
    }
  };

  const prev = () => {
    setCurrentStep((step) => (step <= 0 ? step : step - 1));
    setDisplayErrors(false);
  };

  let step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLastStep) return next();
    alert("Done");
  };

  return (
    <div className="w-full h-[100vh] flex  items-center justify-center sm:bg-slate-200 bg-white">
      <div className="w-[100vw] sm:w-[38rem] h-full sm:h-2/5 sm:bg-white bg-transparent relative  min-h-[31rem] flex ">
        <form onSubmit={onSubmit} className="p-12 pt-20  sm:w-[60%] w-full">
          <div
            className="absolute top-12 left-12 text-sm
        "
          >
            {currentStep + 1} / {steps.length}
          </div>
          {step}
          <div className="flex gap-4 ">
            {!isFirstStep && (
              <button
                type="button"
                onClick={prev}
                className="py-2 px-6 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-200"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`${
                !isLastStep ? "bg-blue-400" : ""
              } text-white py-2 px-6 rounded-md cursor-pointer ${
                !currentStepIsValid &&
                !isLastStep &&
                `bg-blue-300 text-gray-100 `
              } hover:bg-blue-300 ${
                isLastStep && "bg-green-500 hover:bg-green-400"
              }`}
            >
              {isLastStep ? "Confirm" : "Next"}
            </button>
          </div>
        </form>
        <div className="overflow-hidden sm:block hidden -top-80 ">
          <img src={pic1} className="h-full w-full rounded-r-sm opacity-95 " />
        </div>
      </div>
    </div>
  );
}

export default App;
