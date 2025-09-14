import React, { useState } from "react"
import api from "../lib/api.js"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Mail, Lock, User, Calendar } from "lucide-react"

export default function RegisterLogin() {
  const nav = useNavigate()
  const [tab, setTab] = useState("login")
  const [form, setForm] = useState({ fullName: "", email: "", dob: "", password: "", confirm: "" })
  const [loginEmail, setLE] = useState("")
  const [loginPass, setLP] = useState("")
  const [msg, setMsg] = useState("")

  const handleReg = async (e) => {
    e.preventDefault()
    setMsg("")
    if (form.password !== form.confirm) {
      setMsg("Passwords do not match")
      return
    }
    try {
      const res = await api.register({
        fullName: form.fullName,
        email: form.email,
        dob: form.dob,
        password: form.password,
      })
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))
      toast.success("Welcome! Your account is ready.")
      nav("/patient/dashboard")
    } catch (err) {
      setMsg("" + err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setMsg("")
    try {
      const res = await api.login({ email: loginEmail, password: loginPass })
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))
      toast.success("Welcome back! 👋")
      nav("/patient/dashboard")
    } catch (err) {
      setMsg("" + err)
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Illustration Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white relative items-center justify-center p-10 overflow-hidden">
        <div className="z-10 text-center">
          <img src="/doctor-illustration.svg" alt="Doctor illustration" className="w-72 mx-auto mb-6 animate-floaty" />
          <h1 className="text-4xl font-bold mb-3">Patient Portal</h1>
          <p className="text-lg opacity-90">Your health, simplified. Access records, appointments, and care in one place.</p>
        </div>

        {/* Floating icons in background */}
        <div className="absolute text-7xl opacity-20 top-16 left-12 animate-floaty">🩺</div>
        <div className="absolute text-7xl opacity-20 bottom-20 right-16 animate-floaty">💊</div>
        {/* <div className="absolute text-7xl opacity-20 bottom-16 right-1 animate-floaty">🧑‍⚕️</div> */}
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fadeIn">
          {/* Tabs */}
          <div className="flex justify-around mb-6 border-b">
            <button
              onClick={() => setTab("login")}
              className={`pb-2 px-4 font-semibold transition ${
                tab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
              }`}
            >
              🔑 Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`pb-2 px-4 font-semibold transition ${
                tab === "register" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
              }`}
            >
              📝 Register
            </button>
          </div>

          {/* Forms */}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 transition-opacity duration-500 ease-in-out">
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Mail className="text-gray-400 mr-2" size={18} />
                <input
                  type="email"
                  className="w-full outline-none bg-transparent"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLE(e.target.value)}
                />
              </div>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Lock className="text-gray-400 mr-2" size={18} />
                <input
                  type="password"
                  className="w-full outline-none bg-transparent"
                  placeholder="Password"
                  value={loginPass}
                  onChange={(e) => setLP(e.target.value)}
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:bg-blue-700 transition">
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleReg} className="space-y-4 transition-opacity duration-500 ease-in-out">
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <User className="text-gray-400 mr-2" size={18} />
                <input
                  placeholder="Full Name"
                  className="w-full outline-none bg-transparent"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Mail className="text-gray-400 mr-2" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none bg-transparent"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Calendar className="text-gray-400 mr-2" size={18} />
                <input
                  type="date"
                  className="w-full outline-none bg-transparent"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Lock className="text-gray-400 mr-2" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none bg-transparent"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 shadow-inner">
                <Lock className="text-gray-400 mr-2" size={18} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full outline-none bg-transparent"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:bg-blue-700 transition">
                Register
              </button>
            </form>
          )}
          <p className="text-red-600 mt-3">{msg}</p>
        </div>
      </div>
    </div>
  )
}
