import Head from 'next/head'
import TimeEntry from '../models/TimeEntry'
import { httpFetchAsync } from '../services/httpService'
import TimeEntryTable from "../components/timeEntryTable"

export async function getServerSideProps(_context: any) {
  let result: TimeEntry[] = []

  try {
    result = await httpFetchAsync<TimeEntry[]>("/timeEntries", "GET")
  }
  catch (error){
    //TODO: what can i do here?
    // console.log(error)
  }
  
  return {
    props: {
      timeEntries: result
    }
  }
}

type HomeProps = {
  timeEntries: TimeEntry[],
}

export default function Home({ timeEntries }: HomeProps) {
  if (!timeEntries || timeEntries.length === 0) return <div>failed to load time entries :/</div>

  // console.log(timeEntries)

  return (
    <div className="font-mono">
      <Head>
        <title>TimeTracker</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <br/>
        <TimeEntryTable timeEntries={timeEntries}></TimeEntryTable>
      </main>
    </div>
  )
}
