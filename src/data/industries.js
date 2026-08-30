// Content for the interactive "agent in action" demo, per industry.
// Each industry shares the same 4-stage agent workflow (Trigger, Reason,
// Act, Result) but with scenario-specific copy — this mirrors how the
// underlying product actually works: same agent framework, different
// configuration per industry.
//
// The "impact" bars are illustrative, qualitative comparisons meant to show
// the shape of the improvement.

export const INDUSTRIES = [
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    scenario: 'AI Cart Recovery & Instant Checkout Concierge',
    queueLabel: 'Live checkout stream',
    steps: [
      {
        stage: 'Trigger',
        title: 'High-intent cart abandoned',
        detail: 'A customer adds high-value items to cart, starts checkout, but leaves before completing payment.',
        card: { kind: 'incoming', title: 'Cart #TL-8492 — Silk Blazer ($240)', meta: 'User: Ananya R. · Abandoned 2m ago', badge: 'HIGH INTENT' },
      },
      {
        stage: 'Reason',
        title: 'The agent analyzes incentive threshold',
        detail: 'It checks user purchase history, cart profit margin, and stock velocity to determine a margin-safe 10% instant perk.',
        card: { kind: 'checks', items: ['Verified cart margin & inventory level', 'Checked user lifetime purchase history', 'Calculated margin-safe dynamic incentive'] },
      },
      {
        stage: 'Act',
        title: 'It dispatches personalized WhatsApp concierge',
        detail: 'Sends a tailored WhatsApp message with a 1-click pre-filled checkout link and styling recommendation.',
        card: { kind: 'action', title: 'WhatsApp Concierge Dispatched', meta: '1-Click Checkout Link · 10% Limited Perk Applied' },
      },
      {
        stage: 'Result',
        title: 'Order completed in 30 seconds',
        detail: 'Customer pays via Apple Pay / UPI in 1 tap. Shopify inventory, ERP, and warehouse are updated instantly.',
        card: { kind: 'result', title: 'Order Confirmed & Synced', meta: 'Zero manual email campaigns needed' },
      },
    ],
    impact: {
      before: 'Generic batch email 24h later (7% recovery)',
      after: 'AI concierge in 3m (34% recovery rate)',
      chips: ['1-Click WhatsApp & SMS checkout', 'Margin-safe dynamic incentives', 'Zero manual email marketing setup'],
    },
    marketUseCases: ['Dynamic cart recovery & WhatsApp checkout', 'AI personal shopping concierge', 'Real-time inventory & returns routing'],
    frontierUseCases: ['Autonomous multi-channel pricing rebalancing', 'Predictive restock pre-allocation', 'Zero-return size recommendation engine'],
  },
  {
    id: 'food-delivery',
    label: 'Food Delivery',
    scenario: 'Smart Kitchen Prep & Rider Dispatch Sync',
    queueLabel: 'Live kitchen & order stream',
    steps: [
      {
        stage: 'Trigger',
        title: 'Surge dinner order lands',
        detail: 'A customer places a multi-item order during peak dinner rush with custom dietary notes.',
        card: { kind: 'incoming', title: 'Order #FD-2910 — 4 Items ($68)', meta: 'Kitchen: Downtown Hub · 45s ago', badge: 'SURGE ORDER' },
      },
      {
        stage: 'Reason',
        title: 'The agent predicts prep & traffic latency',
        detail: 'It calculates exact oven prep time, kitchen station load, and current road traffic for nearby riders.',
        card: { kind: 'checks', items: ['Estimated station prep: 14 mins', 'Analyzed road congestion index', 'Clustered 3 nearby delivery partners'] },
      },
      {
        stage: 'Act',
        title: 'It synchronizes rider arrival with the pass',
        detail: 'Dispatches the optimal rider so they arrive exactly as the food is packed, batching an adjacent drop-off.',
        card: { kind: 'action', title: 'Optimal Rider Dispatched', meta: 'Rider ETA: 13m 40s · Zero wait at kitchen' },
      },
      {
        stage: 'Result',
        title: 'Sub-22min hot delivery confirmed',
        detail: 'Food stays hot with zero staging delay. Live GPS tracking and delivery ETA stream to customer app.',
        card: { kind: 'result', title: 'Dispatched on schedule', meta: 'Zero food cooling time on kitchen counter' },
      },
    ],
    impact: {
      before: 'Riders wait 15m outside kitchen, cold food',
      after: 'Synchronized pickup, hot delivery in < 22m',
      chips: ['18% faster kitchen-to-door transit', 'Predictive multi-order batching', 'Automated surge-hour dispatch'],
    },
    marketUseCases: ['Kitchen prep & rider synchronization', 'Dynamic multi-stop route batching', 'Surge-hour pricing & fleet rebalancing'],
    frontierUseCases: ['Predictive ingredient demand forecasting', 'Autonomous refund & dispute resolution', 'Drone & micro-mobility delivery handoffs'],
  },
  {
    id: 'fintech',
    label: 'Fintech',
    scenario: 'Instant KYC, Credit Decisioning & AML Shield',
    queueLabel: 'Live loan & payment stream',
    steps: [
      {
        stage: 'Trigger',
        title: 'Instant loan / high-value transfer requested',
        detail: 'A business owner applies for a $25,000 working capital line with connected bank accounting data.',
        card: { kind: 'incoming', title: 'Capital Request #FT-5012 ($25,000)', meta: 'Business: Apex Logistics · just now', badge: 'LIVE APP' },
      },
      {
        stage: 'Reason',
        title: 'The agent verifies identity & cashflow health',
        detail: 'In 450ms, it runs KYC biometric checks, cashflow velocity analysis, and cross-checks AML sanction lists.',
        card: { kind: 'checks', items: ['Biometric & ID verified (KYC 100%)', 'Calculated 12-mo cashflow DSCR', 'Scanned global AML & PEP sanction lists'] },
      },
      {
        stage: 'Act',
        title: 'It generates risk-adjusted terms & ledger note',
        detail: 'Calculates optimal APR tier, prepares legally compliant promissory agreement, and reserves credit facility.',
        card: { kind: 'action', title: 'Approval Tier Assigned', meta: 'Tier A+ · 6.2% APR · Contract Generated' },
      },
      {
        stage: 'Result',
        title: 'Instant fund disbursement under 60s',
        detail: 'Funds transfer via instant rails. Compliance officer receives an immutable audit-proof AML record.',
        card: { kind: 'result', title: 'Disbursed in 48 seconds', meta: '100% Audit-ready compliance trail' },
      },
    ],
    impact: {
      before: '3–5 days manual paperwork backlog',
      after: 'Instant approval & disbursement in < 60s',
      chips: ['99.8% accurate fraud & AML detection', 'Sub-second real-time risk decisioning', 'Zero manual document re-keying'],
    },
    marketUseCases: ['Instant credit decisioning & underwriting', 'Real-time transaction fraud prevention', 'Automated KYC & AML compliance checks'],
    frontierUseCases: ['Autonomous cross-border FX hedging', 'Real-time multi-institution fraud graph analysis', 'Synthetic data stress testing'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    scenario: 'Patient intake & triage agent',
    queueLabel: 'Referral queue',
    steps: [
      {
        stage: 'Trigger',
        title: 'A new referral comes in',
        detail: 'A clinic sends over a referral for a cardiology consult, unread in the inbox a minute ago.',
        card: { kind: 'incoming', title: 'Priya S. — Cardiology referral', meta: 'From Sunrise Clinic · just now', badge: 'NEW' },
      },
      {
        stage: 'Reason',
        title: 'The agent reads the case',
        detail: 'It checks the referral notes, prior visit history, and how urgent the symptoms sound.',
        card: { kind: 'checks', items: ['Checked referral notes', 'Reviewed visit history', 'Assessed urgency level'] },
      },
      {
        stage: 'Act',
        title: 'It books the right slot',
        detail: 'Matches an open slot with the right specialist and verifies the insurance plan covers it.',
        card: { kind: 'action', title: 'Appointment booked', meta: 'Dr. Mehta · Thu 10:30 AM · Insurance verified' },
      },
      {
        stage: 'Result',
        title: 'A coordinator confirms it',
        detail: 'The care coordinator sees a ready-to-confirm booking. Anything urgent is flagged, not auto-booked.',
        card: { kind: 'result', title: 'Ready for confirmation', meta: 'No urgent flags on this case' },
      },
    ],
    impact: {
      before: 'Referral sits in an inbox',
      after: 'Slot matched same day',
      chips: ['Faster referral-to-appointment time', 'Fewer insurance mismatches at the visit', 'Coordinators review, not re-key'],
    },
    marketUseCases: ['Clinical documentation & ambient scribing', 'Referral & intake triage', 'Diagnostic workflow support'],
    frontierUseCases: ['Pre-submission denial prevention', 'Discharge orchestration', 'Cross-department capacity rebalancing'],
  },
  {
    id: 'pharma',
    label: 'Pharma',
    scenario: 'Adverse event triage agent',
    queueLabel: 'Safety inbox',
    steps: [
      {
        stage: 'Trigger',
        title: 'A field report lands',
        detail: 'A rep forwards a patient-reported side effect from a call, in loose, unstructured text.',
        card: { kind: 'incoming', title: 'Adverse event report — Drug X', meta: 'Forwarded by field rep · 2m ago', badge: 'NEW' },
      },
      {
        stage: 'Reason',
        title: 'The agent structures it',
        detail: 'It extracts the drug, dose, symptom, and timeline, and classifies severity against your criteria.',
        card: { kind: 'checks', items: ['Extracted drug, dose & symptom', 'Classified severity', 'Checked reporting timeline'] },
      },
      {
        stage: 'Act',
        title: 'It drafts the filing',
        detail: 'A structured, regulatory-ready summary is prepared and routed to the safety officer for sign-off.',
        card: { kind: 'action', title: 'Draft summary prepared', meta: 'Routed to Safety Officer · Severity: Moderate' },
      },
      {
        stage: 'Result',
        title: 'A human signs off',
        detail: 'The safety officer reviews and approves — the agent never files anything on its own.',
        card: { kind: 'result', title: 'Awaiting officer sign-off', meta: 'Nothing filed without approval' },
      },
    ],
    impact: {
      before: 'Manually retyped into forms',
      after: 'Structured draft in minutes',
      chips: ['Consistent severity classification', 'Faster time-to-filing', 'Officers review, not retype'],
    },
    marketUseCases: ['Adverse event triage', 'Multilingual case intake', 'Regulatory document preparation'],
    frontierUseCases: ['Predictive trial-dropout prevention', 'Multi-jurisdiction regulatory auto-transformation', 'Cold-chain excursion prevention'],
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    scenario: 'Lead & listing match agent',
    queueLabel: 'Inbound leads',
    steps: [
      {
        stage: 'Trigger',
        title: 'A new inquiry arrives',
        detail: 'Someone fills out a form on a listing site asking about 3-bedroom homes under budget.',
        card: { kind: 'incoming', title: 'Inquiry — 3BHK, west side', meta: 'From listing portal · just now', badge: 'NEW' },
      },
      {
        stage: 'Reason',
        title: 'The agent qualifies it',
        detail: 'It checks stated budget, timeline, and must-haves against what\'s actually available.',
        card: { kind: 'checks', items: ['Confirmed budget range', 'Checked move-in timeline', 'Matched must-have list'] },
      },
      {
        stage: 'Act',
        title: 'It matches and schedules',
        detail: 'Shortlists the closest-fit listings and proposes viewing times that work for both sides.',
        card: { kind: 'action', title: '3 listings matched', meta: 'Viewing proposed · Sat 11:00 AM' },
      },
      {
        stage: 'Result',
        title: 'The agent gets a warm lead',
        detail: 'A qualified, scheduled viewing lands in the agent\'s calendar — not a cold form submission.',
        card: { kind: 'result', title: 'Viewing confirmed', meta: 'Lead qualified before first contact' },
      },
    ],
    impact: {
      before: 'Inquiry sits until a callback',
      after: 'Qualified viewing same day',
      chips: ['Faster response to inbound leads', 'Fewer mismatched showings', 'Agents spend time closing, not sorting'],
    },
    marketUseCases: ['Lead response acceleration', 'Lease abstraction', 'AI qualification for inbound leads'],
    frontierUseCases: ['Cross-party transaction orchestration', 'Zoning & feasibility-in-minutes', 'Portfolio-wide predictive maintenance'],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    scenario: 'Shipment exception agent',
    queueLabel: 'Exception queue',
    steps: [
      {
        stage: 'Trigger',
        title: 'A shipment flags an exception',
        detail: 'A container gets held at customs — the carrier feed marks it delayed.',
        card: { kind: 'incoming', title: 'Shipment #48213 — customs hold', meta: 'Carrier feed · 5m ago', badge: 'EXCEPTION' },
      },
      {
        stage: 'Reason',
        title: 'The agent checks the impact',
        detail: 'It cross-references the delay against the delivery SLA and which customers are affected.',
        card: { kind: 'checks', items: ['Checked carrier status', 'Compared against SLA', 'Identified affected customers'] },
      },
      {
        stage: 'Act',
        title: 'It notifies proactively',
        detail: 'Affected customers get a heads-up with a revised ETA before they call to ask.',
        card: { kind: 'action', title: 'Customers notified', meta: 'Revised ETA sent · 12 accounts' },
      },
      {
        stage: 'Result',
        title: 'Dispatch handles what\'s real',
        detail: 'Only shipments that need a human decision reach the dispatch desk.',
        card: { kind: 'result', title: 'Escalated to dispatch', meta: 'Only true exceptions surfaced' },
      },
    ],
    impact: {
      before: 'Customer calls to ask first',
      after: 'Customer notified proactively',
      chips: ['Delays surfaced before customers ask', 'Fewer manual status-check calls', 'Dispatch focused on real exceptions'],
    },
    marketUseCases: ['Route optimization & warehouse automation', 'Operational exception handling', 'Proactive disruption response'],
    frontierUseCases: ['Agent-to-agent capacity negotiation', 'Predictive customs risk scoring', 'Auto-executing reroutes for low-risk disruptions'],
  },
  {
    id: 'automobile',
    label: 'Automobile',
    scenario: 'Service & parts agent',
    queueLabel: 'Service bay queue',
    steps: [
      {
        stage: 'Trigger',
        title: 'A diagnostic code comes in',
        detail: 'A vehicle in the service bay returns a fault code the technician logs into the system.',
        card: { kind: 'incoming', title: 'Fault code P0302 — Cylinder 2 misfire', meta: 'Bay 3 · just now', badge: 'NEW' },
      },
      {
        stage: 'Reason',
        title: 'The agent checks coverage',
        detail: 'It reads the diagnostic history, checks warranty status, and finds the right part in stock.',
        card: { kind: 'checks', items: ['Read diagnostic history', 'Checked warranty status', 'Located part in inventory'] },
      },
      {
        stage: 'Act',
        title: 'It drafts the estimate',
        detail: 'A parts-and-labor estimate is prepared, with the part reserved so it\'s ready on arrival.',
        card: { kind: 'action', title: 'Estimate drafted', meta: 'Part reserved · Under warranty' },
      },
      {
        stage: 'Result',
        title: 'The advisor talks, not types',
        detail: 'The service advisor reviews the estimate with the customer instead of building it from scratch.',
        card: { kind: 'result', title: 'Ready for customer review', meta: 'No manual parts lookup needed' },
      },
    ],
    impact: {
      before: 'Manual lookup, then estimate',
      after: 'Estimate ready on diagnosis',
      chips: ['Faster diagnostic-to-estimate time', 'Fewer wrong-part orders', 'Advisors focus on the conversation'],
    },
    marketUseCases: ['Warranty claims processing', 'Dealership BDC automation', 'Service scheduling'],
    frontierUseCases: ['VIN-level predictive part positioning', 'Cross-dealer autonomous inventory swaps', 'Recall remediation orchestration'],
  },
]
