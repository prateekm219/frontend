const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api';

async function req(path, method='GET', body){
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if(!res.ok){
    const t = await res.text();
    throw new Error(t || 'Request failed');
  }
  return res.json();
}

export const api = {
  register: (payload)=>req('/auth/register','POST',payload),
  login:    (payload)=>req('/auth/login','POST',payload),
  doctors:  ()=>req('/doctors'),
  records:  ()=>req('/records'),
  myAppointments: ()=>req('/appointments'),
  createAppointment: (payload)=>req('/appointments','POST',payload),
  updateAppointment: (id,payload)=>req(`/appointments/${id}`,'PUT',payload),
};
export default api;
