import ITimeEntry from "../models/ITimeEntry";

export default function TimeEntryCard({timeEntry} : { timeEntry: ITimeEntry }) {

    const date = new Date(timeEntry.displayDate_US)

    const weekday = date.getDay() as WeekdayEnum


    return (
        <tr className="">
            <td className="px-1">{WeekdayEnum[weekday]}</td>
            <td className="px-1">{timeEntry.displayDate}</td>
            <td className="px-1"><input className="text-align-center" defaultValue={timeEntry.displayStartTime}/></td>
            <td className="px-1"><input defaultValue={timeEntry.displayEndTime}/></td>
            <td className="px-1"><input defaultValue={timeEntry.pauseHours}/></td>
            <td className="px-1">{timeEntry.totalHours}</td>
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