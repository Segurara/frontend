import { useState } from 'react';
import { ArrowUpRight, Eye, Plus } from 'lucide-react';
import { nodeItems } from '../../shared/data';

export function WorkspaceGraph() {
  const [selected, setSelected] = useState(nodeItems[2]);
  const SelectedIcon = selected.icon;
  return <div className="workspace-graph"><div className="workspace-card graph-workspace-card"><div className="workspace-card-head"><div><span className="overline">ENTITY RELATIONSHIPS</span><h3>Connected activity map</h3></div><div className="graph-tools"><button><Plus size={14} /></button><button>−</button><button><Eye size={14} /></button></div></div><div className="workspace-graph-canvas"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M11 21 L32 42 L51 22 L74 42 L47 68 L80 76 M32 42 L22 81 M51 22 L47 68" /></svg>{nodeItems.map((node) => { const NodeIcon = node.icon; return <button className={`graph-node ${selected.label === node.label ? 'selected' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.color } as React.CSSProperties} key={node.label} onClick={() => setSelected(node)}><span><NodeIcon size={15} /></span><small>{node.label}</small></button>; })}</div></div><div className="workspace-card selected-entity"><span className="overline">SELECTED ENTITY</span><div className="entity-icon" style={{ color: selected.color }}><SelectedIcon size={20} /></div><h3>{selected.label}</h3><span className="entity-type">{selected.type}</span><div className="entity-details"><div><small>Related events</small><strong>18</strong></div><div><small>Risk indicators</small><strong className="rose-text">3</strong></div></div><button className="primary-button">Open entity <ArrowUpRight size={15} /></button></div></div>;
}
