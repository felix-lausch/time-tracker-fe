import { Weekday } from "./enums"

export default interface ITimeEntry {
    "id": string
    "displayDate": string
    "displayDate_US": string
    "weekday": Weekday
    "startHours": number
    "startMinutes": number
    "displayStartTime": string
    "endHours": number
    "endMinutes": number
    "displayEndTime": string
    "pauseHours": number
    "totalHours": string
}