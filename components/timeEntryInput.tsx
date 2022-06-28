import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/input";
import { Weekday } from "../models/enums";
import TimeEntry from "../models/ITimeEntry";
import { httpFetchAsync } from "../services/httpService";
import {
  HoursMinutesValidation,
  DecimalHoursValidation,
} from "../util/validationUtil";

export type TimeEntryInputProps = {
  timeEntryView?: TimeEntryView;
  weekday: Weekday;
  date: string;
  wrapperClassName?: string;
};

export type TimeEntryView = {
  start: string;
  end: string;
  pauseHours: string;
};

export default function TimeEntryInput({
  timeEntryView,
  date,
  weekday,
  wrapperClassName,
}: TimeEntryInputProps) {
  const methods = useForm<TimeEntryView>({
    mode: "onSubmit",
    defaultValues: {
      start: "",
      end: "",
      pauseHours: "",
    },
    shouldFocusError: true,
  });

  const { handleSubmit, reset: initializeForm } = methods;

  const isUpdate = Boolean(timeEntryView);
  const [hasInitializedData, setHasInitializedData] = useState(false);

  useEffect(() => {
    if (timeEntryView && !hasInitializedData) {
      initializeForm(timeEntryView);
      setHasInitializedData(true);
    }
  }, [timeEntryView, initializeForm, hasInitializedData]);

  async function onSubmit(formData: TimeEntryView) {
    console.log(formData);

    const startSplit = formData.start.split(":");
    const endSplit = formData.end.split(":");

    const pauseHours =
      formData.pauseHours === ""
        ? 0
        : parseFloat(formData.pauseHours.replace(",", "."));

    const body = {
      startHours: parseInt(startSplit[0]),
      startMinutes: parseInt(startSplit[1]),
      endHours: parseInt(endSplit[0]),
      endMinutes: parseInt(endSplit[1]),
      pauseHours: pauseHours,
    };

    const postResult = await httpFetchAsync<TimeEntry>(
      "/timeEntry",
      "POST",
      body
    );

    console.log(postResult);
  }

  const bgColor =
    weekday === "SATURDAY" || weekday === "SUNDAY" ? "bg-gray-300" : "bg-indigo-200";

  return (
    <div className={wrapperClassName}>
      <FormProvider {...methods}>
        <div className="p-1">
          <form
            className="grid grid-cols-5 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className={`my-auto font-semibold p-1 text-center border opacity-70 rounded-md ${bgColor}`}>
              {date}
            </p>
            <Input
              placeholder={"start hh:mm"}
              name={"start"}
              registerOptions={HoursMinutesValidation}
            />
            <Input
              placeholder={"end hh:mm"}
              name={"end"}
              registerOptions={HoursMinutesValidation}
            />
            <Input
              placeholder={"pauseHours"}
              name={"pauseHours"}
              registerOptions={DecimalHoursValidation}
            />
            <button
              className="border-2 h-8 w-8 rounded-md border-indigo-500 bg-indigo-400 hover:bg-indigo-500"
              type="submit"
            />
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
