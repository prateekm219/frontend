import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api.js'

const colorFor = (title='')=>{
  const t = title.toLowerCase()
  if(t.includes('blood')) return 'bg-yellow-100 border-yellow-300 text-yellow-800'
  if(t.includes('x-ray') || t.includes('xray')) return 'bg-sky-100 border-sky-300 text-sky-800'
  return 'bg-violet-100 border-violet-300 text-violet-800'
}
const iconFor = (title='')=>{
  const t = title.toLowerCase()
  if(t.includes('blood')) return '🧪'
  if(t.includes('x-ray')||t.includes('xray')) return '🩻'
  return '📄'
}

export default function MedicalRecords(){
  const [records, setRecords] = useState([])
  const [q,setQ] = useState('')
  useEffect(()=>{ api.records().then(setRecords) },[])
  const filtered = records.filter(r => r.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <Sidebar/>
      <div className="ml-64 p-8 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Your Medical Records</h1>
            <input className="p-3 border rounded-xl w-64" placeholder="Search reports…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((r,i)=>(
              <div key={i} className={`border rounded-2xl p-4 flex items-center justify-between hover:shadow-xl transition hover:-translate-y-0.5 ${colorFor(r.title)}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{iconFor(r.title)}</div>
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-sm opacity-80">{r.date}</div>
                    <div className="">{r.description}</div>
                  </div>
                </div>
                <a className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:scale-105" href={r.fileUrl}>Download</a>
              </div>
            ))}
              {filtered.length===0 && (
      <div className="text-center py-12 opacity-80">
        <div className="text-6xl mb-3">🩻</div>
        <div className="font-semibold">No records yet</div>
        <div className="text-gray-500">Your hospital will upload results here.</div>
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  )
}
