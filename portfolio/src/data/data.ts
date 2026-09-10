import type {
  PersonalInfo,
  EducationItem,
  SkillItem,
  ProjectItem,
  AchievementItem,
  CertificationItem,
  ClubActivityItem,
} from "../types/types";

export const personalInfo: PersonalInfo = {
  name: "Rangadas Chakravarthy",
  title: "Software Engineer • Full Stack • AI • Data",
  tagline: "BUILD. SOLVE. LEARN. SHIP.",
  bio: "Fresher Software Engineer passionate about engineering scalable web applications, designing intelligent AI systems, and creating data-driven solutions.",
  extendedBio: [
    "I specialize in building full-stack applications with React, Node.js, and TypeScript, alongside engineering AI-driven workflows powered by vector databases and modern LLMs.",
    "Graduating with a high academic distinction (CGPA 9.26) from Anurag University, I bring strong algorithmic foundations, multi-domain problem-solving skills, and hands-on experience shipping real software.",
    "Driven by curiosity and a commitment to software craftsmanship, I focus on clean code, performant frontend architectures, and resilient backends."
  ],
  location: "Hyderabad, India",
  email: "rangadaschakravarthy02@gmail.com",
  github: "https://github.com/rangadaschakravarthy",
  linkedin: "https://linkedin.com/in/rangadaschakravarthy",
  resumeUrl: "/resume.pdf",
  availability: "OPEN TO OPPORTUNITIES",
  stats: [
    { label: "Projects Built", value: "8+" },
    { label: "Technologies", value: "18" },
    { label: "Hackathons Won", value: "2" },
    { label: "Certifications", value: "8" }
  ]
};

export const education: EducationItem[] = [
  {
    id: "edu-1",
    year: "2021 – 2025",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Anurag University, Hyderabad",
    score: "CGPA: 9.26 / 10.0",
    description: "Specialized in Core Computer Science, Software Engineering, Data Structures & Algorithms, Database Systems, and Artificial Intelligence.",
    highlights: [
      "Graduated with High Academic Distinction (CGPA 9.26/10.0)",
      "Lead Developer & Vice President of University Web Club",
      "Organized technical workshops and competitive coding challenges for 300+ students"
    ]
  },
  {
    id: "edu-2",
    year: "2019 – 2021",
    degree: "Intermediate / Class XII (MPC)",
    institution: "Narayana Junior College, Hyderabad",
    score: "Percentage: 96.5%",
    description: "Completed Higher Secondary Education focusing on Mathematics, Physics, and Chemistry with top academic percentile.",
    highlights: [
      "Scored 96.5% with distinction in Mathematics and Computer Science",
      "Ranked among top students in State Level Competitive Engineering Exams"
    ]
  },
  {
    id: "edu-3",
    year: "2018 – 2019",
    degree: "Class X (Secondary School Certificate)",
    institution: "St. Ann's High School, Hyderabad",
    score: "CGPA: 10.0 / 10.0",
    description: "Completed secondary education with perfect cumulative grade point average across all subjects.",
    highlights: [
      "Perfect 10/10 CGPA Academic Honors",
      "Excellence in Science, Mathematics & Leadership Activities"
    ]
  }
];

export const skills: SkillItem[] = [
  // Languages (5)
  {
    id: "skill-1",
    name: "Python",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: "Primary",
    category: "languages",
    description: "AI application development, RAG pipelines, data analysis scripts with Pandas/NumPy, Flask API servers, and computer vision scripting."
  },
  {
    id: "skill-2",
    name: "Java",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    level: "Primary",
    category: "languages",
    description: "Object-oriented software design, Data Structures & Algorithms, multi-threading, Spring Boot REST microservices, and enterprise backend systems."
  },
  {
    id: "skill-3",
    name: "C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    level: "Strong",
    category: "languages",
    description: "Low-level system programming, memory management, pointer manipulation, and foundational algorithms implementation."
  },
  {
    id: "skill-4",
    name: "JavaScript",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: "Primary",
    category: "languages",
    description: "Modern ES6+ syntax, asynchronous programming, DOM manipulation, promises, event loops, and client-side web application architectures."
  },
  {
    id: "skill-5",
    name: "TypeScript",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: "Primary",
    category: "languages",
    description: "Strict static typing, interfaces, generics, type-safe API integration, and enterprise React codebase maintainability."
  },

  // Frontend (5)
  {
    id: "skill-6",
    name: "React",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: "Primary",
    category: "frontend",
    description: "Component architecture, custom hooks, state management, Framer Motion, Context API, dynamic SSR/SPA optimization, and responsive design systems."
  },
  {
    id: "skill-7",
    name: "Angular",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    level: "Working Knowledge",
    category: "frontend",
    description: "Single-page enterprise web application structure, RxJS reactive streams, dependency injection, and modular component design."
  },
  {
    id: "skill-8",
    name: "HTML5",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: "Primary",
    category: "frontend",
    description: "Semantic markup, web accessibility (WCAG), SEO best practices, DOM structural optimization, and responsive layouts."
  },
  {
    id: "skill-9",
    name: "CSS3",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    level: "Primary",
    category: "frontend",
    description: "Flexbox, CSS Grid, keyframe animations, glassmorphism UI styling, responsive typography, media queries, and Tailwind CSS configuration."
  },
  {
    id: "skill-10",
    name: "Bootstrap",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    level: "Strong",
    category: "frontend",
    description: "Rapid UI prototyping, grid layouts, utility classes, and cross-browser responsive design implementation."
  },

  // Backend (3)
  {
    id: "skill-11",
    name: "Node.js",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: "Primary",
    category: "backend",
    description: "Event-driven asynchronous server environments, RESTful API design, NPM package management, and authentication middleware."
  },
  {
    id: "skill-12",
    name: "Express.js",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    level: "Primary",
    category: "backend",
    description: "RESTful web services, routing, JWT auth middleware, error handling, CORS control, and server-side business logic."
  },
  {
    id: "skill-13",
    name: "Flask",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    level: "Strong",
    category: "backend",
    description: "Lightweight Python microservices, AI inference API wrapping, blueprint structuring, and backend database connectivity."
  },

  // Databases (2)
  {
    id: "skill-14",
    name: "MySQL",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    level: "Primary",
    category: "databases",
    description: "Relational database schema design, complex JOIN queries, indexing, stored procedures, ACID transactions, and query optimization."
  },
  {
    id: "skill-15",
    name: "MongoDB",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: "Strong",
    category: "databases",
    description: "NoSQL document modelling, aggregation frameworks, Mongoose ORM schema definitions, and high-throughput data storage."
  },

  // Tools & Cloud (3)
  {
    id: "skill-16",
    name: "Git",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "Primary",
    category: "tools",
    description: "Distributed version control, feature branching workflows, rebase, merge conflict resolution, and GitHub pull request reviews."
  },
  {
    id: "skill-17",
    name: "AWS",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    level: "Working Knowledge",
    category: "cloud",
    description: "EC2 instance hosting, S3 cloud storage buckets, IAM user security policies, and foundational cloud architecture deployment."
  },
  {
    id: "skill-18",
    name: "Power BI",
    logoUrl: "https://windsor.ai/wp-content/uploads/2025/03/New_Power_BI_Logo.svg.png",
    level: "Strong",
    category: "tools",
    description: "Interactive data visualization dashboards, DAX queries, ETL workflows, and business intelligence analytical reporting."
  }
];

export const projects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Career AI",
    subtitle: "AI-Powered Career Guidance & Skill Diagnostics Platform",
    badge: "AI & Full Stack",
    domain: "AI",
    categories: ["AI", "Full Stack", "React", "Node.js", "MongoDB", "Python"],
    description: "An intelligent web application that analyzes user resumes, identifies skill gaps, and recommends personalized learning paths using LLM embeddings.",
    whatIBuilt: "Engineered a full-stack platform featuring resume parsing, vector-based skill matching, real-time roadmap generation, and dynamic career trajectory analysis.",
    howISolvedIt: "Integrated Google Gemini API with Node.js and MongoDB to perform semantic analysis on tech resumes. Implemented custom scoring algorithms to calculate role fit percentages and output actionable growth roadmaps.",
    techUsed: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Gemini API", "Tailwind CSS"],
    result: "Helped 150+ students analyze their technical profile and generate tailored learning goals with 94% user satisfaction.",
    github: "https://github.com/rangadaschakravarthy/career-ai",
    liveDemo: "https://career-ai-demo.vercel.app",
    featured: true
  },
  {
    id: "proj-2",
    title: "AI Medical Chatbot",
    subtitle: "Intelligent Triage & Health Assistant System",
    badge: "AI & Python",
    domain: "AI",
    categories: ["AI", "Python", "Flask", "React"],
    description: "Conversational health assistant providing preliminary medical insights, symptom assessment, and specialist recommendations using medical dataset LLMs.",
    whatIBuilt: "Designed a privacy-focused medical assistant interface with real-time streaming responses, safety fallback disclaimers, and symptom categorizers.",
    howISolvedIt: "Leveraged Python Flask backend with RAG (Retrieval-Augmented Generation) querying a specialized medical knowledge database to provide contextually accurate, safe health insights without direct diagnostic claims.",
    techUsed: ["Python", "Flask", "React", "LangChain", "Pinecone", "Tailwind CSS"],
    result: "Achieved sub-second response times for medical inquiry parsing with strict safety disclaimers.",
    github: "https://github.com/rangadaschakravarthy/ai-medical-chatbot",
    liveDemo: "https://ai-medical-chatbot.vercel.app"
  },
  {
    id: "proj-3",
    title: "MJ-AI Assistant",
    subtitle: "Voice-Enabled Desktop & Web Task Automation AI",
    badge: "AI & Voice",
    domain: "AI",
    categories: ["AI", "Python"],
    description: "Custom AI assistant capable of speech recognition, natural language query processing, web search automation, and system task execution.",
    whatIBuilt: "Created an autonomous voice agent with speech-to-text input, intelligent intent parsing, system control APIs, and text-to-speech feedback.",
    howISolvedIt: "Utilized Python SpeechRecognition and PyTTSx3 alongside custom regex and NLP intent routers to convert spoken commands into immediate system or API actions.",
    techUsed: ["Python", "SpeechRecognition", "PyTTSx3", "OpenAI API", "Tkinter"],
    result: "Automated 20+ daily desktop workflows with hands-free voice commands.",
    github: "https://github.com/rangadaschakravarthy/mj-ai-assistant"
  },
  {
    id: "proj-4",
    title: "Walmart Sales Data Analysis",
    subtitle: "Predictive Analytics & Retail Performance Dashboard",
    badge: "Data Analysis",
    domain: "Data Analysis",
    categories: ["Data Analysis", "Python", "Power BI", "MySQL"],
    description: "Comprehensive data analysis pipeline investigating sales patterns, holiday promotional impacts, and store performance across retail outlets.",
    whatIBuilt: "Constructed end-to-end data cleaning pipelines, statistical models, and an interactive Power BI dashboard visualizing revenue trends.",
    howISolvedIt: "Processed over 400,000 retail transaction records using Pandas and NumPy to identify top-performing departments, seasonality trends, and inventory velocity correlations.",
    techUsed: ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI", "MySQL"],
    result: "Uncovered key revenue growth drivers and peak inventory demand cycles during holiday seasons.",
    github: "https://github.com/rangadaschakravarthy/walmart-sales-analysis"
  },
  {
    id: "proj-5",
    title: "E-Learning Management System",
    subtitle: "Interactive Course Delivery & Assessment Platform",
    badge: "Full Stack",
    domain: "Full Stack",
    categories: ["Full Stack", "React", "Node.js", "MongoDB", "Express"],
    description: "Full-fledged learning management portal with role-based access for students and instructors, video streaming, quizzes, and certificate generation.",
    whatIBuilt: "Architected frontend state for course player, progress tracking system, instructor dashboard, and secure JWT authentication.",
    howISolvedIt: "Structured MongoDB document schema for scalable course modules, lessons, user enrollment records, and automated test scoring engines.",
    techUsed: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    result: "Successfully supported 50+ concurrent users with instant quiz evaluation and progress persistence.",
    github: "https://github.com/rangadaschakravarthy/e-learning-platform",
    liveDemo: "https://elearning-app-demo.vercel.app"
  },
  {
    id: "proj-6",
    title: "Vehicle Rental Management System",
    subtitle: "Enterprise Fleet Booking & Billing Portal",
    badge: "Full Stack",
    domain: "Full Stack",
    categories: ["Full Stack", "Java", "MySQL", "Bootstrap"],
    description: "Object-oriented Java enterprise application managing vehicle inventory, customer bookings, rental pricing calculation, and invoice output.",
    whatIBuilt: "Engineered core backend business logic, relational database schemas, and clean responsive views for fleet administration.",
    howISolvedIt: "Implemented MVC (Model-View-Controller) pattern using Java Servlets, JSP, and MySQL with transactional data integrity for booking reservations.",
    techUsed: ["Java", "Servlets", "JSP", "MySQL", "JDBC", "Bootstrap"],
    result: "Reduced manual rental logging time by 75% through automated reservation and invoice generation.",
    github: "https://github.com/rangadaschakravarthy/vehicle-rental-system"
  },
  {
    id: "proj-7",
    title: "Gadget Hub E-Commerce Store",
    subtitle: "Responsive Electronics Retail Storefront",
    badge: "Web Development",
    domain: "Web Development",
    categories: ["Web Development", "React", "Tailwind"],
    description: "Modern electronics storefront featuring dynamic cart management, multi-attribute filtering, search, and responsive layout.",
    whatIBuilt: "Designed high-conversion product catalog UI with sticky filters, instant search indexing, and smooth cart drawer interactions.",
    howISolvedIt: "Leveraged React Context API for global cart state persistence in localStorage, optimizing render performance for item lists.",
    techUsed: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    result: "Achieved 99/100 Lighthouse performance score with seamless mobile-first responsive layout.",
    github: "https://github.com/rangadaschakravarthy/gadget-hub",
    liveDemo: "https://gadget-hub-demo.vercel.app"
  }
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "1st Place Winner — Department Hackathon",
    organization: "Department of CSE, Anurag University",
    date: "March 2025",
    description: "Secured First Position out of 40+ engineering teams for building an AI-powered smart campus automation tool within 24 hours.",
    iconName: "Trophy"
  },
  {
    id: "ach-2",
    title: "Winner — Hackattack National Hackathon",
    organization: "Hackattack 2024",
    date: "December 2024",
    description: "Awarded top place for developing an intelligent triage chatbot using RAG and vector databases to assist preliminary health queries.",
    iconName: "Award"
  },
  {
    id: "ach-3",
    title: "Vice President — University Web Club",
    organization: "Web Club, Anurag University",
    date: "2023 – 2025",
    description: "Lead technical mentor directing web development bootcamps, code reviews, and organizing university-wide coding events for 300+ active members.",
    iconName: "Users"
  },
  {
    id: "ach-4",
    title: "Hackathon Volunteer & Mentor — GeeksforGeeks Student Chapter",
    organization: "GeeksforGeeks Chapter",
    date: "2023 – 2024",
    description: "Served as technical organizer and mentor guiding 100+ hackathon participants in full-stack architecture and git workflows.",
    iconName: "Flame"
  }
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    name: "Programming in Java",
    issuer: "NPTEL (IIT Kharagpur)",
    year: "2024",
    credentialUrl: "https://nptel.ac.in/noc/Ecertificate/?q=NPTEL24CSJAVA",
    description: "Elite Certification in Core Java concepts, Object-Oriented Programming, Multithreading, Collection Frameworks, and Exception Handling."
  },
  {
    id: "cert-2",
    name: "Introduction to Generative AI",
    issuer: "Coursera / Google Cloud",
    year: "2024",
    credentialUrl: "https://coursera.org/verify/genai-google",
    description: "Foundational mastery of Large Language Models (LLMs), prompt engineering, attention mechanisms, and generative AI architecture."
  },
  {
    id: "cert-3",
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    year: "2024",
    credentialUrl: "https://aws.amazon.com/verification",
    description: "Comprehensive understanding of cloud computing services, AWS IAM security, EC2 deployment, S3 storage, and networking fundamentals."
  },
  {
    id: "cert-4",
    name: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    year: "2023",
    credentialUrl: "https://netacad.com/verify",
    description: "Semantic HTML structural standards, DOM accessibility practices, and modern web publishing principles."
  },
  {
    id: "cert-5",
    name: "CSS Essentials",
    issuer: "Cisco Networking Academy",
    year: "2023",
    credentialUrl: "https://netacad.com/verify",
    description: "Advanced styling mastery including CSS Grid, Flexbox layouts, responsive design, animations, and cross-browser UI design."
  },
  {
    id: "cert-6",
    name: "JavaScript Essentials",
    issuer: "Cisco Networking Academy",
    year: "2023",
    credentialUrl: "https://netacad.com/verify",
    description: "ES6+ syntax, asynchronous JS, object manipulation, event management, and browser API integration."
  },
  {
    id: "cert-7",
    name: "SQL (Advanced) Skill Certificate",
    issuer: "HackerRank",
    year: "2024",
    credentialUrl: "https://hackerrank.com/certificates/sql_advanced",
    description: "Verified advanced competency in complex SQL queries, window functions, indexing, CTEs, and relational database management."
  },
  {
    id: "cert-8",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "2024",
    credentialUrl: "https://hackerrank.com/certificates/frontend_react",
    description: "Verified frontend skills in React state management, hook lifecycle optimization, component design, and API rendering."
  }
];

export const clubActivities: ClubActivityItem[] = [
  {
    id: "club-1",
    title: "Vice President & Lead Developer",
    organization: "Web Development Club — Anurag University",
    date: "2023 – 2025",
    role: "Leadership & Technical Mentorship",
    description: "Spearheaded technical curriculum for 300+ student developers. Organized 6 hands-on workshops on React, Node.js, and Open Source contributions."
  },
  {
    id: "club-2",
    title: "Technical Volunteer & Mentor",
    organization: "GeeksforGeeks Student Chapter",
    date: "2023 – 2024",
    role: "Community Building & Event Management",
    description: "Coordinated campus hackathons, mentored junior coders in Data Structures & Algorithms, and organized competitive programming contests."
  },
  {
    id: "club-3",
    title: "Core Organiser",
    organization: "Innovision Annual Tech Fest",
    date: "2024",
    role: "Event Co-ordination & Web Infrastructure",
    description: "Managed registration web portal and live leaderboard for 1,200+ inter-college tech event participants."
  }
];

export const socialLinks = {
  github: "https://github.com/rangadaschakravarthy",
  linkedin: "https://linkedin.com/in/rangadaschakravarthy",
  email: "mailto:rangadaschakravarthy02@gmail.com",
  twitter: "https://twitter.com/rangadaschakravarthy"
};

export const alanSystemContext = `
You are Alan, an intelligent AI portfolio assistant representing Rangadas Chakravarthy, a fresher Software Engineer.
Rangadas's background:
- Degree: B.Tech in Computer Science & Engineering from Anurag University, Hyderabad (CGPA 9.26 / 10.0).
- Key Focus: Software Engineering, Full Stack Web Development (React, Node.js, TypeScript), AI & LLM Applications (Python, Flask, Vector Search, Gemini), and Data Analysis (Pandas, Power BI, MySQL).
- Major Projects:
  1. Career AI: AI career guidance & resume parser platform built with React, Node, MongoDB, Gemini API.
  2. AI Medical Chatbot: Symptom triage assistant using Python, Flask, RAG, Pinecone.
  3. MJ-AI Assistant: Voice-enabled desktop task automation tool using Python.
  4. Walmart Sales Data Analysis: Retail analytics dashboard using Pandas & Power BI.
  5. E-Learning Platform: LMS built with React, Express, MongoDB.
  6. Vehicle Rental System: Java Spring/MySQL booking portal.
  7. Gadget Hub: React/Tailwind e-commerce electronics store.
- Skills (18 total): Python, Java, C, JavaScript, TypeScript, React, Angular, HTML5, CSS3, Bootstrap, Node.js, Express.js, Flask, MySQL, MongoDB, Git, AWS, Power BI.
- Hackathons & Awards: 1st Place Department Hackathon, Winner Hackattack Dec 2024, Vice President Web Club, GFG Volunteer.
- Certifications: NPTEL Java, Cisco HTML/CSS/JS, Coursera GenAI, AWS Cloud Foundations, HackerRank SQL & React.

Instructions:
1. Answer recruiter questions concisely, accurately, and professionally using ONLY this portfolio context.
2. If asked to navigate (e.g. "show me projects", "take me to skills", "go to education", "open contact"), trigger navigation.
3. If asked about dark mode or light mode (e.g. "switch to dark mode", "light theme"), trigger theme changes.
4. If asked about contacting Rangadas, provide his email or direct the user to the contact form.
5. Do not invent any false details, jobs, or metrics.
`;
