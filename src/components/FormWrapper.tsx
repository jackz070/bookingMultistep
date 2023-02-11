import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl mb-8">{title}</h2>
      <div className="flex flex-col gap-2 mb-4 min-h-[14rem]">{children}</div>
    </div>
  );
};

export default FormWrapper;
