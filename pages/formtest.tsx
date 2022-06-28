import { useForm, SubmitHandler, useFormContext } from "react-hook-form"
import ITimeEntry from "../models/ITimeEntry"

export default function() {
    const { handleSubmit, register, formState: { errors } } = useForm<ITimeEntry>();

    const onSubmit = (formInput: ITimeEntry) => {
      console.log(formInput)
    }

    const timeEntry = {
      displayDate: "03.05.2022",
      displayStartTime: "09:00",
      displayEndTime: "16:30",
      pauseHours: "1,25",
      totalHours: "9:00"
    }

    const timeInputRegex = /^(2[0-3]|[01]?\d{2}):([0-5]?\d{2})$/
    const pauseHoursRegex = /^\s*-?\d+(\,\d{1,2})?\s*$/

    const inputClassName = (registerName: string) => {
      const baseClassName = " outline-none rounded"

      if (errors[registerName]) {
        return "bg-red-100 focus:ring-red-200 focus:border-red-400" + baseClassName
      }

      return "bg-gray-100 focus:ring-purple-300 focus:border-purple-500" + baseClassName;
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md grid grid-cols-6 gap-2 bg-gray-200 border-2 p-1">
          <div className="flex justify-center items-center">
            <p>
              {timeEntry.displayDate}
            </p>
          </div>
          {/* <div className="mx-2"> */}
              <input
                type="text"
                {...register("displayStartTime", { pattern: /^(2[0-3]|[01]?\d{2}):([0-5]?\d{2})$/} )}
                className={inputClassName("displayStartTime")}
                defaultValue={timeEntry.displayStartTime}/>
          {/* </div> */}
          {/* <div className="mx-2"> */}
              <input
                type="text"
                {...register("displayEndTime", { pattern: timeInputRegex} )}
                className={inputClassName("displayEndTime")}
                defaultValue={timeEntry.displayEndTime}/>
          {/* </div> */}
          {/* <div className="mx-2"> */}
              <input
                type="text"
                {...register("pauseHours", { pattern: pauseHoursRegex})}
                className={inputClassName("pauseHours")}
                defaultValue={timeEntry.pauseHours}/>
          {/* </div> */}
          <div className="flex justify-center items-center">
            <p>
              {timeEntry.totalHours}
            </p>
          </div>
          <input className="bg-purple-300 hover:bg-purple-400 active:bg-purple-500 border border-gray-500 active:border-purple-600 rounded-lg" type="submit"/>
        </div>
      </form>
    )
}