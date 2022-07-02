import { Weekday } from "./enums"
import TimeEntry from "./TimeEntry"

export default interface TimeEntriesByDay {
  "date": string,
  "weekday": Weekday,
  "timeEntries": TimeEntry[],
}
