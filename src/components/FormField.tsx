import React, { useEffect, useState } from "react";
import { FieldProps } from "../types";

type FormFieldProps = FieldProps & {
  fieldDesc: string;
  fieldName: string;
  value: string;
  type: string;
  validation: (...args: any) => boolean | string | void;
  isValid: string[] | {};
  setIsValid: (value: any) => void;
  globalValidate?: boolean;
  setGlobalValidationError?: (value: string) => void;
  min?: string;
  max?: string;
  notice?: string;
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
  min,
  max,
  notice,
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
  }, [displayErrors, value]);

  return (
    <div className="flex flex-col gap-1 items-start mb-1 w-full ">
      <label
        className="sm:text-sm text-lg text-gray-600 font-light relative"
        htmlFor={fieldName}
      >
        {fieldDesc}
        {notice && (
          <>
            <span
              onTouchStart={() => {}}
              className="ml-2 border-b-[1px] border-black border-dotted cursor-pointer hover:text-blue-500 peer inline-block w-3 text-center"
            >
              ?
            </span>
            <div
              className="absolute bg-white border-[1px] border-blue-200 rounded-md p-4 invisible 
            peer-hover:visible -right-6 top-6 w-[90%]"
            >
              {notice}
            </div>
          </>
        )}
      </label>

      <input
        id={fieldName}
        type={type}
        value={value}
        inputMode={type === "number" ? "numeric" : "text"}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateAndValidate(e.target.value)
        }
        className={`border-[1px] rounded-lg border-blue-200 p-2 sm:text-base text-lg sm:min-w-[10rem] min-w-[12rem] w-full ${
          type === "number" ? "text-center" : null
        }`}
        onFocus={() => {
          setIsFocused(true);
          if (type === "number" && value === "0") {
            updateAndValidate("");
          }
        }}
        onBlur={(e) => {
          updateAndValidate(e.target.value);
          setIsFocused(false);
          if (type === "number" && value === "") {
            updateAndValidate("0");
          }
        }}
        min={min ? min : undefined}
        max={max ? max : undefined}
      />

      <div className="text-xs text-red-500 h-3" role="alert">
        {!globalValidate &&
          (displayErrors || (touched && blurredOnce)) &&
          error &&
          error}
      </div>
    </div>
  );
};

export default FormField;
