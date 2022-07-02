import { Weekday } from "./enums"

export default interface TimeEntry {
    "id"?: string,
    "date": string,
    "startHours": number,
    "startMinutes": number,
    "displayStartTime": string,
    "endHours": number,
    "endMinutes": number,
    "displayEndTime": string,
    "pauseHours": number,
    "totalHours": string,
}