import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, ClipboardList, ArrowLeft } from 'lucide-react'

export default function Appointments() {
  const nav = useNavigate()

  return (
    <div>
      <Sidebar />
      <div className="ml-64 p-8 animate-fadeIn">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarDays className="w-8 h-8" /> Appointments
          </h1>
          <p className="opacity-90">Book, view, and manage your visits easily</p>
        </div>

        {/* Card Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Request Appointment Card */}
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg hover:shadow-2xl transition hover:-translate-y-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 animate-floaty">
                <CalendarDays size={32} />
              </div>
              <h2 className="text-xl font-semibold">Request Appointment</h2>
              <p className="text-gray-600">Choose your doctor, pick a date, and request a new appointment.</p>
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                onClick={() => nav('/patient/appointments/request')}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* View Appointments Card */}
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg hover:shadow-2xl transition hover:-translate-y-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-4 animate-floaty">
                <ClipboardList size={32} />
              </div>
              <h2 className="text-xl font-semibold">View Appointments</h2>
              <p className="text-gray-600">Check your upcoming and past appointments in one place.</p>
              <button
                className="bg-emerald-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                onClick={() => nav('/patient/appointments/view')}
              >
                View My Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 flex justify-center">
          <button
            className="flex items-center gap-2 text-blue-700 hover:underline"
            onClick={() => nav('/patient/dashboard')}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
