import TimeEntriesByDay from "./TimeEntriesByDay";

export default interface Month {
  days: TimeEntriesByDay[],
  monthString: string,
  month: Number,
  year: Number,
}