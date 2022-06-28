import TimeEntryInput, {
  TimeEntryView,
  Weekday,
} from "../components/timeEntryInput";
import ITimeEntry from "../models/ITimeEntry";
import { httpFetchAsync } from "../services/httpService";

export async function getServerSideProps(_context: any) {
  let result: ITimeEntry[] = []

  try {
    result = await httpFetchAsync<ITimeEntry[]>("/timeEntries", "GET")
  }
  catch (error){
  }
  
  return {
    props: {
      timeEntries: result
    }
  }
}

export default function PostTest() {
  const testTimeInputProps = [
    {
      date: "01.06.2022",
      weekday: "MONDAY",
      timeEntryView: {
        start: "7:30",
        end: "15:00",
        pauseHours: "2",
      },
    },
    {
      date: "02.06.2022",
      weekday: "TUESDAY",
      timeEntryView: {
        start: "8:30",
        end: "15:00",
        pauseHours: "1",
      },
    },
    {
      date: "03.06.2022",
      weekday: "WEDNESDAY",
      timeEntryView: {
        start: "7:30",
        end: "15:00",
        pauseHours: "2",
      },
    },
    {
      date: "04.06.2022",
      weekday: "THURSDAY",
      timeEntryView: {
        start: "7:30",
        end: "15:00",
        pauseHours: "2",
      },
    },
    {
      date: "05.06.2022",
      weekday: "FRIDAY",
      timeEntryView: {
        start: "7:30",
        end: "15:00",
        pauseHours: "2",
      },
    },
    {
      date: "06.06.2022",
      weekday: "SATURDAY",
    },
    {
      date: "07.06.2022",
      weekday: "SUNDAY",
    },
    {
      date: "08.06.2022",
      weekday: "MONDAY",
    },
    {
      date: "09.06.2022",
      weekday: "TUESDAY",
    },
  ];

  return (
    <>
      <div className="">
        {testTimeInputProps.map((prop, index) => (
          <div key={index}>
            <TimeEntryInput
              date={prop.date}
              weekday={prop.weekday as Weekday}
              wrapperClassName={""}
              timeEntryView={prop.timeEntryView}
            />
          </div>
        ))}
      </div>
    </>
  );
}
