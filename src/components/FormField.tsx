import React, { useEffect, useRef, useState } from "react";
import { FormData, StepProps } from "../types";

type FormFieldProps = FormData &
  StepProps & {
    fieldDesc: string;
    fieldName: string;
    value: string;
    type: string;
    validation: (...args: any) => boolean | string | void;
    isValid: string[] | {};
    setIsValid: (value: any) => void;
    globalValidate: boolean;
    setGlobalValidationError?: (value: string) => void;
  };

const FormField = ({
  fieldDesc,
  fieldName,
  value,
  updateData,
  displayErrors,
  isValid,
  setIsValid,
  validation,
  type,
  globalValidate = false,
  setGlobalValidationError,
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [blurredOnce, setBlurredOnce] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isFocused) {
      touched === false ? setTouched(true) : null;
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      touched === true ? setBlurredOnce(true) : null;
    }
  }, [isFocused]);

  const inputRef = useRef(null);
  // IF validation function without params let it be ()=>void to validate against data in state (optional globalValidation param?)
  const updateAndValidate = (value: string) => {
    updateData({ [fieldName]: value });

    if (globalValidate) {
      if (validation()) {
        setError("");
        if (setGlobalValidationError) {
          setGlobalValidationError("");
        }
        let newValid = { ...isValid, [fieldName]: true };
        setIsValid(newValid);
      } else {
        setError(`Please choose at least one ticket`);
        if (setGlobalValidationError) {
          setGlobalValidationError(`Please choose at least one ticket`);
        }
        let newValid = { ...isValid, [fieldName]: false };
        setIsValid(newValid);
      }
    } else {
      if (validation(value)) {
        setError("");
        let newValid = { ...isValid, [fieldName]: true };
        setIsValid(newValid);
      } else {
        setError(`Please enter valid ${fieldDesc.toLowerCase()}`);
        let newValid = { ...isValid, [fieldName]: false };
        setIsValid(newValid);
      }
    }
  };

  useEffect(() => {
    updateAndValidate(value);
  }, [displayErrors]);

  return (
    <div className="flex flex-col gap-1 items-start mb-1">
      <label className="text-sm ">{fieldDesc}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => updateAndValidate(e.target.value)}
        className="bg-gray-200 p-1"
        ref={inputRef}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          updateAndValidate(e.target.value);
          setIsFocused(false);
        }}
      />

      <div className="text-xs text-red-500 h-3">
        {!globalValidate &&
          (displayErrors || (touched && blurredOnce)) &&
          error &&
          error}
      </div>
    </div>
  );
};

export default FormField;
