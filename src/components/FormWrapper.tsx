import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className="flex flex-col sm:h-[22rem] sm:mt-0 mt-12 h-[25rem] z-10">
      <h2 className="text-3xl sm:mb-8 mb-12 font-bold">{title}</h2>
      <div className="flex flex-col gap-1 mb-2">{children}</div>
    </div>
  );
};

export default FormWrapper;
