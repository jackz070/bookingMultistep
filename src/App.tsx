import { useState } from "react";
import PersonalInfo from "./components/formPages/PersonalInfo";
import SeatSelect from "./components/formPages/SeatSelect";
import Summary from "./components/formPages/Summary";
import TicketSelect from "./components/formPages/TicketSelect";
import { FormData } from "./types";

//VALIDATION FLOW needs: field is ready state, unless that's true it has an error listed in errors array. Next button disabled until all fields in here have ready === true. Errors display after user leaves the field with invalid data present (including no data) or clicks disabled button (if its possible)

//IDEA field component that does the validation with provided function, knows its name, has a ref AND and a formStep component that handles if we can go further. Goal: ability to move fields within steps freely and steps within form too. Field component gets validation function from box of those, checks value against it, sets "ready" flag in the step component, displays error if needed. To start it's just text field

const INIT_DATA: FormData = {
  firstName: "",
  lastName: "",
  fullPriceTickets: "",
  reducedPriceTickets: "",
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
    if (validSteps.includes(currentStep)) {
      setCurrentStep((step) => (step >= steps.length ? step : step + 1));
      setDisplayErrors(false);
    } else {
      setDisplayErrors(true);
    }
  };

  const prev = () => {
    setCurrentStep((step) => (step <= 0 ? step : step - 1));
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
    <div className="w-full h-[100vh] flex  items-center justify-center bg-slate-200">
      <div className="w-1/3 h-3/5 bg-white relative  min-h-[28rem] min-w-[40rem] flex sm:flex-row flex-col-reverse">
        <form onSubmit={onSubmit} className="p-12 pt-20">
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
              className="bg-blue-400 text-white py-2 px-6 rounded-md cursor-pointer disabled:bg-blue-300 disabled:text-gray-100 hover:bg-blue-300"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
