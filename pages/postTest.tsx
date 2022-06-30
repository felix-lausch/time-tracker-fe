import TimeEntryInput from "../components/timeEntryInput";
import ITimeEntry from "../models/ITimeEntry";
import TimeEntriesByDay from "../models/TimeEntriesByDay";
import { httpFetchAsync } from "../services/httpService";

export async function getServerSideProps(_context: any) {
  let fetchResult: TimeEntriesByDay[] = [];

  try {
    // fetchResult = await httpFetchAsync<ITimeEntry[]>("/timeEntries", "GET");
    fetchResult = await httpFetchAsync<TimeEntriesByDay[]>("/dayEntries/current", "GET");
  } catch (error) {}

  return {
    props: {
      timeEntriesByDay: fetchResult,
    },
  };
}

type PostTestProps = {
  timeEntries: ITimeEntry[];
  timeEntriesByDay: TimeEntriesByDay[];
};

export default function PostTest({ timeEntriesByDay }: PostTestProps) {
  // console.log({timeEntries});
  
  // const timeInputProps = timeEntries.map(timeEntry => {
  //   return {
  //     date: timeEntry.displayDate,
  //     weekday: timeEntry.weekday,
  //     timeEntryView: {
  //       start: timeEntry.displayStartTime,
  //       end: timeEntry.displayEndTime,
  //       pauseHours: String(timeEntry.pauseHours),
  //     },
  //   }
  // });

  const timeInputProps = timeEntriesByDay.map(timeEntriesByDay => {
    var timeEntryView = undefined;

    console.log(timeEntriesByDay)

    if (timeEntriesByDay.timeEntries.length > 0) {
      timeEntryView = {
        start: timeEntriesByDay.timeEntries[0].displayStartTime,
        end: timeEntriesByDay.timeEntries[0].displayEndTime,
        pauseHours: String(timeEntriesByDay.timeEntries[0].pauseHours),
      }
    }

    return {
      date: timeEntriesByDay.date,
      weekday: timeEntriesByDay.weekday,
      timeEntryView: timeEntryView,
    }
  })

  return (
    <>
      <div className="">
        {timeInputProps.map((prop) => (
          <div key={prop.date}>
            <TimeEntryInput
              date={prop.date}
              weekday={prop.weekday}
              timeEntryView={prop.timeEntryView}
            />
          </div>
        ))}
      </div>
    </>
  );
}
