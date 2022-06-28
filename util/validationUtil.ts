import { RegisterOptions } from "react-hook-form";
import { DecimalHoursRegex, HoursMinutesRegex } from "./regexUtil";

export const RequiredValidation: RegisterOptions = {
  required: { value: true, message: "This is required." },
}

export const HoursMinutesValidation: RegisterOptions = {
  ...RequiredValidation,
  pattern: { value: HoursMinutesRegex, message: "Format 'hh:mm' required."}
}

export const DecimalHoursValidation: RegisterOptions = {
  pattern: { value: DecimalHoursRegex, message: "Number with 0-2 decimals required."}
}