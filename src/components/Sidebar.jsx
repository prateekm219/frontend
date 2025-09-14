import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, LogOut, Stethoscope } from 'lucide-react';
import { Moon, Sun } from 'lucide-react';

export default function Sidebar(){
  const nav = useNavigate();
  const [dark, setDark] = React.useState(()=>document.documentElement.classList.contains('dark'));
React.useEffect(()=>{
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    setDark(true);
  }
},[]);
const toggleTheme = ()=>{
  const next = !dark;
  setDark(next);
  if(next){
    document.documentElement.classList.add('dark'); localStorage.setItem('theme','dark');
  } else {
    document.documentElement.classList.remove('dark'); localStorage.setItem('theme','light');
  }
};
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    nav('/');
  };
  return (
    <div className="fixed h-screen w-64 bg-blue-700 text-white dark:bg-blue-900 p-6 flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 mb-8">
        <Stethoscope className="animate-floaty" />
        <h2 className="text-2xl font-bold">Patient Portal</h2>
      </div>
      <nav className="flex-1 space-y-2">
        <Link to="/patient/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition">
          <Home size={20}/> <span>Dashboard</span>
        </Link>
        <Link to="/patient/records" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition">
          <FileText size={20}/> <span>Medical Records</span>
        </Link>
        <Link to="/patient/appointments" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition">
          <Calendar size={20}/> <span>Appointments</span>
        </Link>
      </nav>
      <button onClick={toggleTheme} className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition mb-2">
        {dark ? <Sun size={20}/> : <Moon size={20}/>} <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
      <button onClick={logout} className="flex items-center gap-3 p-2 rounded hover:bg-red-600 transition">
        <LogOut size={20}/> <span>Logout</span>
      </button>
    </div>
  )
}
