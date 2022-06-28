import Head from 'next/head'
import ITimeEntry from '../models/ITimeEntry'
import TimeEntryCard from '../components/timeEntryCard'
import { httpFetchAsync } from '../services/httpService'
import TimeEntryTable from "../components/timeEntryTable"

export async function getServerSideProps(_context: any) {
  let result: ITimeEntry[] = []

  try {
    result = await httpFetchAsync<ITimeEntry[]>("/timeEntries", "GET")
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

export default function Home({ timeEntries }) {
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
