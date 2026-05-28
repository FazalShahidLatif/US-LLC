import { Service, StateFee, MediaConfig } from './types';

export const SERVICES: Service[] = [
  // 1. Business Formation
  {
    id: 'llc',
    title: 'LLC (Limited Liability Company) Formation',
    description: 'Protect your personal assets and get tax flexibility. Handled end-to-end with expedited state submission.',
    category: 'formation',
    basePrice: 79,
    features: [
      'Articles of Organization Filing',
      'Name Availability Check',
      'Standard Operating Agreement Template',
      'Digital Delivery of Corporate Docs',
      '1 Year of Free Electronic Storage'
    ],
    benefits: [
      'Limits personal liability for business debts',
      'Passed-through taxation prevents double tax',
      'Boosts credibility with clients and partners',
      'Flexible management structures'
    ],
    processSteps: [
      'Submit your business structure details online',
      'We conduct USPTO and Secretary of State name clearances',
      'We draft and file your official Articles of Organization',
      'Receive your state-stamped approval and corporate kit'
    ]
  },
  {
    id: 'c-corp',
    title: 'C Corporation Formation',
    description: 'Perfect for seeking venture capital, issuing stock options, and planning for an ultimate IPO or takeover.',
    category: 'formation',
    basePrice: 149,
    features: [
      'Articles of Incorporation Filing',
      'Corporate Bylaws & Resolutions',
      'Stock Certificates Issuance',
      'First Board of Directors Meeting Minutes',
      'Tax Identification Number (EIN) Preparation'
    ],
    benefits: [
      'Unlimited potential for scaling & foreign investment',
      'Easily grant stock options to employees',
      'Separate tax entity status',
      'Maximum credibility in international commerce'
    ],
    processSteps: [
      'Provide capital structure and initial stockholder allocation details',
      'We verify corporate name compatibility inside the target state',
      'Official Articles filed with certified copy acquisition',
      'Corporate record ledger, bylaws, and initial resolution delivered'
    ]
  },
  {
    id: 'nonprofit',
    title: 'Nonprofit Entity Formation',
    description: 'Establish your 501(c)(3) mission. We draft the compliant bylaws needed to clear IRS reviews.',
    category: 'formation',
    basePrice: 199,
    features: [
      'Nonprofit Articles of Incorporation',
      'Conflict of Interest Policy Template',
      'Custom Bylaws structured for IRS 501(c)(3) clearance',
      'IRS Package forms (1023 or 1023-EZ guidance)',
      'First Board Meeting outline'
    ],
    benefits: [
      'Eligible to receive tax-deductible contributions',
      'Qualified for corporate & federal foundation grants',
      'Exempt from corporate income tax',
      'Limited legal liability for staff and directors'
    ],
    processSteps: [
      'Specify your organizational purpose and charity core objectives',
      'State-level registry submission with strict nonprofit stipulations',
      'Delivery of customized regulatory bylaws and boards policies',
      'Detailed instructions manual for final IRS Form 1023 filing'
    ]
  },
  {
    id: 's-corp',
    title: 'S Corporation Tax Election',
    description: 'Optimize self-employment taxes (FICA) by converting your current LLC or Corporation tax designation.',
    category: 'formation',
    basePrice: 99,
    features: [
      'IRS Form 2553 Filing Preparation',
      'Corporate resolution authorizing election',
      'Shareholder consent affirmations',
      'Filing receipt and timeline tracking'
    ],
    benefits: [
      'Substantial tax savings on active business distribution',
      'Allows pre-tax write-offs for health insurance',
      'Avoids IRS double-taxation of traditional corporations'
    ],
    processSteps: [
      'Submit current entity details and shareholder tax list',
      'We prepare Form 2553 with corresponding board minutes',
      'You sign; we submit straight to the domestic IRS field center'
    ]
  },
  // 2. Compliance & Corporate Services
  {
    id: 'registered-agent',
    title: 'Registered Agent Service',
    description: 'Protect your privacy and never miss legal notices. Official address to receive service of process.',
    category: 'compliance',
    basePrice: 119,
    features: [
      'Physical address in all 50 states',
      'Instant digital scanning of legal notices',
      'Strict privacy: your home address stays off public records',
      'Compliance alerts for key filing dates'
    ],
    benefits: [
      'Preserves complete home address confidentiality',
      'No embarrassing legal service deliveries in front of clients',
      'Compliance alerts protect you from passive state defaults'
    ],
    processSteps: [
      'Select any state where physical representation is required',
      'US LLC assigns you our premium secure commercial address',
      'All physical legal notices scanned within 2 hours of receipt'
    ]
  },
  {
    id: 'ein',
    title: 'Employer Identification Number (EIN)',
    description: 'Your company Tax ID. Mandatory for opening US business bank accounts and hiring personnel.',
    category: 'compliance',
    basePrice: 49,
    features: [
      'IRS Application execution',
      'Form SS-4 drafting and submission',
      'Express processing for non-US residents (no SSN needed)',
      'Digital delivery certificate'
    ],
    benefits: [
      'Open a dedicated commercial bank account immediately',
      'Hire payroll employees and issue annual tax forms',
      'Establishes isolated corporate credit history'
    ],
    processSteps: [
      'Provide parent identity or owner SSN/ITIN details',
      'Instant direct API or specialized manual faxing alignment with IRS',
      'Official EIN delivered directly to your client dashboard'
    ]
  },
  {
    id: 'annual-report',
    title: 'Annual Report Compliance Filing',
    description: 'Keep your entity active and in good standing with the Secretary of State. We manage the deadlines.',
    category: 'compliance',
    basePrice: 89,
    features: [
      'Deadline tracking and custom email alerts',
      'Report formulation and validation checking',
      'Payment management for State fees',
      'Digital filing receipts'
    ],
    benefits: [
      'Avoids heavy late fees and automatic state dissolution',
      'Ensures continuous active verification standing',
      'Hassle-free automated notifications year-after-year'
    ],
    processSteps: [
      'Select target active business entities',
      'Our systems compute matching state deadlines and filing requisites',
      'Formulation and administrative submission filed for verification'
    ]
  },
  // 3. Intellectual Property
  {
    id: 'trademark',
    title: 'Trademark Registration',
    description: 'Protect your brand name, slogan, or logo. Federal USPTO clearance screening and guided application.',
    category: 'ip',
    basePrice: 249,
    features: [
      'Direct trademark availability screening',
      'Comprehensive USPTO database lookup',
      'Class of goods and services formulation',
      'Federal trademark filing submission'
    ],
    benefits: [
      'Exclusive nationwide legal rights to your brand',
      'Ability to sue infringers in federal court',
      'Requirement for Amazon Brand Registry protection',
      'Protects your brand mark against imitation'
    ],
    processSteps: [
      'Submit brand term, design, and target industries description',
      'Attorney-backed clearance report and likelihood-of-confusion review',
      'Official filing submitted under the proper trademark categories'
    ]
  },
  {
    id: 'copyright',
    title: 'Copyright Protection',
    description: 'Establish permanent ownership of original books, musical compositions, software codes, and artwork.',
    category: 'ip',
    basePrice: 99,
    features: [
      'US Copyright Office submission prep',
      'Required digital work deposit guidance',
      'Verification of authorship categories',
      'Official ownership certificate delivery'
    ],
    benefits: [
      'Public record of ownership proof',
      'Prerequisite for copyright infringement litigation',
      'Eligible for statutory damages up to $150,000 per violation'
    ],
    processSteps: [
      'Upload file deposit formats along with creator specifics',
      'We structure and docket application with the Library of Congress',
      'We monitor status until certification is officially delivered'
    ]
  },
  // 4. Personal Legal & Estate Plan
  {
    id: 'will',
    title: 'Last Will & Testament',
    description: 'Ensure your assets are distributed exactly how you wish. Appoint guardians for your minor children.',
    category: 'personal',
    basePrice: 99,
    features: [
      'Custom executor assignment',
      'Guardian designations for children',
      'Asset distribution planning',
      'Detailed signing instructions and witness sheets'
    ],
    benefits: [
      'Prevents state probate courts from assigning asset splits',
      'Saves families years of costly litigation and disputes',
      'Ensures your minor children stay with trusted guardians'
    ],
    processSteps: [
      'Fill our secure question guide regarding beneficiaries',
      'Instantly generate custom state-specific legally compliant testament doc',
      'Follow the printed instructions to sign with physical witnesses'
    ]
  },
  {
    id: 'trust',
    title: 'Living Trust Comprehensive Brief',
    description: 'Avoid probate courts completely. Hold assets on behalf of beneficiaries with ultimate tax controls.',
    category: 'personal',
    basePrice: 299,
    features: [
      'Revocable Trust agreement document',
      'Certificate of Trust summarized instrument',
      'Pour-Over Will auxiliary setup',
      'Asset funding guide checklist'
    ],
    benefits: [
      'Assets avoid public, slow, and expensive probate court entirely',
      'Maintains perfect family estate privacy',
      'Provides immediate distribution of assets upon transfer criteria'
    ],
    processSteps: [
      'List trustees and prospective backup stewards',
      'Select matching funding mechanisms (real estate, accounts, equities)',
      'We compile the customized trust instruments ready for notary execution'
    ]
  }
];

export const STATE_FEES: StateFee[] = [
  { state: 'Alabama', code: 'AL', fee: 200, processingDays: 10 },
  { state: 'Alaska', code: 'AK', fee: 250, processingDays: 14 },
  { state: 'Arizona', code: 'AZ', fee: 50, processingDays: 15 },
  { state: 'Arkansas', code: 'AR', fee: 45, processingDays: 7 },
  { state: 'California', code: 'CA', fee: 70, processingDays: 5 },
  { state: 'Colorado', code: 'CO', fee: 50, processingDays: 3 },
  { state: 'Connecticut', code: 'CT', fee: 120, processingDays: 4 },
  { state: 'Delaware', code: 'DE', fee: 90, processingDays: 2 },
  { state: 'Florida', code: 'FL', fee: 125, processingDays: 6 },
  { state: 'Georgia', code: 'GA', fee: 100, processingDays: 8 },
  { state: 'Hawaii', code: 'HI', fee: 50, processingDays: 5 },
  { state: 'Idaho', code: 'ID', fee: 100, processingDays: 7 },
  { state: 'Illinois', code: 'IL', fee: 150, processingDays: 9 },
  { state: 'Indiana', code: 'IN', fee: 95, processingDays: 3 },
  { state: 'Iowa', code: 'IA', fee: 50, processingDays: 5 },
  { state: 'Kansas', code: 'KS', fee: 160, processingDays: 4 },
  { state: 'Kentucky', code: 'KY', fee: 40, processingDays: 3 },
  { state: 'Louisiana', code: 'LA', fee: 100, processingDays: 5 },
  { state: 'Maine', code: 'ME', fee: 175, processingDays: 12 },
  { state: 'Maryland', code: 'MD', fee: 100, processingDays: 15 },
  { state: 'Massachusetts', code: 'MA', fee: 500, processingDays: 5 },
  { state: 'Michigan', code: 'MI', fee: 50, processingDays: 3 },
  { state: 'Minnesota', code: 'MN', fee: 135, processingDays: 7 },
  { state: 'Mississippi', code: 'MS', fee: 50, processingDays: 4 },
  { state: 'Missouri', code: 'MO', fee: 50, processingDays: 3 },
  { state: 'Montana', code: 'MT', fee: 70, processingDays: 5 },
  { state: 'Nebraska', code: 'NE', fee: 100, processingDays: 8 },
  { state: 'Nevada', code: 'NV', fee: 425, processingDays: 3 },
  { state: 'New Hampshire', code: 'NH', fee: 100, processingDays: 6 },
  { state: 'New Jersey', code: 'NJ', fee: 125, processingDays: 4 },
  { state: 'New Mexico', code: 'NM', fee: 50, processingDays: 2 },
  { state: 'New York', code: 'NY', fee: 200, processingDays: 10 },
  { state: 'North Carolina', code: 'NC', fee: 125, processingDays: 6 },
  { state: 'North Dakota', code: 'ND', fee: 135, processingDays: 5 },
  { state: 'Ohio', code: 'OH', fee: 99, processingDays: 4 },
  { state: 'Oklahoma', code: 'OK', fee: 100, processingDays: 6 },
  { state: 'Oregon', code: 'OR', fee: 100, processingDays: 4 },
  { state: 'Pennsylvania', code: 'PA', fee: 125, processingDays: 12 },
  { state: 'Rhode Island', code: 'RI', fee: 150, processingDays: 5 },
  { state: 'South Carolina', code: 'SC', fee: 110, processingDays: 6 },
  { state: 'South Dakota', code: 'SD', fee: 150, processingDays: 4 },
  { state: 'Tennessee', code: 'TN', fee: 300, processingDays: 5 },
  { state: 'Texas', code: 'TX', fee: 300, processingDays: 3 },
  { state: 'Utah', code: 'UT', fee: 70, processingDays: 4 },
  { state: 'Vermont', code: 'VT', fee: 125, processingDays: 5 },
  { state: 'Virginia', code: 'VA', fee: 100, processingDays: 4 },
  { state: 'Washington', code: 'WA', fee: 200, processingDays: 5 },
  { state: 'West Virginia', code: 'WV', fee: 100, processingDays: 7 },
  { state: 'Wisconsin', code: 'WI', fee: 130, processingDays: 5 },
  { state: 'Wyoming', code: 'WY', fee: 100, processingDays: 2 }
];

export const DEFAULT_MEDIA: MediaConfig[] = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    title: 'US LLC Corporate Offices Concept'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Default classic sample video
    title: 'How to Form an LLC Step-by-Step'
  },
  {
    type: 'custom_url',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    title: 'Professional Legal Consultation'
  }
];

export const MOCK_TRADEMARKS = [
  { name: 'US LLC', status: 'In Use', registerability: 'Medium - Rich Generic', comments: 'Federal trademarks exist for overlapping sectors, but distinct stylization is registerable.' },
  { name: 'ApexFormations', status: 'Registered', registerability: 'Zero', comments: 'Highly defended active service mark.' },
  { name: 'SaaSSkul', status: 'Available', registerability: 'Excellent - Coined word', comments: 'Unique distinctive brand. Perfect candidate for seamless trademark protection.' },
  { name: 'Apple', status: 'Registered', registerability: 'Zero', comments: 'Famous active mark.' }
];

export const TESTIMONIALS = [
  {
    quote: "Registering my design consultancy in Delaware was painless with US LLC. I had my EIN and stamped Articles in just 3 days! The pricing estimator matched the final cost exactly.",
    author: "Elena Rostova",
    role: "Founder, Rostova Design Lab",
    location: "Delaware"
  },
  {
    quote: "The brand clearance tool suggested excellent category classifications for my software startup, SaaSSkul. I appreciate how clear the instructions are. Looking forward to the full launch!",
    author: "Marcus Vance",
    role: "CTO, SaaSSkul Ventures",
    location: "Texas"
  },
  {
    quote: "I moved our registered agent service to US LLC and already feel far more confident. Their electronic scan alert processed a surprise state document notice in under an hour.",
    author: "Devon Patel",
    role: "President, Hearthwood Organics LLC",
    location: "Wyoming"
  }
];
