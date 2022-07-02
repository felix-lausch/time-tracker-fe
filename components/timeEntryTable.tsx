import TimeEntryCard from '../components/timeEntryCard'
import TimeEntry from "../models/TimeEntry";
import { TimeSpan } from "../models/TimeSpan"
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function ({timeEntries} : { timeEntries: TimeEntry[] }) {
    const methods = useFormContext<TimeEntry>();

    const totalTimeSpan = timeEntries
        .map(timeEntry => TimeSpan.fromString(timeEntry.totalHours))
        .reduce((previousValue, currentValue) => previousValue.add(currentValue))

    const totalHoursString = totalTimeSpan.totalHours > 9 ? totalTimeSpan.totalHours : `0${totalTimeSpan.totalHours}`
    const minutesString = totalTimeSpan.minutes > 9 ? totalTimeSpan.minutes : `${totalTimeSpan.minutes}0`
    const secondsString = totalTimeSpan.seconds > 9 ? totalTimeSpan.seconds : `${totalTimeSpan.seconds}0`

    debugger
    return (
        <FormProvider {...methods}>
            <form>
                <table className="grid min-w-min w-1/2">
                    <tbody className="py-1 px-1 rounded-md border-2 border-[#ffbbdc] bg-[#ffdced]">
                        <tr>
                            <th className="px-1">Weekday</th>
                            <th className="px-1">Date</th>
                            <th className="px-1">Start</th>
                            <th className="px-1">End</th>
                            <th className="px-1">Pause</th>
                            <th className="px-1">Total</th>
                        </tr>
                        {timeEntries.map(timeEntry => <TimeEntryCard key={timeEntry.id} timeEntry={timeEntry}/>)}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="border-t-2 border-black">{totalHoursString}:{minutesString}:{secondsString}</td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" />
            </form>
        </FormProvider>
    )
}