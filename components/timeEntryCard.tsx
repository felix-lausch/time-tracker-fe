import ITimeEntry from "../models/ITimeEntry";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form"

export default function TimeEntryCard({timeEntry} : { timeEntry: ITimeEntry }) {
    const { register, formState: { errors } } = useForm<ITimeEntry>();

    const date = new Date(timeEntry.displayDate_US)

    const weekday = date.getDay() as WeekdayEnum

    const handleSubmit = (formInput) => {
        console.log(formInput)
    }

    return (
        <tr className="bg-white">
            {/* <form onSubmit={handleSubmit}> */}
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">{WeekdayEnum[weekday]}</td>
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">{timeEntry.displayDate}</td>
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">
                    <input
                        {...register("displayStartTime", { pattern: /(0-9)[1,2]:(0-9)[2]/} )}
                        className="mx-auto w-1/2"
                        defaultValue={timeEntry.displayStartTime}/>
                </td>
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">
                    <input
                        {...register("displayEndTime")}
                        className="mx-auto w-1/2"
                        defaultValue={timeEntry.displayEndTime}/>
                </td>
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">
                    <input
                        {...register("pauseHours")}
                        className="w-1/3"
                        defaultValue={timeEntry.pauseHours}/>
                </td>
                <td className="whitespace-nowrap px-1 bg-[#ffdced]">{timeEntry.totalHours}</td>
            {/* </form> */}
        </tr>
    )
}       

enum WeekdayEnum {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}