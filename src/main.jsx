import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import RegisterLogin from './pages/RegisterLogin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MedicalRecords from './pages/MedicalRecords.jsx'
import Appointments from './pages/Appointments.jsx'
import RequestAppointment from './pages/RequestAppointment.jsx'
import ViewAppointments from './pages/ViewAppointments.jsx'

function PrivateRoute({ children }){
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to='/' />
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RegisterLogin/>} />
      <Route path='/patient/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path='/patient/records' element={<PrivateRoute><MedicalRecords/></PrivateRoute>} />
      <Route path='/patient/appointments' element={<PrivateRoute><Appointments/></PrivateRoute>} />
      <Route path='/patient/appointments/request' element={<PrivateRoute><RequestAppointment/></PrivateRoute>} />
      <Route path='/patient/appointments/view' element={<PrivateRoute><ViewAppointments/></PrivateRoute>} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    <Toaster position='top-right' />
  </BrowserRouter>
)
