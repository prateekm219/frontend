import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useNavigate } from 'react-router-dom'

export default function Appointments(){
  const nav = useNavigate()
  return (
    <div>
      <Sidebar/>
      <div className="ml-64 p-8 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <p className="text-gray-600">Manage your upcoming visits or book a new one.</p>
          <div className="flex gap-3 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:scale-105" onClick={()=>nav('/patient/appointments/request')}>Request Appointment</button>
            <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-200 hover:scale-105" onClick={()=>nav('/patient/appointments/view')}>View Appointments</button>
          </div>
          <button className="text-blue-700 hover:underline" onClick={()=>nav('/patient/dashboard')}>← Back to Dashboard</button>
        </div>
      </div>
    </div>
  )
}
