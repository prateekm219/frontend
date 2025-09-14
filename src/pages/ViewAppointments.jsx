import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ViewAppointments(){
  const [list, setList] = useState([])
  const nav = useNavigate()
  useEffect(()=>{ api.myAppointments().then(setList) },[])

const badge = (status)=>{
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  if(status==='Confirmed') return <span className={base + " bg-emerald-100 text-emerald-700 animate-fadeIn"}>Confirmed</span>;
  if(status==='Pending') return <span className={base + " bg-amber-100 text-amber-700 animate-fadeIn"}>Pending</span>;
  return <span className={base + " bg-rose-100 text-rose-700 animate-fadeIn"}>Cancelled</span>;
};

  const changeTime = async (id)=>{
    const time = prompt('New time (e.g., 11:30)')
    if(!time) return
    await api.updateAppointment(id,{time})
    const updated = await api.myAppointments()
    setList(updated)
    toast.success('Appointment time updated')
  }

  return (
    <div>
      <Sidebar/>
      <div className="ml-64 p-8 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-semibold mb-4">Your Appointments</h1>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr className="text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Status</th><th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a,idx)=>(
                  <tr key={a._id} className={idx%2===0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3">{a.date}</td>
                    {/* <td className="p-3">{badge(status)}</td> */}
                    <td className="p-3">{a.time}</td>
                    <td className="p-3">{badge(status)}</td>
                    <td className="p-3">{a.doctorName}</td>
                    {/* <td className="p-3">{badge(status)}</td> */}
                    <td className="p-3">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-xl hover:scale-105" onClick={()=>changeTime(a._id)}>Change</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="text-blue-700 hover:underline mt-3" onClick={()=>nav('/patient/appointments')}>← Back to Appointments</button>
        </div>
      </div>
    </div>
  )
}
