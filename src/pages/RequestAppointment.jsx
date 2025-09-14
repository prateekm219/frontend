import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function avatarFor(name) {
  const map = {
    'dr. singh': '/assets/doctors/dr-singh.svg',
    'dr. kumar': '/assets/doctors/dr-kumar.svg',
    'dr. chen': '/assets/doctors/dr-chen.svg',
    'dr. patel': '/assets/doctors/dr-patel.svg',
    'dr. lopez': '/assets/doctors/dr-lopez.svg',
  }
  return map[name?.toLowerCase()] || '/assets/doctors/dr-singh.svg'
}

export default function RequestAppointment() {
  const nav = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState({ doctorName: '', date: '', time: '', reason: '' })
  const [step, setStep] = useState(1)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.doctors().then(d => {
      setDoctors(d)
      if (d[0]) setForm(f => ({ ...f, doctorName: d[0].name }))
    })
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.createAppointment(form)
      toast.success('Appointment requested successfully!')
      nav('/patient/appointments/view')
    } catch (err) {
      setMsg('' + err)
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 animate-fadeIn">
          <h1 className="text-2xl font-semibold mb-4">Request Appointment</h1>

          <form onSubmit={submit}>
            {/* Stepper */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>1</div>
              <div className="h-1 w-10 bg-gray-300"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>2</div>
              <div className="h-1 w-10 bg-gray-300"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}>3</div>
            </div>

            {/* Step 1: Choose Doctor */}
            {step === 1 && (
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Choose a doctor</div>
                <div className="grid md:grid-cols-3 gap-4">
                  {doctors.map((d, i) => (
                    <div
                      key={i}
                      className={`border rounded-2xl p-4 cursor-pointer hover:shadow-xl ${form.doctorName === d.name ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setForm({ ...form, doctorName: d.name })}
                    >
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-gray-500">{(d.weekdays || []).join(', ')}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-xl" onClick={() => setStep(2)}>Next</button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full p-3 border rounded-xl" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full p-3 border rounded-xl" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <input className="w-full p-3 border rounded-xl" placeholder="e.g., Consultation" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
                </div>
                <div className="md:col-span-3 flex justify-between">
                  <button type="button" className="text-blue-700 hover:underline" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-xl" onClick={() => setStep(3)}>Next</button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div><strong>Doctor:</strong> {form.doctorName || '—'}</div>
                  <div><strong>Date:</strong> {form.date || '—'}</div>
                  <div><strong>Time:</strong> {form.time || '—'}</div>
                  <div><strong>Reason:</strong> {form.reason || '—'}</div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button type="button" className="text-blue-700 hover:underline" onClick={() => setStep(2)}>Back</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Confirm & Submit</button>
                </div>
              </div>
            )}
          </form>

          <p className="text-red-600 mt-3">{msg}</p>
        </div>
      </div>
    </div>
  )
}
