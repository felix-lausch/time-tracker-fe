import TimeEntryInput from "../components/timeEntryInput";
import ITimeEntry from "../models/ITimeEntry";
import { httpFetchAsync } from "../services/httpService";

export async function getServerSideProps(_context: any) {
  let fetchResult: ITimeEntry[] = [];

  try {
    fetchResult = await httpFetchAsync<ITimeEntry[]>("/timeEntries", "GET");
  } catch (error) {}

  return {
    props: {
      timeEntries: fetchResult,
    },
  };
}

type PostTestProps = {
  timeEntries: ITimeEntry[];
};

export default function PostTest({ timeEntries }: PostTestProps) {
  console.log({timeEntries});
  
  const timeInputProps = timeEntries.map(timeEntry => {
    return {
      date: timeEntry.displayDate,
      weekday: timeEntry.weekday,
      timeEntryView: {
        start: timeEntry.displayStartTime,
        end: timeEntry.displayEndTime,
        pauseHours: String(timeEntry.pauseHours),
      },
    }
  });

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
