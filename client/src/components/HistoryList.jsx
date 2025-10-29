import React from 'react';

export default function HistoryList({ items = [], onClick }) {
  return (
    <div className="list">
      {items.map(i => (
        <div key={i._id} className="card" onClick={()=>onClick(i)} style={{cursor:'pointer'}}>
          <div style={{fontWeight:600}}>{i.title}</div>
          <div style={{fontSize:12, color:'#a3a3b2'}}>{i.isTemporary ? 'Temporary' : 'Permanent'}</div>
        </div>
      ))}
    </div>
  );
}
