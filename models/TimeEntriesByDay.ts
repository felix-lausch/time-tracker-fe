import { Weekday } from "./enums"
import ITimeEntry from "./ITimeEntry"

export default interface TimeEntriesByDay {
  "date": string,
  "weekday": Weekday,
  "timeEntries": ITimeEntry[],
}
