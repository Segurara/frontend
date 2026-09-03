import {
  Activity,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  Globe2,
  LayoutDashboard,
  Network,
  Radar,
  Server,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

export type Icon = typeof Activity;

export type NodeItem = { label: string; type: string; x: number; y: number; color: string; icon: Icon };

export const nodeItems: NodeItem[] = [
  { label: 'User', type: 'Identity', x: 12, y: 18, color: '#c4b5fd', icon: UserRound },
  { label: 'svc-payment', type: 'Identity', x: 32, y: 38, color: '#fbbf24', icon: Fingerprint },
  { label: 'checkout-api', type: 'Application', x: 50, y: 18, color: '#22d3ee', icon: Code2 },
  { label: '/api/payment', type: 'API endpoint', x: 72, y: 38, color: '#a855f7', icon: Globe2 },
  { label: 'production-eu-01', type: 'Workload', x: 46, y: 66, color: '#34d399', icon: Server },
  { label: 'AI endpoint', type: 'AI service', x: 80, y: 72, color: '#fb7185', icon: BrainCircuit },
  { label: 'payments-db', type: 'Database', x: 23, y: 78, color: '#818cf8', icon: Database },
];

export const capabilities = [
  { title: 'Runtime Security Intelligence', text: 'Structure application behavior, workload activity, identity context, and endpoint data into a well-structured investigation view.', icon: Radar, accent: 'cyan' },
  { title: 'Threat Correlation Workspace', text: 'Link potential relationships between identities, services, APIs, workloads, and detections.', icon: GitBranch, accent: 'violet' },
  { title: 'AI Investigation Assistant', text: 'Ask investigative questions and consider answers suggested by the system according to the evidence gathered', icon: Bot, accent: 'amber' },
  { title: 'Security Relationship Graph', text: 'Analyze entity relationships, potential attack paths, and affected areas without losing temporal context.', icon: Network, accent: 'green' },
  { title: 'Security Operations Dashboard', text: 'Check risk indicators, case activities, telemetry status, and investigation status in one place.', icon: LayoutDashboard, accent: 'pink' },
  { title: 'Controlled Response Support', text: 'Prepare response actions for analyst approval with governance and audit history.', icon: ShieldCheck, accent: 'blue' },
];

export const faqs = [
  ['What is Segurara?', 'Segurara is a platform that enables the linking of activity across applications, APIs, identities, workloads, AI services, and infrastructure in an investigation view.'],
  ['What information can Segurara connect?', 'Segurara connects selected data sources into a structured investigation context.'],
  ['Does Segurara automatically block threats?', 'The platform is meant for supporting security investigations, evidence examination, and analyst-based decisions. Response actions depend on the configuration and approval of the organization.'],
  ['How does Segurara use AI?', 'Artificial intelligence will be used to summarize evidence, identify possible connections, and generate investigation questions and evidence review steps.'],
  ['Can analysts investigate using natural language?', 'The investigation assistant helps analysts ask questions and review evidence-linked answers.'],
  ['Does Segurara support relationship and attack-path analysis?', 'The feature of relationship views will provide analysts with the opportunity to study the connections between identities, applications, APIs, workloads, services, and endpoints.'],
];

export type ChatMessage = { role: 'user' | 'assistant'; text: string; pills?: string[]; suggestion?: string };

export const aiResponses: Record<string, ChatMessage> = {
  'why is this activity considered risky': { role: 'assistant', text: 'The activity is associated with an unusual API sequence involving a service identity and a production workload. The combination of an elevated risk indicator and an atypical request pattern suggests this warrants analyst review.', pills: ['4 correlated events', '2 related entities', 'Unusual request pattern', 'Elevated risk indicator'], suggestion: 'Review the linked identity and workload timeline.' },
  'why is this workload suspicious': { role: 'assistant', text: 'The workload is associated with an unusual sequence of API and identity events. This is an indication for review, not a definitive conclusion.', pills: ['6 correlated events', '2 identity relationships', '1 elevated runtime indicator'], suggestion: 'Review service identity activity between 14:00 and 14:10.' },
  'what is the risk level': { role: 'assistant', text: 'Current risk level for CASE-2048 is Elevated with 87% confidence. The risk is driven by anomalous API call patterns from a service identity interacting with a production workload outside its normal baseline.', pills: ['Risk: Elevated', 'Confidence: 87%', '5 connected entities'], suggestion: 'Examine the entity relationship graph for lateral movement paths.' },
  'show me the timeline': { role: 'assistant', text: 'The incident timeline shows 4 key events between 14:02:11 and 14:02:24 UTC: an API request, an identity anomaly, a runtime event, and a model endpoint call — all within 13 seconds.', pills: ['14:02:11 API request', '14:02:14 Identity anomaly', '14:02:18 Runtime event', '14:02:24 Model endpoint call'], suggestion: 'Review each event in sequence to identify the initial trigger.' },
  'what entities are involved': { role: 'assistant', text: 'Five entities are connected to this case: the service identity svc-payment, the application checkout-api, the API endpoint /api/payment, the workload production-eu-01, and the AI endpoint risk-review-model.', pills: ['svc-payment', 'checkout-api', '/api/payment', 'production-eu-01', 'risk-review-model'], suggestion: 'Inspect the relationship graph to see how these entities connect.' },
  'is this a data breach': { role: 'assistant', text: 'There is no confirmed data breach at this time. The activity shows elevated risk indicators and unusual patterns, but analyst review is required to determine if data was exfiltrated or if this is a false positive.', pills: ['No confirmed breach', 'Analyst review required', 'Investigation ongoing'], suggestion: 'Check database access logs for the payments-db entity.' },
  'what should i do next': { role: 'assistant', text: 'Based on the current investigation state, the recommended next steps are: review the linked identity timeline, inspect the entity relationship graph, and check telemetry health for any gaps in coverage.', pills: ['Review identity timeline', 'Inspect entity graph', 'Check telemetry coverage'], suggestion: 'Start with the svc-payment identity activity between 14:00 and 14:10.' },
  'who is affected': { role: 'assistant', text: 'The primary entities under investigation are the service identity svc-payment and the checkout-api application. No end-user impact has been confirmed yet, but the production workload production-eu-01 is involved.', pills: ['svc-payment (identity)', 'checkout-api (application)', 'production-eu-01 (workload)'], suggestion: 'Review user session data for any anomalies during the incident window.' },
};

export const fallbackMessages: ChatMessage[] = [
  { role: 'assistant', text: 'I can help with security investigation questions related to the current case context. Try asking about risk levels, timelines, entities, or next steps. For full AI-powered analysis, please subscribe to Segurara Professional or higher.', pills: ['Try: "What is the risk level?"', 'Try: "Show me the timeline"', 'Subscribe for full access'], suggestion: 'Ask about the current case context for a relevant response.' },
  { role: 'assistant', text: 'I don\'t have enough context to answer that specific question. I\'m optimized for questions about the current investigation case. For deeper analysis, upgrade your plan to unlock advanced AI capabilities.', pills: ['Limited context available', 'Upgrade for full AI analysis', 'Current case: CASE-2048'], suggestion: 'Try asking about entities, risk levels, or the investigation timeline.' },
  { role: 'assistant', text: 'That query is outside my current analysis scope. I can assist with investigation-related questions such as risk assessment, entity relationships, timeline analysis, and next-step suggestions. Subscribe for broader security intelligence queries.', pills: ['Scope: Investigation context', 'Subscribe for broader queries', '2 remaining questions today'], suggestion: 'Rephrase your question to focus on the active case.' },
];

export const events = [
  { time: '14:02:11', label: 'API request', detail: 'POST /api/payment', color: 'cyan' },
  { time: '14:02:14', label: 'Identity anomaly', detail: 'svc-payment · unusual scope', color: 'amber' },
  { time: '14:02:18', label: 'Runtime event', detail: 'checkout-api · elevated indicator', color: 'rose' },
  { time: '14:02:24', label: 'Model endpoint call', detail: 'risk-review-model · linked', color: 'violet' },
];

export const headersMeta = {
  home: 'Segurara — Security Intelligence for Modern Applications',
  product: 'Segurara — Security Workspace',
  privacy: 'Segurara — Privacy Policy',
  terms: 'Segurara — Terms and Conditions',
};
