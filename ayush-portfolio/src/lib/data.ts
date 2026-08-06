export const site = {
  name: "Ayush Kapoor",
  handle: "ayushkempire",
  role: "Backend Developer",
  tagline: "Engineering systems that scale — from database schemas to pixel-perfect interfaces.",
  location: "Kangra, Himachal Pradesh, India",
  coords: "32.09° N, 75.86° E",
  email: "ayushkempire@gmail.com",
  phone: "+91-8626805949",
  availability: "Open to opportunities",
  resume: "/Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/ayushkempire" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayushkempire" },
    { label: "Twitter", href: "https://twitter.com/ayushk_empire_" },
    { label: "Instagram", href: "https://www.instagram.com/ayushk_empire_/" },
  ],
};

export const about = {
  intro:
    "I'm a backend developer at the Centre for Artificial Intelligence and Robotics (CAIR), IIT Mandi, where I build multi-tenant EdTech infrastructure used by students and teachers across Classes 6–12.",
  body: [
    "My work lives at the intersection of robust server architecture and thoughtful product design — JWT auth systems, role-based access control, RESTful APIs, and adaptive assessment engines on one side; Next.js dashboards and AI-powered learning tools on the other.",
    "Based in the foothills of Himachal Pradesh, I balance shipping production systems with exploring new music, playing guitar, and hiking the mountains I grew up in.",
  ],
  facts: [
    { label: "Currently", value: "Backend Developer @ CAIR, IIT Mandi" },
    { label: "Education", value: "MCA, Lovely Professional University — 8.67 CGPA" },
    { label: "Focus", value: "Node.js · TypeScript · PostgreSQL · Next.js" },
    { label: "Base", value: "Himachal Pradesh, India" },
  ],
};

export const experience = [
  {
    company: "Centre for Artificial Intelligence and Robotics (CAIR), IIT Mandi",
    shortCompany: "CAIR · IIT Mandi",
    role: "Backend Developer",
    period: "Mar 2026 — Present",
    location: "Himachal Pradesh, India",
    stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "Knex", "Next.js 14", "TailwindCSS", "Radix UI"],
    points: [
      "Building a full-stack, multi-tenant EdTech platform serving students and teachers across Classes 6–12.",
      "Designed a scalable backend with Node.js, TypeScript, Express, and PostgreSQL using Knex ORM.",
      "Implemented JWT-based authentication and role-based access control for secure multi-role access.",
      "Engineered a self-assessment engine with adaptive evaluation and XP-based gamification tracking.",
      "Built role-based dashboards and integrated an AI Tutor chatbot, Concept Explorer, and Quiz Generator.",
      "Collaborating with ML microservices for adaptive learning and intelligent recommendations.",
    ],
  },
];

export const education = [
  {
    school: "Lovely Professional University",
    degree: "Master of Computer Applications",
    detail: "CGPA 8.67 · Phagwara, India",
    period: "2023 — 2025",
  },
  {
    school: "Government College, Dharamshala",
    degree: "Bachelor of Computer Applications",
    detail: "CGPA 8.14 · Dharamshala, India",
    period: "2020 — 2023",
  },
];

export const projects = [
  {
    index: "01",
    title: "GyanSetu",
    subtitle: "AI-powered EdTech Platform",
    description:
      "Multi-tenant EdTech platform with role-based dashboards for students, teachers, and admins. JWT auth, RBAC, adaptive self-assessment, and ML microservice integration for personalized learning — featuring an AI Tutor and Quiz Generator.",
    stack: ["Next.js 14", "Node.js", "TypeScript", "PostgreSQL"],
    year: "2026",
    link: null,
  },
  {
    index: "02",
    title: "Invitable India",
    subtitle: "Full-stack E-commerce",
    description:
      "Complete commerce solution with authentication, product catalog, cart, secure payments via Razorpay, and real-time inventory tracking. Media pipeline on Cloudinary, transactional email with Resend.",
    stack: ["Next.js", "PostgreSQL", "Cloudinary", "Resend", "Razorpay"],
    year: "2025",
    link: "https://invitableindia.com",
  },
  {
    index: "03",
    title: "IndoEurope Travels",
    subtitle: "Travel Booking Platform",
    description:
      "Tour discovery, reservations, and secure payments for a travel operator. User and admin dashboards for managing bookings and itineraries with real-time data handling.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Firebase Auth", "Razorpay"],
    year: "2025",
    link: "https://indoeuropetravels.com",
  },
  {
    index: "04",
    title: "Auditorium Booking System",
    subtitle: "Role-based Management",
    description:
      "Booking system with separate dashboards for users and administrators — request workflows, approvals, schedule management, and real-time availability tracking.",
    stack: ["PHP", "MySQL", "JavaScript"],
    year: "2024",
    link: "https://myuniauditoriumbooking.infinityfreeapp.com",
  },
  {
    index: "05",
    title: "Music Streaming Platform",
    subtitle: "Spotify-inspired Interface",
    description:
      "Interactive streaming interface with playback controls, playlists, and persistent user interactions in a responsive UI.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    link: "https://myspotify.infinityfreeapp.com/",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "C/C++", "Java", "Python", "Kotlin"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT / RBAC", "PHP", "Knex ORM"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "React.js", "TailwindCSS", "Radix UI", "HTML/CSS"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    group: "AI / ML",
    items: ["DNN", "CNN", "RNN", "ML Microservices"],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "Google Cloud", "Selenium", "Linux", "Android Studio", "Xcode"],
  },
];

export const certifications = [
  {
    title: "Frontend Development",
    issuer: "Gokburu Tech Pvt Ltd",
    date: "Jul 2024",
    href: "https://drive.google.com/file/d/1iVzo_hi8X6mY5WQ7XUO0ccJjKyfVGxBa/view?usp=drive_link",
  },
  {
    title: "Software Engineering",
    issuer: "Saylor Academy",
    date: "Feb 2024",
    href: "https://learn.saylor.org/pluginfile.php/1/tool_certificate/issues/1706803143/7558428641AK.pdf",
  },
  {
    title: "Web Development",
    issuer: "HP Kaushal Vikas Nigam",
    date: "Jul 2023",
    href: "https://admin.skillindiadigital.gov.in/documentverificationbyQR?Candidate%20Name=Ayush%20kapoor&Candidate%20ID=CAN_19600741&Sector%20Name=IT-ITeS&QP%20Name=Web%20Developer&QP%20Code=SSC%2FQ0503&Result=PASS&Document=certificate&Issuance%20Date=22%2F07%2F2023",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "Jun 2023",
    href: "https://www.freecodecamp.org/certification/ayushk_empire_/javascript-algorithms-and-data-structures",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Feb 2023",
    href: "https://www.freecodecamp.org/certification/ayushk_empire_/responsive-web-design",
  },
];
