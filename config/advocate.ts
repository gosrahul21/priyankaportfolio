// ============================================================
//  config/advocate.ts
//  ── Single source of truth for ALL website content.
//     Edit this file to update the portfolio without touching components.
// ============================================================

export const advocate = {
  // ── Identity ────────────────────────────────────────────────
  name: {
    first: "Priyanka",
    last: "Goswami",
    display: "Advocate Priyanka Goswami",
    initials: "PG",
    shorthand: "ADVOCATE · P.G.",
  },

  title: "Advocate & Legal Counsel",
  tagline: "Fearless advocacy. Principled counsel.",
  heroDescription:
    "A dedicated legal professional specialising in Property Law, Civil Litigation, Criminal Litigation, Family Matters and other matters — committed to protecting your rights with precision, integrity, and compassion.",

  // ── Location & Qualification ─────────────────────────────────
  location: "Bhagalpur, Bihar, India",
  locationTag: "Bhagalpur · India · Est. 2024",
  qualification: {
    degree: "BA LLB",
    university: "Tilka Manji Bhagalpur University (TMBU)",
    universityShort: "TMBU",
    place: "Bhagalpur, Bihar",
    year: 2024,
  },

  courts: "Bhagalpur Civil Courts\nDistrict & Sessions Courts",
  languages: ["Bengali", "Hindi", "English"],

  // ── About Section ─────────────────────────────────────────────
  about: {
    paragraphs: [
      "I am Advocate Priyanka Goswami, a qualified legal professional holding a Bachelor of Laws degree from Tilka Manji Bhagalpur University — one of Bihar's premier institutions. I practice in Bihar with a focus on civil, property, and family law.",
      "My approach combines rigorous legal research with practical, client-centred strategy. I believe every individual deserves access to knowledgeable, compassionate legal representation — regardless of the complexity of their matter.",
    ],
    qualifications: [
      "BA LLB — Tilka Manji Bhagalpur University (TMBU)",
      "Expertise in Hindu Succession Act & 2005 Amendment",
      // "Vineeta Sharma v. Rakesh Sharma — daughters' inheritance rights",
      "IT Act offences, cyberbullying & digital evidence",
      "District Legal Services Authority experience",
      "Bengali · Hindi · English",
    ],
  },

  // ── Hero Stats ──────────────────────────────────────────────
  heroStats: [
    { value: "BA LLB", label: "Qualified\nAdvocate" },
    { value: "6+", label: "Areas of\nPractice" },
    { value: "Bihar", label: "\nCourts" },
  ],

  // ── Practice Areas ──────────────────────────────────────────
  practiceAreas: [
    {
      num: "01",
      icon: "⚖️",
      name: "Property & Inheritance Law",
      desc: "Partition disputes, ancestral property, Hindu Succession Act claims, daughters' inheritance rights, and estate administration under Indian law.",
    },
    {
      num: "02",
      icon: "⚖️",
      name: "Criminal Litigation",
      desc: "Strategic defense in criminal proceedings, bail applications, FIR quashing, and comprehensive representation in criminal trials.",
    },
    {
      num: "03",
      icon: "🏛️",
      name: "Civil Litigation",
      desc: "Strategic representation in civil suits, injunctions, declaratory relief, specific performance, and appellate proceedings across Bihar courts.",
    },
    {
      num: "04",
      icon: "🛡️",
      name: "Family & Personal Law",
      desc: "Matrimonial disputes, divorce, child custody, maintenance, and domestic relations handled with sensitivity and legal precision.",
    },
    {
      num: "05",
      icon: "📜",
      name: "Legal Drafting",
      desc: "Precision drafting of legal notices, plaints, written statements, agreements, affidavits, and appellate memorials.",
    },
    {
      num: "06",
      icon: "💻",
      name: "Cyber & IT Law",
      desc: "Offences under the IT Act 2000, online defamation, cyberbullying, obscene content, and digital evidence preservation.",
    },
    {
      num: "07",
      icon: "🤝",
      name: "ADR & Mediation",
      desc: "Skilled in alternative dispute resolution, negotiated settlements, and Lok Adalat proceedings for swift, cost-effective resolution.",
    },
  ],

  // ── Education / Timeline ────────────────────────────────────
  education: {
    sideNote:
      "A path shaped by dedication to justice — from the lecture halls of Bhagalpur to the courts of Bihar. Each milestone has forged a sharper, more compassionate advocate.",
    milestones: [
      {
        year: "2024",
        title: "BA LLB Degree Conferred",
        place: "Tilka Manji Bhagalpur University, Bhagalpur, Bihar",
        detail:
          "Completed Bachelor of Laws with specialisation in Civil & Property Law. Developed deep expertise in the Hindu Succession Act and constitutional property rights.",
      },
      {
        year: "2023",
        title: "Moot Court & Advocacy",
        place: "TMBU Legal Competition Circuit",
        detail:
          "Argued constitutional property rights and daughters' inheritance issues in competitive moot scenarios, developing sharp oral advocacy skills.",
      },
      {
        year: "2022",
        title: "Legal Aid Internship",
        place: "District Legal Services Authority, Bihar",
        detail:
          "Provided pro bono legal services to underprivileged clients, gaining hands-on exposure to court procedures, document drafting, and client counselling.",
      },
      {
        year: "2021",
        title: "Commenced LLB Programme",
        place: "Tilka Manji Bhagalpur University",
        detail:
          "Enrolled in the three-year LLB programme, beginning a rigorous journey through constitutional law, civil procedure, criminal law, and jurisprudence.",
      },
    ],
  },

  // ── AI Chat Section ─────────────────────────────────────────
  ai: {
    greeting:
      "Namaste 🙏 I'm Priyanka's AI assistant. Ask me anything about her background, qualifications, or practice areas — I'm here to help you decide if she's the right counsel for your matter.",
    features: [
      {
        icon: "🎯",
        title: "Know Her Expertise",
        desc: "Ask about specific legal situations and whether Priyanka has handled similar cases.",
      },
      {
        icon: "📋",
        title: "Understand the Process",
        desc: "Get clarity on what to expect when consulting an advocate for the first time.",
      },
      {
        icon: "🔒",
        title: "No Commitment Needed",
        desc: "This is not legal advice — just a smart way to learn about Priyanka before reaching out.",
      },
    ],
    inputPlaceholder: "e.g. Can she help with a property inheritance dispute?",
    systemPrompt: `# ROLE
You are the Pichu, Legal Case Coordinator for Advocate Priyanka Goswami. Your primary goal is to qualify potential clients and collect their contact details before providing any specific legal information or consultation details. You are professional, empathetic, and organized.

# PHASE 1: DATA COLLECTION (STRICT)
Before answering ANY specific questions about Priyanka's services, availability, or capabilities, you must collect the following information one-by-one:
1. Full Name
2. Phone Number
3. Email Address
4. Primary Legal Matter (e.g., Property Dispute, Family Law, Criminal Litigation)

## RULES FOR PHASE 1:
- If the user asks a question before providing all 4 items, acknowledge the question but state: "I'd be happy to share more about that! First, to ensure Advocate Priyanka can properly review your case, may I get your [Missing Field]?"
- Do not provide detailed information about Priyanka's practice areas until all data is collected.
- Once all 4 fields are collected, you MUST call the \`save_lead_data\` tool.

# PHASE 2: EXPERT CONSULTATION
Only after the data is saved, transition into the Assistant role.
- Answer questions based on Advocate Priyanka Goswami's core offerings: Property & Inheritance Law, Criminal Litigation, Civil Litigation, Family Law, Legal Drafting, and Cyber/IT Law.
- Be warm, confident, and professional. Use the user's name to personalize your responses.
- Remind users that you provide information, not formal legal advice, and that their details have been forwarded to Priyanka.
- KEY FACTS: BA LLB from TMBU Bhagalpur. Practicing in Bihar courts. Fluent in English, Hindi, and Bengali.

# TONE & STYLE
- Professional, respectful, and empathetic to potentially stressful legal situations.
- Avoid robotic "Understood" responses; use natural transitions like "Thank you, [Name]. And what is the best phone number to reach you at?"
- Do not invent specific case outcomes. If asked something outside her profile, state you will have Priyanka address that personally.

# TOOL TRIGGER CRITERIA
- Trigger Tool: \`save_lead_data\`
- Arguments: { name, phone, email, matter }
- Moment: Immediately after the 4th piece of information is received.`,
  },

  // ── Contact Section ──────────────────────────────────────────
  contact: {
    items: [
      {
        icon: "📍",
        label: "Location",
        detail: "Bihar, India\nServing clients across jurisdiction",
      },
      {
        icon: "🎓",
        label: "Qualification",
        detail:
          "BA LLB — Tilka Manji Bhagalpur University\nBhagalpur, Bihar",
      },
      {
        icon: "⚖️",
        label: "Practice Courts",
        detail: "Bihar Civil Courts\nDistrict & Sessions Courts",
      },
      {
        icon: "🌐",
        label: "Languages",
        detail: "Bengali · Hindi · English",
      },
    ],
    matterOptions: [
      "Property & Inheritance",
      "Criminal Litigation",
      "Civil Litigation",
      "Family & Personal Law",
      "Cyber / IT Law",
      "Legal Drafting",
      "ADR & Mediation",
      "Other",
    ],
    disclaimer:
      "All communications are strictly confidential. This form does not constitute legal advice or an attorney-client relationship.",
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    copyright: `© ${new Date().getFullYear()} · BA LLB, TMBU Bhagalpur · All Rights Reserved`,
    disclaimer:
      "This website is for informational purposes only and does not constitute legal advice.",
  },

  // ── SEO / Meta ────────────────────────────────────────────────
  meta: {
    title: "Advocate Priyanka Goswami — Legal Counsel, Bihar",
    description:
      "Advocate Priyanka Goswami — BA LLB, TMBU Bhagalpur. Expert legal counsel in Bihar for Property Law, Civil Litigation, Criminal Litigation, Family Law, Cyber Law, and ADR.",
  },
} as const;

export type AdvocateConfig = typeof advocate;
