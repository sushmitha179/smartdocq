import React, { useState } from 'react';

export default function AuthForm({ onSubmit, submitLabel = 'Continue', includeName = false, includeRemember = true }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [name, setName] = useState(''); const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  async function handle(e) {
    e.preventDefault();
    setError('');
    try {
      const payload = { email, password };
      if (includeName) payload.name = name;
      if (includeRemember) payload.remember = remember;
      await onSubmit(payload);
    } catch (err) { setError(err.message); }
  }

  return (
    <form className="card" onSubmit={handle} style={{maxWidth:420, margin:'0 auto', marginTop:24}}>
      {includeName && (<><div className="label">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></>)}
      <div className="label" style={{marginTop:8}}>Email</div>
      <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <div className="label" style={{marginTop:8}}>Password</div>
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/>
      {includeRemember && (
        <label className="row" style={{alignItems:'center', marginTop:8}}>
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>
          <span className="label">Keep me logged in</span>
        </label>
      )}
      {error && <div style={{color:'#ff6b6b', marginTop:8}}>{error}</div>}
      <button className="btn" style={{marginTop:12}}>{submitLabel}</button>
    </form>
  );
}
