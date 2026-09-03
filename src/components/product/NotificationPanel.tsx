import { Bell, X } from 'lucide-react';

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const notes = ['High-priority investigation updated', 'Telemetry source degraded', 'New correlated activity', 'Investigation assigned to you'];
  return <div className="notification-panel"><div className="notification-head"><strong>Notifications</strong><button onClick={onClose}><X size={15} /></button></div>{notes.map((x, i) => <div className="notification-row" key={x}><span className={`notif-icon n${i}`}><Bell size={14} /></span><div><strong>{x}</strong><small>{[2, 8, 15, 32][i]} minutes ago</small></div><span className={i < 2 ? 'unread' : ''} /></div>)}<button className="mark-read">Mark all as read</button></div>;
}
