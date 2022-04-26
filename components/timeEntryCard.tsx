import ITimeEntry from "../models/ITimeEntry";

export default function TimeEntryCard({timeEntry} : { timeEntry: ITimeEntry }) {
    return (
        <>
            <p>Date: {timeEntry.displayDate}</p>
            <p>Start: {timeEntry.displayStartTime}</p>
            <p>End: {timeEntry.displayEndTime}</p>
            <p>Pause Hours: {timeEntry.pauseHours}</p>
            <p>Total Hours: {timeEntry.totalHours}</p>
        </>
    )
}