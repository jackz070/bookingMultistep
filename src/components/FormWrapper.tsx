import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className="flex flex-col sm:h-[23rem] mt-12 h-[25rem] w-full">
      <h2 className="sm:text-3xl text-3xl sm:mb-8 mb-12 font-bold sm:text-black text-white z-20">
        {title}
      </h2>
      <div className="flex flex-col gap-1 mb-2 ">{children}</div>
    </div>
  );
};

export default FormWrapper;
