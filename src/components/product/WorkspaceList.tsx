import { ChevronRight, Plus } from 'lucide-react';

export function WorkspaceList({ tab }: { tab: string }) {
  return <div className="workspace-card list-workspace"><div className="workspace-card-head"><div><span className="overline">{tab.toUpperCase()} / ALL SIGNALS</span><h3>Recent {tab.toLowerCase()}</h3></div><button className="primary-button"><Plus size={15} /> Add filter</button></div>{['Suspicious API activity', 'Identity scope anomaly', 'Model endpoint access', 'Unusual container behavior', 'Cloud workload change'].map((x, i) => <div className="list-row" key={x}><span className={`severity s${i % 3}`} /><div><strong>{x}</strong><small>{['checkout-api', 'svc-data-pipeline', 'risk-review-model', 'payments-worker', 'production-eu-01'][i]} · Today, 14:0{i + 2}</small></div><span className="context-chip">{['High', 'Medium', 'Low'][i % 3]}</span><ChevronRight size={16} /></div>)}</div>;
}
