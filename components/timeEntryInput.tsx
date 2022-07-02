import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/input";
import { Weekday } from "../models/enums";
import TimeEntry from "../models/TimeEntry";
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
  id: string;
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
      id: "",
      start: "",
      end: "",
      pauseHours: "",
    },
    shouldFocusError: true,
  });

  const { handleSubmit, reset: initializeForm, setValue } = methods;

  useEffect(() => {
    if (timeEntryView) {
      initializeForm(timeEntryView);
    }
  }, [timeEntryView, initializeForm]);

  async function onSubmit(formData: TimeEntryView) {
    console.log(formData);

    const timeEntry = MapToTimeEntry(formData, date);


    if (timeEntry.id) {
      const postResult = await httpFetchAsync<TimeEntry>(
        "/timeEntry",
        "POST",
        timeEntry
      );

      setValue("id", postResult?.id ?? "");
      console.log(postResult);
    } else {
      const putResult = await httpFetchAsync<TimeEntry>(
        "/timeEntry/" + formData.id,
        "PUT",
        timeEntry
      );

      console.log(putResult);
    }
  }

  const isWeekend = weekday === "SATURDAY" || weekday === "SUNDAY";
  const bgColor = isWeekend ? "bg-gray-300" : "bg-indigo-200";

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
              className="border-2 h-8 w-8 rounded-md border-indigo-500 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600"
              type="submit"
            />
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
function MapToTimeEntry(timeEntryView: TimeEntryView, date: string): TimeEntry {
  const startSplit = timeEntryView.start.split(":");
  const endSplit = timeEntryView.end.split(":");

  const pauseHours =
    timeEntryView.pauseHours === ""
      ? 0
      : parseFloat(timeEntryView.pauseHours.replace(",", "."));

  const timeEntry: TimeEntry = {
    id: timeEntryView.id === "" ? undefined : timeEntryView.id,
    date: date,
    startHours: parseInt(startSplit[0]),
    startMinutes: parseInt(startSplit[1]),
    endHours: parseInt(endSplit[0]),
    endMinutes: parseInt(endSplit[1]),
    pauseHours: pauseHours,
    displayEndTime: "",
    displayStartTime: "",
    totalHours: "", //TODO: what to do with these ? i think i should split the model OR better even simplify the model to not use all the ints at all
  }

  return timeEntry;
}

