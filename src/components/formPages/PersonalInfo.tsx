import { useEffect, useState } from "react";
import FormWrapper from "../FormWrapper";
import FormField from "../FormField";
import {
  validateEmail,
  validateLastName,
  validateFirstName,
} from "../../validation";
import { StepProps } from "../../types";
import { FormData } from "../../types";

type PersonalInfoProps = FormData & StepProps;

const PersonalInfo = ({
  firstName,
  lastName,
  emailAdress,
  updateData,
  displayErrors,
  validSteps,
  setValidSteps,
  currentStep,
}: PersonalInfoProps) => {
  const [isValid, setIsValid] = useState({
    firstName: false,
    lastName: false,
    emailAdress: false,
  });

  const stepIsValid = Object.values(isValid).every((value) => value === true);

  useEffect(() => {
    if (stepIsValid && !validSteps.includes(currentStep)) {
      setValidSteps((prev) => [...prev, currentStep]);
    } else if (!stepIsValid) {
      let newValidSteps = validSteps.filter((step) => step !== currentStep);
      setValidSteps(newValidSteps);
    }
  }, [stepIsValid]);

  return (
    <FormWrapper title="Personal Info">
      <FormField
        fieldDesc="First Name"
        fieldName="firstName"
        value={firstName}
        updateData={updateData}
        displayErrors={displayErrors}
        validation={validateFirstName}
        isValid={isValid}
        setIsValid={setIsValid}
        type="text"
      />
      <FormField
        fieldDesc="Last Name"
        fieldName="lastName"
        value={lastName}
        updateData={updateData}
        displayErrors={displayErrors}
        validation={validateLastName}
        isValid={isValid}
        setIsValid={setIsValid}
        type="text"
      />
      <FormField
        fieldDesc="Email"
        fieldName="emailAdress"
        value={emailAdress}
        updateData={updateData}
        displayErrors={displayErrors}
        validation={validateEmail}
        isValid={isValid}
        setIsValid={setIsValid}
        type="text"
      />
    </FormWrapper>
  );
};

export default PersonalInfo;
