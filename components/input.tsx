import { useEffect, useState } from "react";
import {
  FormState,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

export type InputProps = {
  placeholder: string;
  name: string;
  registerOptions: RegisterOptions;
  wrapperClassName?: string;
};

export default function Input({
  placeholder,
  name,
  registerOptions,
  wrapperClassName,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [borderColor, setBorderColor] = useState("border-gray-500");

  useEffect(() => {
    if (Boolean(errors[name])) {
      setBorderColor("border-pink-600 focus:border-pink-600 bg-pink-100")
    } else {
      setBorderColor("border-gray-500")
    }
  }, [errors[name], setBorderColor]);

  return (
    <div className={wrapperClassName}>
      <div className="flex flex-col">
        <input
          {...register(name, registerOptions)}
          className={`border ${borderColor} rounded-md px-2 py-1`}
          placeholder={placeholder}
        />
        {/* {Boolean(errors[name]) && (
          <span className="text-sm leading-none text-pink-600 text-opacity-60">
            {errors["start"]?.message}
          </span>
        )} */}
      </div>
    </div>
  );
}
