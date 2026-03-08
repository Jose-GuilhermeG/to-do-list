import SideBar from "@/layout/SideBar"

export function Home() {
  const taskLists = [
    {id : 0 , name : "teste"},
    {id : 0 , name : "teste"},
    {id : 0 , name : "teste"},
  ]

  return (
    <main className="min-h-screen min-w-screen bg-neutral-100 relative">
      <SideBar taskLists={taskLists}/>
    </main>
  )
}

export default Home
