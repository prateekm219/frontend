import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, RadialBarChart, RadialBar } from 'recharts'


export default function Dashboard(){
  const nav = useNavigate()
  const [user,setUser] = useState(null)
  useEffect(()=>{
    const u = localStorage.getItem('user')
    if(u) setUser(JSON.parse(u))
  },[])
  const appointmentsData = [
  { m: 'Jan', a: 1 }, { m: 'Feb', a: 0 }, { m: 'Mar', a: 2 }, { m: 'Apr', a: 1 },
  { m: 'May', a: 3 }, { m: 'Jun', a: 2 }, { m: 'Jul', a: 1 }, { m: 'Aug', a: 2 }
];
const wellness = 68; // fake wellness score

  return (
    <div>
      <Sidebar/>
      <div className="ml-64 p-8 space-y-6 animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold">Welcome back{user ? `, ${user.fullName}` : ''} 👋</h1>
          <p className="opacity-90">Here’s your health overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-emerald-100 text-emerald-800 shadow hover:shadow-emerald-300 transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold mb-2">📅 Upcoming Appointment</h2>
            <p>No appointments yet.</p>
            <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-xl hover:scale-105" onClick={()=>nav('/patient/appointments/request')}>Book Now</button>
          </div>
          <div className="rounded-2xl p-6 bg-indigo-100 text-indigo-800 shadow hover:shadow-indigo-300 transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold mb-2">📂 Medical Records</h2>
            <p>View reports and downloads.</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-xl hover:scale-105" onClick={()=>nav('/patient/records')}>Open</button>
          </div>
          <div className="rounded-2xl p-6 bg-rose-100 text-rose-800 shadow hover:shadow-rose-300 transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold mb-2">❤️ Wellness Tip</h2>
            <p>Drink water and take short walks.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
