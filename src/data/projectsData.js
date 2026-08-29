import { 
  ShoppingBag, Car, UtensilsCrossed, Droplets, Milk, Sparkles, MessageSquare, Store
} from 'lucide-react'

export const CATEGORIES = [
  'All Projects',
  'E-Commerce',
  'Car Rental & GPS',
  'Food Delivery',
  'Dairy & Subscription',
  'Auto Services',
  'WhatsApp Bots'
]

export const PROJECTS = [
  {
    id: 'zynara',
    name: 'Zynara',
    industry: 'E-Commerce',
    category: 'E-Commerce',
    badge: 'LUXURY ONLINE SHOPPING',
    icon: ShoppingBag,
    color: '#ff6d42',
    defaultView: 'desktop',
    demoDomain: 'https://zynara.netlify.app',
    targetUrl: 'https://zynara.netlify.app/',
    tagline: 'Modern luxury fashion store with instant checkout, dynamic product variations, and interactive shopping cart.',
    metrics: [
      { label: 'Page Speed', val: '< 1.2s' },
      { label: 'Product Options', val: '100% Dynamic' },
      { label: 'Sales Increase', val: '+42%' }
    ],
    tech: ['Next.js 14', 'Smooth Animations', 'Live Cart Drawer', 'Instant Checkout', 'Mobile First Design'],
    nodes: [
      { step: '01', name: 'Browse Store', desc: 'Curated seasonal lookbooks & zoom' },
      { step: '02', name: 'Select Options', desc: 'Real-time stock & price update' },
      { step: '03', name: 'Instant Pay', desc: 'One-click secure UPI & cards' },
      { step: '04', name: 'Order Dispatch', desc: 'Instant WhatsApp confirmation' }
    ],
    highlights: [
      'Smooth floating shopping bag with instant coupon discount calculations',
      'High-resolution multi-photo product galleries with pinch-to-zoom on mobile',
      'Curated seasonal collections with quick one-click add to cart',
      'Fast page loading under 1.2 seconds designed specifically for mobile shoppers'
    ]
  },
  {
    id: 'shubh-safar',
    name: 'Shubh Safar',
    industry: 'Automobile',
    category: 'Car Rental & GPS',
    badge: 'CAR RENTAL & LIVE GPS FLEET',
    icon: Car,
    color: '#38bdf8',
    defaultView: 'desktop',
    demoDomain: 'https://shubhsafar.netlify.app/#browse',
    targetUrl: 'https://shubhsafar.netlify.app/#browse',
    tagline: 'Self-drive car booking platform with live GPS road route tracking and driver dashboards.',
    metrics: [
      { label: 'GPS Tracking', val: 'Live Maps' },
      { label: 'ID Verification', val: 'Instant KYC' },
      { label: 'Booking Time', val: '< 2 Mins' }
    ],
    tech: ['Interactive Road Maps', 'Live GPS Routes', 'Online ID Verification', 'Driver Login PIN', 'Automatic PDF Invoices'],
    nodes: [
      { step: '01', name: 'Browse Cars', desc: 'Filter by sedan, SUV & availability' },
      { step: '02', name: 'Verify ID', desc: 'Instant Aadhaar & license check' },
      { step: '03', name: 'GPS Route Map', desc: 'Real-time road ETA & distance' },
      { step: '04', name: 'Return OTP', desc: 'Trip complete & automatic bill' }
    ],
    highlights: [
      'Live road route maps with accurate arrival times across city landmarks',
      'Instant online ID verification for Aadhaar and Driving Licenses',
      'Easy PIN-login portals for drivers, car owners, and store managers',
      'Secure return OTP verification with instant PDF rental bills'
    ]
  },
  {
    id: 'cheat-meals',
    name: 'Cheat Meals',
    industry: 'Food Delivery',
    category: 'Food Delivery',
    badge: 'FOOD DELIVERY & KITCHEN ORDERS',
    icon: UtensilsCrossed,
    color: '#fb7185',
    defaultView: 'desktop',
    demoDomain: 'https://cheatmeals.netlify.app',
    targetUrl: 'https://cheatmeals.netlify.app',
    tagline: 'Live restaurant order system with kitchen screen alerts and real-time delivery tracking.',
    metrics: [
      { label: 'Order Sync', val: 'Real-Time' },
      { label: 'Kitchen Screen', val: 'Auto Chimes' },
      { label: 'Delivery OTP', val: '100% Secure' }
    ],
    tech: ['Instant Cloud Sync', 'Live Kitchen Screen', 'Sound Chime Alerts', 'Live Delivery Tracker', 'Delivery Rider App'],
    nodes: [
      { step: '01', name: 'Customer Cart', desc: 'Custom meal add-ons & instructions' },
      { step: '02', name: 'Kitchen Screen', desc: 'Sound chime rings in the kitchen' },
      { step: '03', name: 'Live Rider Map', desc: 'Rider picks up & heads to address' },
      { step: '04', name: 'Doorstep OTP', desc: 'Secure handoff & order complete' }
    ],
    highlights: [
      'Instant order stream with sound chime alerts for kitchen staff',
      'Live delivery progress screen showing your delivery rider in motion',
      'Multi-branch restaurant support with secret OTP verification upon delivery',
      'Special food customization options and instant discounts'
    ]
  },
  {
    id: 'autoshine',
    name: 'AutoShine',
    industry: 'Automobile',
    category: 'Auto Services',
    badge: 'DOORSTEP VEHICLE DETAILING',
    icon: Sparkles,
    color: '#c084fc',
    defaultView: 'desktop',
    demoDomain: 'https://autoshinewash.netlify.app',
    targetUrl: 'https://autoshinewash.netlify.app',
    tagline: 'Doorstep car wash and ceramic coating booking with instant time-slot scheduling.',
    metrics: [
      { label: 'Car Pricing', val: 'Clear Rates' },
      { label: 'Slot Booking', val: 'Instant' },
      { label: 'Customer Rating', val: '5.0 ★ Stars' }
    ],
    tech: ['Car Model Pricing Matrix', 'Calendar Time Slots', 'Doorstep Field Dispatch', 'Online & Cash Payments'],
    nodes: [
      { step: '01', name: 'Select Vehicle', desc: 'Hatchback, sedan, SUV or luxury' },
      { step: '02', name: 'Choose Service', desc: 'Deep foam wash, polish, ceramic' },
      { step: '03', name: 'Book Time Slot', desc: 'Pick preferred date and hour' },
      { step: '04', name: 'Technician Visit', desc: 'Doorstep arrival & digital report' }
    ],
    highlights: [
      'Clear, transparent pricing based on vehicle type (Hatchback, Sedan, SUV, Luxury)',
      'Custom service package builder (Foam Wash, Interior Sanitization, Ceramic Coating)',
      'Real-time date and time-slot booking with doorstep technician assignment',
      'Digital inspection report and clear progress updates'
    ]
  },
  {
    id: 'aheera-milk',
    name: 'Aheera Milk',
    industry: 'FMCG & Subscriptions',
    category: 'Dairy & Subscription',
    badge: 'DAILY DAIRY SUBSCRIPTION',
    icon: Milk,
    color: '#38bdf8',
    defaultView: 'desktop',
    demoDomain: 'https://aheeramilk.netlify.app',
    targetUrl: 'https://aheeramilk.netlify.app',
    tagline: 'Daily farm fresh milk delivery app with calendar schedules, vacation pause, and WhatsApp billing.',
    metrics: [
      { label: 'Delivery Schedule', val: 'Daily / Alt' },
      { label: 'Vacation Pause', val: '1-Tap Pause' },
      { label: 'WhatsApp Bills', val: 'Auto UPI' }
    ],
    tech: ['Mobile Web App (PWA)', 'Calendar Subscriptions', 'Delivery Route Organizer', 'WhatsApp Billing Bot', 'UPI QR Codes'],
    nodes: [
      { step: '01', name: 'Daily Plan', desc: 'Set milk quantity & delivery days' },
      { step: '02', name: 'Route Sheet', desc: 'Driver gets morning map sheet' },
      { step: '03', name: 'Bottle Tally', desc: 'Log deliveries & empty bottle return' },
      { step: '04', name: 'WhatsApp Bill', desc: 'Monthly bill with one-tap UPI link' }
    ],
    highlights: [
      'Flexible daily or alternate-day milk schedule with one-tap vacation pause',
      'Automated morning delivery route sheets organized per delivery agent',
      'Automatic monthly WhatsApp bill generation with one-click UPI payment links',
      'Bottle return tracking and complete delivery history'
    ]
  },
  {
    id: 'aheera-store',
    name: 'Aheera Store',
    industry: 'FMCG & Subscriptions',
    category: 'Dairy & Subscription',
    badge: 'STORE MANAGER & INVOICING',
    icon: Store,
    color: '#34d399',
    defaultView: 'desktop',
    demoDomain: 'https://aheerastore.netlify.app',
    targetUrl: 'https://aheerastore.netlify.app/',
    tagline: 'Centralized dairy store management, customer balance ledgers, and WhatsApp billing.',
    metrics: [
      { label: 'Billing Bot', val: 'Auto WhatsApp' },
      { label: 'Balance Audit', val: '100% Accurate' },
      { label: 'Sync Speed', val: 'Instant' }
    ],
    tech: ['Store Dashboard', 'Customer Balance Ledger', 'WhatsApp Business Bot', 'UPI QR Generator', 'Route Allocation'],
    nodes: [
      { step: '01', name: 'Customer List', desc: 'Live account balances & history' },
      { step: '02', name: 'Assign Routes', desc: 'Driver allocation & bottle crates' },
      { step: '03', name: 'Send Invoices', desc: 'Auto WhatsApp PDF & UPI payment' },
      { step: '04', name: 'Reconcile', desc: 'Instant balance ledger updates' }
    ],
    highlights: [
      'One-click automated WhatsApp billing with embedded instant UPI payment links',
      'Early morning route allocation matrix and driver bottle tally logs',
      'Multi-customer balance ledger with historical transaction audit',
      'Instant cloud synchronization between customer app and store admin hub'
    ]
  },
  {
    id: 'whatsapp-crm',
    name: 'WhatsApp CRM Bot',
    industry: 'WhatsApp Bots & CRM',
    category: 'WhatsApp Bots',
    badge: 'AUTOMATED WHATSAPP BOT',
    icon: MessageSquare,
    color: '#fbbf24',
    defaultView: 'desktop',
    demoDomain: 'https://crm.tensorloom.ai/inbox',
    targetUrl: '#contact',
    tagline: 'Automated WhatsApp assistant that answers customer questions, captures leads, and shares bills 24/7.',
    metrics: [
      { label: 'Reply Speed', val: '< 1 Second' },
      { label: 'Lead Capture', val: '24/7 Auto' },
      { label: 'Daily Capacity', val: '10k+ Chats' }
    ],
    tech: ['Official WhatsApp API', '24/7 Auto Replies', 'Shared Team Inbox', 'Lead Management', 'Customer Tags'],
    nodes: [
      { step: '01', name: 'New Message', desc: 'Customer reaches out on WhatsApp' },
      { step: '02', name: 'Smart Reply', desc: 'AI answers catalog, price & hours' },
      { step: '03', name: 'Staff Handoff', desc: 'Alerts team for complex inquiries' },
      { step: '04', name: 'Auto Updates', desc: 'Order alerts & follow-up messages' }
    ],
    highlights: [
      '24/7 automatic answers for common customer questions, pricing, and orders',
      'Unified shared team inbox so your whole staff can reply from one number',
      'Automatic customer contact saving and organized tag segmentation',
      'Instant order status updates and automated payment reminder messages'
    ]
  }
]
