import TimeEntryInput from "../components/timeEntryInput";
import TimeEntry from "../models/TimeEntry";
import Month from "../models/Month";
import TimeEntriesByDay from "../models/TimeEntriesByDay";
import { httpFetchAsync } from "../services/httpService";

export async function getServerSideProps(_context: any) {
  let fetchResult = {};

  try {
    fetchResult = await httpFetchAsync<Month>("/dayEntries/current", "GET");
  } catch (error) {}

  return {
    props: {
      month: fetchResult,
    },
  };
}

type PostTestProps = {
  month: Month,
};

export default function PostTest({ month }: PostTestProps) {
  const timeInputProps = month?.days?.map(timeEntriesByDay => {
    var timeEntryView = undefined;

    console.log(timeEntriesByDay)

    if (timeEntriesByDay.timeEntries.length > 0) {
      timeEntryView = {
        id: timeEntriesByDay.timeEntries[0].id,
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
      <div className="flex flex-row items-center space-x-4 py-4">
        <div className="h-8 w-8 border-indigo-500 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 rounded-md text-center">
          <span className="select-none text-lg text-white font-mono font-bold">{"<"}</span>
        </div>
        <span>{`${month.monthString} ${month.year}`}</span>
        <div className="h-8 w-8 border-indigo-500 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600  rounded-md text-center">
          <span className="select-none text-lg text-white font-mono font-bold">{">"}</span>
        </div>
      </div>
        {timeInputProps?.map((prop) => (
          <div key={prop.date}>
            <TimeEntryInput
              date={prop.date}
              weekday={prop.weekday}
              timeEntryView={prop.timeEntryView}
            />
          </div>
        ))}
    </>
  );
}
