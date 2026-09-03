import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Fingerprint,
  Lock,
  Network,
  Play,
  Radio,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

interface ProductPageProps {
  onHome: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
}

export function ProductPage({ onHome, onPrivacy, onTerms }: ProductPageProps) {
  useEffect(() => {
    document.title = 'SeguraSecure S.1 — Autonomous AI Runtime & Workload Defense';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Interactive state for Hero Live Intercept widget
  const [heroTab, setHeroTab] = useState<'intercept' | 'graph' | 'copilot'>('intercept');
  const [streamActive, setStreamActive] = useState(true);

  // Interactive state for 4-Stage In-Action Walkthrough
  const [activeStage, setActiveStage] = useState(0);

  // Interactive state for FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scannable Engine detail state
  const [selectedEngine, setSelectedEngine] = useState<number>(0);

  return (
    <div className="site-shell product-shell">
      {/* Product Page Navigation */}
      <ProductHeader onHome={onHome} />

      <main>
        {/* SECTION 1: PRODUCT HERO SECTION */}
        <section className="product-hero-container section-pad">
          <div className="product-hero-content">
            <div className="eyebrow">
              <span className="pulse-dot" />
              <span>SEGURASECURE S.1 · AUTONOMOUS RUNTIME DEFENSE</span>
              <span className="version-pill">v1.4 PRODUCTION</span>
            </div>

            <h1 className="product-hero-title">
              The autonomous runtime defense system for the <em>AI-first enterprise.</em>
            </h1>

            <p className="product-hero-lead">
              SeguraSecure S.1 closes the critical security context gap across distributed cloud workloads,
              Kubernetes clusters, and AI model endpoints. By synthesizing high-throughput telemetry,
              real-time attack-path graph tracing, and evidence-grounded AI investigations, S.1 neutralizes
              sophisticated threats before impact.
            </p>

            {/* Primary Action Button linking to live product */}
            <div className="product-hero-actions">
              <a
                href="https://app.segurara.com"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button product-hero-cta"
              >
                <Sparkles size={16} />
                <span>Launch SeguraSecure S.1</span>
                <ArrowUpRight size={17} />
              </a>

              <a href="#in-action" className="secondary-button product-hero-secondary">
                <Play size={15} />
                <span>See S.1 in Action</span>
              </a>

              <a href="#engine" className="ghost-button product-hero-engine-link">
                <Cpu size={15} />
                <span>Engine Specs</span>
                <ChevronDown size={14} />
              </a>
            </div>

            {/* Scannable Proof Points */}
            <div className="product-hero-stats">
              <div className="hero-stat-card">
                <strong className="stat-number">99.9%</strong>
                <span className="stat-desc">Telemetry noise reduction</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong className="stat-number">&lt; 10ms</strong>
                <span className="stat-desc">Relationship graph traversal</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong className="stat-number">100%</strong>
                <span className="stat-desc">Evidence-grounded (zero hallucinations)</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong className="stat-number">1-Click</strong>
                <span className="stat-desc">Analyst-governed containment</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual: S.1 Live Threat Console */}
          <div className="product-hero-visual-card">
            <div className="console-chrome">
              <div className="console-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="console-title">
                <Radio size={13} className="stream-icon" />
                <span>SEGURASECURE S.1 CORE // ACTIVE RUNTIME MONITOR</span>
              </div>
              <div className="console-actions">
                <button
                  className={`console-toggle ${streamActive ? 'active' : ''}`}
                  onClick={() => setStreamActive(!streamActive)}
                  title="Toggle live telemetry feed"
                >
                  <RefreshCw size={12} className={streamActive ? 'spin-slow' : ''} />
                  <span>{streamActive ? 'LIVE STREAM' : 'PAUSED'}</span>
                </button>
              </div>
            </div>

            {/* Console Sub-nav Tabs */}
            <div className="console-tabs">
              <button
                className={`console-tab ${heroTab === 'intercept' ? 'active' : ''}`}
                onClick={() => setHeroTab('intercept')}
              >
                <ShieldAlert size={14} />
                <span>Incident Intercept</span>
                <span className="badge-alert">ELEVATED</span>
              </button>
              <button
                className={`console-tab ${heroTab === 'graph' ? 'active' : ''}`}
                onClick={() => setHeroTab('graph')}
              >
                <Network size={14} />
                <span>Attack-Path Graph</span>
              </button>
              <button
                className={`console-tab ${heroTab === 'copilot' ? 'active' : ''}`}
                onClick={() => setHeroTab('copilot')}
              >
                <Bot size={14} />
                <span>AI Investigation</span>
              </button>
            </div>

            {/* Console Body Tab Views */}
            <div className="console-screen">
              {heroTab === 'intercept' && (
                <div className="console-view-intercept">
                  <div className="incident-header">
                    <div>
                      <span className="mono-label">INCIDENT REF: S1-SEC-8924</span>
                      <h4>Lateral Privilege Escalation via LLM Gateway</h4>
                      <p>Anomalous token sequence originated from service identity <code>svc-checkout</code> targeting production model endpoint.</p>
                    </div>
                    <div className="incident-risk-pill">
                      <span className="pulse-dot red" />
                      <span>RISK SCORE: 92/100</span>
                    </div>
                  </div>

                  <div className="telemetry-feed">
                    <div className="feed-row warning">
                      <span className="feed-time">14:02:11.082</span>
                      <span className="feed-source">API-GATEWAY</span>
                      <span className="feed-msg">Unusual POST /v1/chat/completions payload with excessive token rate</span>
                      <span className="feed-tag">DRIFT</span>
                    </div>
                    <div className="feed-row danger">
                      <span className="feed-time">14:02:14.219</span>
                      <span className="feed-source">IAM-RUNTIME</span>
                      <span className="feed-msg">Temporary STS assume-role executed outside deployment CIDR baseline</span>
                      <span className="feed-tag">ANOMALY</span>
                    </div>
                    <div className="feed-row danger">
                      <span className="feed-time">14:02:18.904</span>
                      <span className="feed-source">K8S-EBPF</span>
                      <span className="feed-msg">Namespace breakout probe attempt on node <code>worker-pool-eu-4</code></span>
                      <span className="feed-tag">ESCALATION</span>
                    </div>
                    <div className="feed-row success">
                      <span className="feed-time">14:02:22.450</span>
                      <span className="feed-source">S.1-SENTINEL</span>
                      <span className="feed-msg">Active policy gate engaged: Token revoked & pod network quarantined</span>
                      <span className="feed-tag">CONTAINED</span>
                    </div>
                  </div>

                  <div className="console-footer-bar">
                    <span className="verified-badge">
                      <ShieldCheck size={14} /> Cryptographically verified telemetry chain
                    </span>
                    <a
                      href="https://app.segurara.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="console-direct-link"
                    >
                      Investigate in Live App <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              )}

              {heroTab === 'graph' && (
                <div className="console-view-graph">
                  <div className="graph-hud">
                    <div className="hud-metric">
                      <small>GRAPH NODES</small>
                      <strong>6 Linked Entities</strong>
                    </div>
                    <div className="hud-metric">
                      <small>SHORTEST ATTACK PATH</small>
                      <strong className="amber-text">3 Hops to Vector DB</strong>
                    </div>
                    <div className="hud-metric">
                      <small>CALCULATED BLAST RADIUS</small>
                      <strong className="rose-text">1 Workload (Isolated)</strong>
                    </div>
                  </div>

                  <div className="mini-graph-canvas">
                    <div className="graph-node-bubble g-identity">
                      <Fingerprint size={16} />
                      <span>svc-checkout</span>
                      <small>Identity</small>
                    </div>
                    <div className="graph-edge edge-1" />
                    <div className="graph-node-bubble g-api">
                      <Terminal size={16} />
                      <span>/api/inference</span>
                      <small>Gateway</small>
                    </div>
                    <div className="graph-edge edge-2" />
                    <div className="graph-node-bubble g-model">
                      <BrainCircuit size={16} />
                      <span>gpt-eval-prod</span>
                      <small>AI Endpoint</small>
                    </div>
                    <div className="graph-edge edge-3" />
                    <div className="graph-node-bubble g-db">
                      <Database size={16} />
                      <span>vector-store-01</span>
                      <small>Target Database</small>
                    </div>
                  </div>

                  <div className="graph-insight">
                    <Zap size={14} className="accent-icon" />
                    <span>cuGraph engine evaluated 142 potential traversal vectors in 8.4ms.</span>
                  </div>
                </div>
              )}

              {heroTab === 'copilot' && (
                <div className="console-view-copilot">
                  <div className="copilot-thread">
                    <div className="copilot-bubble user">
                      <span>How did the attacker attempt to access the production vector store?</span>
                    </div>
                    <div className="copilot-bubble assistant">
                      <div className="assistant-badge">
                        <Sparkles size={13} />
                        <span>S.1 INVESTIGATION ASSISTANT</span>
                      </div>
                      <p>
                        The attacker leveraged an ephemeral STS credential leaked from <code>svc-checkout</code> at 14:02:11 UTC.
                        They attempted to query the vector database via the internal LLM gateway endpoint, bypassing conventional API filters.
                      </p>
                      <div className="evidence-chips">
                        <span className="ev-chip"><Check size={11} /> Correlated with 4 eBPF events</span>
                        <span className="ev-chip"><Check size={11} /> 0 false positive matches</span>
                        <span className="ev-chip"><Check size={11} /> Policy rule #408 triggered</span>
                      </div>
                    </div>
                  </div>

                  <div className="copilot-quick-actions">
                    <span className="mono-label">RECOMMENDED REMEDIATION:</span>
                    <button className="remediate-chip">
                      <Shield size={13} /> Rotate STS Credential & Quarantine Pod (1-Click)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE PRODUCT CAPABILITIES & PILLARS */}
        <section id="capabilities" className="product-capabilities-section section-pad">
          <div className="section-intro centered">
            <div className="section-label">
              <span /> ARCHITECTED FOR MODERN THREATS <span />
            </div>
            <h2>Built from the ground up to protect <em>complex cloud &amp; AI environments.</em></h2>
            <p>
              Traditional SIEMs and signature-based XDRs fail when attackers move across ephemeral microservices
              and proprietary AI model APIs. SeguraSecure S.1 delivers deep, deterministic protection.
            </p>
          </div>

          <div className="product-pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-icon-box cyan">
                <Radio size={22} />
              </div>
              <span className="pillar-tag">TELEMETRY &amp; INGESTION</span>
              <h3>Continuous Wire-Speed Telemetry Ingestion</h3>
              <p>
                Streams eBPF syscalls, API traffic, cloud audit trails, and identity transactions with zero
                sampling loss. Normalizes multi-cloud schema variations into a unified stream at sub-millisecond speeds.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> Full eBPF kernel event visibility</li>
                <li><Check size={14} /> Multi-cloud IAM &amp; token normalization</li>
                <li><Check size={14} /> Zero CPU overhead on production nodes</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">GPU-Stream Accelerated</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card highlight-pillar">
              <div className="pillar-icon-box violet">
                <Network size={22} />
              </div>
              <span className="pillar-tag">CORRELATION WORKSPACE</span>
              <h3>Deterministic Security Relationship Graph</h3>
              <p>
                Translates millions of disconnected log rows into a live topological network. Traces real-time
                dependencies between identities, APIs, workloads, and AI endpoints to calculate exact attack paths.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> Instant lateral blast-radius mapping</li>
                <li><Check size={14} /> Multi-hop identity escalation detection</li>
                <li><Check size={14} /> Micro-segmentation visual validation</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">Graph Network Traversal</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-icon-box amber">
                <BrainCircuit size={22} />
              </div>
              <span className="pillar-tag">AI INVESTIGATION</span>
              <h3>Evidence-Grounded AI Investigation Assistant</h3>
              <p>
                Empowers tier-1 through tier-3 analysts to ask complex natural language questions. Every explanation,
                threat summary, and next step is cryptographically linked to verifiable event proof.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> Guaranteed zero hallucinations</li>
                <li><Check size={14} /> Step-by-step forensic reasoning</li>
                <li><Check size={14} /> Tailored executive threat briefings</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">Language &amp; Reasoning NIMs</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-icon-box rose">
                <ShieldAlert size={22} />
              </div>
              <span className="pillar-tag">GENAI &amp; LLM SENTINEL</span>
              <h3>Runtime Guardrails for AI &amp; LLM Endpoints</h3>
              <p>
                Protects internal AI models, RAG pipelines, and vector databases from prompt injection, training
                data exfiltration, model extraction, and unauthorized agentic tool execution.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> Prompt injection &amp; jailbreak detection</li>
                <li><Check size={14} /> Vector database access anomalies</li>
                <li><Check size={14} /> API abuse &amp; token quota governance</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">Model Gateway Intercept</span>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="pillar-card">
              <div className="pillar-icon-box green">
                <Clock size={22} />
              </div>
              <span className="pillar-tag">FORENSICS &amp; REPLAY</span>
              <h3>Forensic Chronology &amp; Time-Travel Replay</h3>
              <p>
                Rewind any incident to view the exact state of your cluster, IAM policies, and application
                parameters before, during, and after an attack. Never guess how an adversary achieved initial access.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> Millisecond event timeline replay</li>
                <li><Check size={14} /> Ephemeral container audit capture</li>
                <li><Check size={14} /> Compliance-ready evidence exports</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">Immutable Audit Ledger</span>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="pillar-card">
              <div className="pillar-icon-box blue">
                <Lock size={22} />
              </div>
              <span className="pillar-tag">CONTROLLED RESPONSE</span>
              <h3>Surgical Containment &amp; Analyst-in-the-Loop</h3>
              <p>
                Remediate incidents in seconds without breaking production uptime. S.1 prepares tailored containment
                actions (JWT invalidation, pod isolation, egress firewalls) with complete rollback safeguards.
              </p>
              <ul className="pillar-checklist">
                <li><Check size={14} /> 1-click surgical token revocation</li>
                <li><Check size={14} /> Granular Kubernetes network isolation</li>
                <li><Check size={14} /> Full governance &amp; audit authorization</li>
              </ul>
              <div className="pillar-footer">
                <span className="engine-badge">Safe Automated Actions</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: S.1 IN ACTION — INTERACTIVE 4-STAGE INCIDENT LIFECYCLE */}
        <section id="in-action" className="product-workflow-section section-pad">
          <div className="section-intro">
            <div className="section-label">
              <span /> S.1 IN ACTION
            </div>
            <h2>How SeguraSecure S.1 neutralizes an active breach in <em>four stages.</em></h2>
            <p>
              Follow an active attack lifecycle and see how S.1 replaces hours of frantic manual investigations
              with automated correlation and precise human-approved containment.
            </p>
          </div>

          <div className="interactive-lifecycle">
            {/* Stepper Navigation */}
            <div className="lifecycle-stepper">
              {[
                { step: '01', title: 'Stream Ingest & Drift', desc: 'Wire-speed anomaly intercept' },
                { step: '02', title: 'Graph Relationship Tracing', desc: 'Attack path & blast radius' },
                { step: '03', title: 'AI Assistant Synthesis', desc: 'Evidence-linked reasoning' },
                { step: '04', title: 'Surgical Quarantine', desc: 'Analyst-governed containment' },
              ].map((s, idx) => (
                <button
                  key={s.step}
                  className={`lifecycle-step-btn ${activeStage === idx ? 'active' : ''}`}
                  onClick={() => setActiveStage(idx)}
                >
                  <div className="step-num">{s.step}</div>
                  <div className="step-info">
                    <strong>{s.title}</strong>
                    <small>{s.desc}</small>
                  </div>
                  {idx < 3 && <ChevronRight size={16} className="step-arrow" />}
                </button>
              ))}
            </div>

            {/* Dynamic Stage Display Screen */}
            <div className="lifecycle-stage-display">
              {activeStage === 0 && (
                <div className="stage-card">
                  <div className="stage-top">
                    <span className="live-chip"><span className="pulse-dot" /> STAGE 01 // TELEMETRY INGESTION</span>
                    <span className="stage-meta">Ingested: 1.4M events/sec · Latency: 0.8ms</span>
                  </div>
                  <h3>Continuous Ingestion &amp; Statistical Anomaly Intercept</h3>
                  <p>
                    A credential stuffing wave hits <code>/api/auth/v2</code>. Standard WAF rules miss the attack
                    due to distributed residential proxies. SeguraSecure S.1 evaluates runtime API sequences and identity
                    velocity against historical baselines, flagging an unusual token generation sequence.
                  </p>
                  <div className="stage-code-block">
                    <div className="code-header">
                      <span>TELEMETRY PAYLOAD EXTRACT // NORMALIZED EVENT</span>
                      <span className="green-text">CONFIDENCE 94%</span>
                    </div>
                    <pre>
{`{
  "timestamp": "2026-09-03T14:02:11.482Z",
  "source_entity": "checkout-service-pod-7f89d",
  "anomaly_type": "STS_ASSUME_ROLE_UNUSUAL_SCOPE",
  "service_account": "svc-checkout@production.iam.gserviceaccount.com",
  "drift_delta": "+410% entropy deviation from 30d baseline"
}`}
                    </pre>
                  </div>
                </div>
              )}

              {activeStage === 1 && (
                <div className="stage-card">
                  <div className="stage-top">
                    <span className="live-chip"><span className="pulse-dot amber" /> STAGE 02 // ATTACK-PATH GRAPH</span>
                    <span className="stage-meta">Algorithm: cuGraph BFS · Execution: 4.2ms</span>
                  </div>
                  <h3>Real-Time Security Relationship Graph Tracing</h3>
                  <p>
                    Instead of firing isolated alerts, S.1 connects the identity anomaly to a subsequent call to
                    an internal model endpoint and an unauthorized query to a customer vector database. The Security
                    Relationship Graph computes the exact blast radius: 1 pod, 1 IAM token, and 1 database shard.
                  </p>
                  <div className="stage-graph-preview">
                    <div className="path-node source">
                      <Fingerprint size={14} />
                      <span>svc-checkout</span>
                    </div>
                    <ArrowRight size={15} className="path-link danger" />
                    <div className="path-node intermediate">
                      <BrainCircuit size={14} />
                      <span>Internal LLM Gateway</span>
                    </div>
                    <ArrowRight size={15} className="path-link danger" />
                    <div className="path-node target">
                      <Database size={14} />
                      <span>Production Vector Store</span>
                    </div>
                  </div>
                  <div className="stage-footer-note">
                    <ShieldCheck size={14} className="green-text" />
                    <span>Blast radius strictly bounded: Other 48 microservices remain fully operational and unaffected.</span>
                  </div>
                </div>
              )}

              {activeStage === 2 && (
                <div className="stage-card">
                  <div className="stage-top">
                    <span className="live-chip"><span className="pulse-dot violet" /> STAGE 03 // AI INVESTIGATION ASSISTANT</span>
                    <span className="stage-meta">Inference Latency: 420ms · Hallucination Rate: 0.0%</span>
                  </div>
                  <h3>Cryptographically Grounded AI Explanation</h3>
                  <p>
                    The on-premises AI Investigation Assistant correlates the timeline and presents an executive summary
                    with cited evidence items. Analysts don't have to sift through gigabytes of logs or write complex query syntax.
                  </p>
                  <div className="assistant-quote-box">
                    <div className="quote-badge">
                      <Sparkles size={14} /> <strong>AI Investigator Hypothesis</strong>
                    </div>
                    <p>
                      “Adversary leveraged compromised service token <code>tok_live_89a</code> to attempt vector embeddings
                      dump. Attack path was intercepted before sensitive PII was transmitted. No data egress detected.”
                    </p>
                    <div className="evidence-pills-row">
                      <span className="ev-pill"><Check size={12} /> Log Hash: <code>#a8f9c21...</code></span>
                      <span className="ev-pill"><Check size={12} /> IAM Token Revocation Ready</span>
                      <span className="ev-pill"><Check size={12} /> Policy Rollback Safe</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStage === 3 && (
                <div className="stage-card">
                  <div className="stage-top">
                    <span className="live-chip"><span className="pulse-dot green" /> STAGE 04 // GOVERNED CONTAINMENT</span>
                    <span className="stage-meta">Action: Ready for Analyst Approval</span>
                  </div>
                  <h3>Analyst-Governed Surgical Containment</h3>
                  <p>
                    S.1 generates surgical mitigation policies tailored to your cloud infrastructure. Rather than
                    shutting down entire nodes, the analyst reviews and approves targeted token invalidation and pod egress blocking.
                  </p>
                  <div className="containment-box">
                    <div className="action-row">
                      <div className="action-desc">
                        <Lock size={16} className="rose-text" />
                        <div>
                          <strong>Revoke Token: tok_live_89a</strong>
                          <small>Expires compromised STS session immediately across all availability zones</small>
                        </div>
                      </div>
                      <span className="status-badge ready">STAGED</span>
                    </div>
                    <div className="action-row">
                      <div className="action-desc">
                        <Shield size={16} className="cyan-text" />
                        <div>
                          <strong>Isolate Pod: checkout-service-pod-7f89d</strong>
                          <small>Applies strict Calico/Cilium network policy to prevent lateral egress</small>
                        </div>
                      </div>
                      <span className="status-badge ready">STAGED</span>
                    </div>
                    <div className="containment-buttons">
                      <a
                        href="https://app.segurara.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-button execute-btn"
                      >
                        <Check size={16} /> Authorize &amp; Execute in SeguraSecure S.1
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: ENTERPRISE VALUE & OPERATIONAL IMPACT */}
        <section className="product-comparison-section section-pad">
          <div className="section-intro centered">
            <div className="section-label">
              <span /> OPERATIONAL ADVANTAGE <span />
            </div>
            <h2>Why modern security teams choose <em>SeguraSecure S.1.</em></h2>
            <p>
              Replace the sprawl of single-purpose agents, noisy SIEM dashboards, and manual incident
              investigations with a single unified defense platform.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <div className="s1-comparison-table">
              <div className="comp-row comp-head">
                <div className="comp-cell">CAPABILITY</div>
                <div className="comp-cell legacy-col">TRADITIONAL SIEM / XDR</div>
                <div className="comp-cell s1-col">SEGURASECURE S.1</div>
              </div>

              <div className="comp-row">
                <div className="comp-cell metric-name">
                  <strong>Telemetry Processing</strong>
                  <small>Handling millions of continuous events</small>
                </div>
                <div className="comp-cell legacy-col">
                  <span>Batch log ingestion with 5-15 minute indexing delays; massive storage costs.</span>
                </div>
                <div className="comp-cell s1-col">
                  <span className="highlight-text"><Check size={14} /> Line-rate GPU-accelerated stream processing with zero indexing lag.</span>
                </div>
              </div>

              <div className="comp-row">
                <div className="comp-cell metric-name">
                  <strong>Threat Correlation</strong>
                  <small>Connecting events across stacks</small>
                </div>
                <div className="comp-cell legacy-col">
                  <span>Static SQL/regex correlation rules resulting in alert fatigue and missed multi-hop attacks.</span>
                </div>
                <div className="comp-cell s1-col">
                  <span className="highlight-text"><Check size={14} /> Dynamic Security Relationship Graph computing real-time blast radius and attack paths.</span>
                </div>
              </div>

              <div className="comp-row">
                <div className="comp-cell metric-name">
                  <strong>Investigation Speed</strong>
                  <small>Moving from alert to decision</small>
                </div>
                <div className="comp-cell legacy-col">
                  <span>Analysts manually cross-reference 4+ dashboards, tabs, and query consoles (avg. 4.2 hours MTTR).</span>
                </div>
                <div className="comp-cell s1-col">
                  <span className="highlight-text"><Check size={14} /> Natural language queries with evidence-grounded answers in under 4 minutes.</span>
                </div>
              </div>

              <div className="comp-row">
                <div className="comp-cell metric-name">
                  <strong>AI &amp; LLM Workload Security</strong>
                  <small>Protecting modern AI pipelines</small>
                </div>
                <div className="comp-cell legacy-col">
                  <span>Completely blind to prompt injections, model extraction, and vector store data manipulation.</span>
                </div>
                <div className="comp-cell s1-col">
                  <span className="highlight-text"><Check size={14} /> Native runtime guardrails for model endpoints, embeddings, and agentic workflows.</span>
                </div>
              </div>

              <div className="comp-row">
                <div className="comp-cell metric-name">
                  <strong>Remediation Safety</strong>
                  <small>Mitigating threats without outage</small>
                </div>
                <div className="comp-cell legacy-col">
                  <span>Blunt actions (host shutdown) that risk major downtime or ignored alerts due to fear of disruption.</span>
                </div>
                <div className="comp-cell s1-col">
                  <span className="highlight-text"><Check size={14} /> Surgical 1-click token and network containment with human approval gates.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment Flavors */}
          <div className="deployment-flavors-grid">
            <div className="flavor-card">
              <div className="flavor-header">
                <Server size={18} className="cyan-text" />
                <h4>Managed Cloud SaaS</h4>
              </div>
              <p>Turnkey cloud-hosted deployment with instant connectors for AWS, GCP, Azure, and Kubernetes.</p>
              <div className="flavor-badges">
                <span>SOC 2 Type II</span>
                <span>ISO 27001</span>
                <span>Instant Setup</span>
              </div>
            </div>

            <div className="flavor-card featured-flavor">
              <div className="flavor-header">
                <ShieldCheck size={18} className="violet-text" />
                <h4>Dedicated Customer VPC</h4>
              </div>
              <p>Deploy within your own cloud boundary. Raw telemetry and keys never leave your controlled infrastructure.</p>
              <div className="flavor-badges">
                <span>Zero Data Egress</span>
                <span>BYOK Support</span>
                <span>Custom Retention</span>
              </div>
            </div>

            <div className="flavor-card">
              <div className="flavor-header">
                <Lock size={18} className="amber-text" />
                <h4>Air-Gapped &amp; Sovereign</h4>
              </div>
              <p>Complete on-premises deployment on accelerated hardware clusters for defense, finance, and critical infrastructure.</p>
              <div className="flavor-badges">
                <span>100% Offline</span>
                <span>FIPS 140-2</span>
                <span>Hardware Accelerated</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: HIGH-PERFORMANCE ENGINE FOUNDATION (Scannable Technical Architecture) */}
        <section id="engine" className="product-engine-section section-pad">
          <div className="engine-intro">
            <div className="section-label">
              <span /> HIGH-PERFORMANCE ENGINE FOUNDATION <span />
            </div>
            <h2>Accelerated by <em>NVIDIA AI &amp; Cybersecurity Architecture.</em></h2>
            <p>
              SeguraSecure S.1 harnesses industry-leading GPU-accelerated computing and inference frameworks.
              This hardware-optimized foundation empowers our platform to evaluate millions of security events per
              second with sub-millisecond latency.
            </p>
          </div>

          {/* 4 Scannable Technical SDK Cards */}
          <div className="engine-grid">
            {/* 1. NVIDIA Morpheus */}
            <div
              className={`engine-card ${selectedEngine === 0 ? 'active' : ''}`}
              onClick={() => setSelectedEngine(0)}
            >
              <div className="engine-card-top">
                <span className="engine-num">01</span>
                <span className="engine-pill">STREAM PROCESSING</span>
              </div>
              <h3>NVIDIA Morpheus</h3>
              <div className="engine-role">Core Cybersecurity Stream-Processing Framework</div>
              <p>
                Morpheus serves as the primary engine for S.1’s <strong>Telemetry</strong> and <strong>Normalization</strong> stages.
                It builds high-throughput pipelines that ingest, normalize, and analyze continuous streams of runtime events,
                API sequences, and identity anomalies across cloud workloads at GPU-accelerated speeds.
              </p>
              <div className="engine-specs">
                <div className="spec-item">
                  <small>PIPELINE ROLE</small>
                  <span>Line-Rate Normalization</span>
                </div>
                <div className="spec-item">
                  <small>WORKLOAD FOCUS</small>
                  <span>API &amp; Identity Telemetry</span>
                </div>
              </div>
            </div>

            {/* 2. NVIDIA RAPIDS */}
            <div
              className={`engine-card ${selectedEngine === 1 ? 'active' : ''}`}
              onClick={() => setSelectedEngine(1)}
            >
              <div className="engine-card-top">
                <span className="engine-num">02</span>
                <span className="engine-pill">GRAPH ANALYTICS</span>
              </div>
              <h3>NVIDIA RAPIDS (cuGraph &amp; cuDF)</h3>
              <div className="engine-role">Data Science &amp; Graph Analytics Engine</div>
              <p>
                Powers S.1’s <strong>Security Relationship Graph</strong> and threat correlation workspace.
                <strong>cuGraph</strong> models complex dependencies across applications, identities, workloads,
                and AI endpoints as a unified graph network, executing GPU-accelerated graph algorithms to trace attack
                paths and blast-radius contexts in real time. In tandem, <strong>cuDF</strong> handles high-speed multi-source
                data ingestion and schema normalization.
              </p>
              <div className="engine-specs">
                <div className="spec-item">
                  <small>GRAPH ENGINE</small>
                  <span>cuGraph Real-Time BFS</span>
                </div>
                <div className="spec-item">
                  <small>INGESTION ACCELERATION</small>
                  <span>cuDF Schema Normalization</span>
                </div>
              </div>
            </div>

            {/* 3. NVIDIA NIM */}
            <div
              className={`engine-card ${selectedEngine === 2 ? 'active' : ''}`}
              onClick={() => setSelectedEngine(2)}
            >
              <div className="engine-card-top">
                <span className="engine-num">03</span>
                <span className="engine-pill">INFERENCE MICROSERVICES</span>
              </div>
              <h3>NVIDIA NIM</h3>
              <div className="engine-role">Language &amp; Reasoning Inference Microservices</div>
              <p>
                Utilizing specialized language and reasoning NIMs, this technology provides pre-built, hardware-optimized
                containers with standardized APIs. NIM deploys and scales S.1’s <strong>AI Investigation Assistant</strong>,
                enabling conversational querying, evidence-linked explanations, and next-step containment suggestions
                with ultra-low latency.
              </p>
              <div className="engine-specs">
                <div className="spec-item">
                  <small>MICROSERVICE ROLE</small>
                  <span>AI Investigation Assistant</span>
                </div>
                <div className="spec-item">
                  <small>CAPABILITY</small>
                  <span>Low-Latency Reasoning</span>
                </div>
              </div>
            </div>

            {/* 4. NVIDIA Triton */}
            <div
              className={`engine-card ${selectedEngine === 3 ? 'active' : ''}`}
              onClick={() => setSelectedEngine(3)}
            >
              <div className="engine-card-top">
                <span className="engine-num">04</span>
                <span className="engine-pill">MODEL SERVING</span>
              </div>
              <h3>NVIDIA Triton Inference Server</h3>
              <div className="engine-role">Production Deployment &amp; Orchestration Backend</div>
              <p>
                Triton manages concurrent model execution, dynamic batching, and multi-framework model serving.
                It coordinates the synchronized execution of S.1’s Morpheus anomaly detection pipelines, RAPIDS graph models,
                and NIM-driven investigation assistants within a unified, highly secure runtime environment.
              </p>
              <div className="engine-specs">
                <div className="spec-item">
                  <small>BACKEND ROLE</small>
                  <span>Multi-Model Orchestration</span>
                </div>
                <div className="spec-item">
                  <small>OPTIMIZATION</small>
                  <span>Dynamic Batching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scannable Architecture Flow Visual */}
          <div className="engine-flow-container">
            <div className="flow-card">
              <div className="flow-step">
                <div className="flow-badge">1. INGESTION &amp; PARSING</div>
                <strong>NVIDIA Morpheus + cuDF</strong>
                <small>Line-rate eBPF &amp; API stream normalization</small>
              </div>
              <ArrowRight size={18} className="flow-arrow" />
              <div className="flow-step">
                <div className="flow-badge">2. TOPOLOGY MAPPING</div>
                <strong>NVIDIA RAPIDS cuGraph</strong>
                <small>Dynamic Security Relationship Graph</small>
              </div>
              <ArrowRight size={18} className="flow-arrow" />
              <div className="flow-step">
                <div className="flow-badge">3. REASONING COPILOT</div>
                <strong>NVIDIA NIM (LLM)</strong>
                <small>Evidence-linked investigation synthesis</small>
              </div>
              <ArrowRight size={18} className="flow-arrow" />
              <div className="flow-step">
                <div className="flow-badge">4. SECURE ORCHESTRATION</div>
                <strong>NVIDIA Triton Server</strong>
                <small>Unified concurrent model execution</small>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: PRODUCT SPECIFICATIONS & FAQ */}
        <section id="specs" className="product-specs-faq-section section-pad">
          <div className="specs-grid">
            <div className="specs-left">
              <div className="section-label">
                <span /> PLATFORM SPECIFICATIONS
              </div>
              <h2>Enterprise-ready from day zero.</h2>
              <p>
                SeguraSecure S.1 is designed to drop seamlessly into existing SecOps workflows, enterprise SIEMs,
                and ticketing platforms with zero disruption.
              </p>

              <div className="integration-matrix">
                <div className="matrix-category">
                  <strong>Cloud Workloads &amp; Containers</strong>
                  <p>Kubernetes (EKS, GKE, AKS, OpenShift), Docker, AWS ECS/Fargate, Linux eBPF</p>
                </div>
                <div className="matrix-category">
                  <strong>Identity &amp; Access Management</strong>
                  <p>Okta, AWS IAM, Azure AD / Entra, Google Cloud Identity, HashiCorp Vault</p>
                </div>
                <div className="matrix-category">
                  <strong>AI &amp; LLM Gateways</strong>
                  <p>OpenAI, Anthropic, AWS Bedrock, HuggingFace TGI, vLLM, Pinecone, Milvus, Qdrant</p>
                </div>
                <div className="matrix-category">
                  <strong>SecOps &amp; Ticketing Connectors</strong>
                  <p>Splunk, Datadog, Slack, Jira, PagerDuty, Microsoft Sentinel, Cortex XSOAR</p>
                </div>
              </div>
            </div>

            <div className="specs-right">
              <div className="section-label">
                <span /> FREQUENTLY ASKED QUESTIONS
              </div>
              <div className="product-faq-list">
                {[
                  {
                    q: 'How does SeguraSecure S.1 deploy in our infrastructure?',
                    a: 'S.1 deploys as an agentless cloud connector or lightweight eBPF daemonset on your Kubernetes nodes. Deployment takes less than 15 minutes and introduces no kernel modifications or latency overhead.',
                  },
                  {
                    q: 'Does S.1 replace our existing SIEM or EDR tools?',
                    a: 'S.1 is designed to complement or enhance your current security stack. While it provides full autonomous investigation capabilities, it can also feed correlated incident graphs and verified evidence directly into your existing SIEM or ticketing system.',
                  },
                  {
                    q: 'How does S.1 guarantee the AI assistant will not hallucinate?',
                    a: 'Our AI Investigation Assistant uses a deterministic retrieval and reasoning architecture powered by NVIDIA NIM. The model is constrained to only answer queries using cryptographically hashed telemetry evidence collected by Morpheus and RAPIDS. Unverified assumptions are rejected by design.',
                  },
                  {
                    q: 'Can S.1 execute automated blocking without human intervention?',
                    a: 'Yes, but it is entirely configurable. By default, S.1 operates in "Governed Mode" where high-impact actions (such as token revocation or pod isolation) are staged for 1-click analyst approval. You can enable automated quarantine rules for high-confidence indicators.',
                  },
                  {
                    q: 'How can our team evaluate SeguraSecure S.1 today?',
                    a: 'You can immediately launch the live product console at app.segurara.com or schedule a guided proof-of-concept with our security engineering team to run S.1 in a sandbox environment.',
                  },
                ].map((item, idx) => (
                  <div className={`faq-accordion-item ${openFaq === idx ? 'open' : ''}`} key={idx}>
                    <button
                      className="faq-accordion-btn"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={17} />
                    </button>
                    {openFaq === idx && (
                      <div className="faq-accordion-body">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CONVERSION & LAUNCH CTA */}
        <section className="product-final-cta section-pad">
          <div className="final-cta-card">
            <div className="cta-glow" />
            <div className="eyebrow">
              <span className="pulse-dot" />
              <span>EXPERIENCE NEXT-GEN SECURITY INTELLIGENCE</span>
            </div>
            <h2>Ready to see <em>SeguraSecure S.1</em> in action?</h2>
            <p>
              Empower your security team with line-rate telemetry correlation, deterministic attack-path tracing,
              and evidence-grounded AI investigations.
            </p>
            <div className="final-cta-actions">
              <a
                href="https://app.segurara.com"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button large-cta"
              >
                <Sparkles size={18} />
                <span>Launch SeguraSecure S.1 Now</span>
                <ArrowUpRight size={18} />
              </a>

              <button className="secondary-button large-cta" onClick={onHome}>
                <span>Return to Overview</span>
              </button>
            </div>
            <div className="final-cta-badges">
              <span><Check size={14} /> Live interactive console</span>
              <span><Check size={14} /> Instant multi-cloud onboarding</span>
              <span><Check size={14} /> Enterprise support included</span>
            </div>
          </div>
        </section>
      </main>

      {/* Product Page Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button className="brand" onClick={onHome}>
              <span className="brand-mark"><span /></span> SEGURARA
            </button>
            <p>
              SeguraSecure S.1 · Autonomous AI Runtime &amp; Workload Defense
              <br />
              Part of Segurara Security Intelligence
            </p>
          </div>
          <div className="footer-col">
            <b>Product</b>
            <a href="#capabilities">Capabilities</a>
            <a href="#in-action">Live Defense</a>
            <a href="#engine">Engine Specs</a>
            <a href="#specs">Specifications</a>
          </div>
          <div className="footer-col">
            <b>Live Product</b>
            <a href="https://app.segurara.com" target="_blank" rel="noopener noreferrer">
              Launch App <ExternalLink size={11} style={{ display: 'inline', marginLeft: 4 }} />
            </a>
            <a href="#engine">NVIDIA AI Stack</a>
            <a href="#specs">FAQ</a>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <button className="footer-link" onClick={onHome}>Home Overview</button>
            <button className="footer-link" onClick={onPrivacy}>Privacy Policy</button>
            <button className="footer-link" onClick={onTerms}>Terms of Service</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Segurara Technologies. All rights reserved. SeguraSecure S.1 is an enterprise product of Segurara.</span>
          <div>
            <button className="footer-link" onClick={onPrivacy}>Privacy</button>
            <button className="footer-link" onClick={onTerms}>Terms</button>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Dedicated Product Page Header with links to S.1 sections
 * and prominent CTA pointing to live product https://app.segurara.com
 */
function ProductHeader({ onHome }: { onHome: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header product-site-header">
      <button className="brand" onClick={onHome} aria-label="Segurara home">
        <span className="brand-mark"><span /></span> SEGURARA <span className="brand-badge">S.1</span>
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
        <a href="#in-action" onClick={() => setMenuOpen(false)}>In Action</a>
        <a href="#engine" onClick={() => setMenuOpen(false)}>Engine Specs</a>
        <a href="#specs" onClick={() => setMenuOpen(false)}>Specifications</a>
        <button
          className="text-button home-back-btn"
          onClick={() => { setMenuOpen(false); onHome(); }}
        >
          Overview Site
        </button>

        {/* Mobile Navigation CTA to live product */}
        <a
          href="https://app.segurara.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta nav-cta-mobile"
          onClick={() => setMenuOpen(false)}
        >
          <Sparkles size={14} /> Launch App <ExternalLink size={14} />
        </a>
      </nav>

      <div className="header-actions">
        <button className="ghost-button" onClick={onHome} title="Return to marketing overview">
          Back to Overview
        </button>

        {/* Primary Desktop Action Button linking to live product */}
        <a
          href="https://app.segurara.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta live-app-cta"
        >
          <Sparkles size={14} />
          <span>Launch S.1</span>
          <ArrowUpRight size={14} />
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <ChevronDown size={19} /> : <Radio size={19} />}
        </button>
      </div>
    </header>
  );
}
