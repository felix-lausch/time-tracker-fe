import TimeEntryCard from '../components/timeEntryCard'
import ITimeEntry from "../models/ITimeEntry";
import { TimeSpan } from "../models/TimeSpan"

export default function ({timeEntries} : { timeEntries: ITimeEntry[] }) {
    const idk = TimeSpan.fromString(timeEntries[0].totalHours);

    const totalTimeSpan = timeEntries
        .map(timeEntry => TimeSpan.fromString(timeEntry.totalHours))
        .reduce((previousValue, currentValue) => previousValue.add(currentValue))


    debugger
    return (
        <table className="grid min-w-min w-1/2">
            <tbody className="py-1 px-1 rounded-md border-indigo-600 border-2">
                <tr className="text-left">
                    <th className="px-1">Weekday</th>
                    <th className="px-1">Date</th>
                    <th className="px-1">Start</th>
                    <th className="px-1">End</th>
                    <th className="px-1">Pause</th>
                    <th className="px-1">Total</th>
                </tr>
                {timeEntries.map(timeEntry => <TimeEntryCard key={timeEntry.id} timeEntry={timeEntry}/>)}
            </tbody>
            <tfoot>
                <tr>
                    <td>Wochensumme: {totalTimeSpan.totalHours}:{totalTimeSpan.minutes}:{totalTimeSpan.seconds}</td>
                </tr>
            </tfoot>
        </table>
    )
}