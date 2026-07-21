// ---------------------------------------------------------------------------
// Profile Information
// Information about me
// ---------------------------------------------------------------------------

export interface Interest {
  label: string;
  icon: string; // key in src/icons/index.ts
  note?: string; // optional one-liner shown under the label
}

export const profile = {
  name: "João Guedes",
  title: "Backend Software Engineer",
  location: "Braga, Portugal",

  // A short one-liner (used as a subtitle on the About hero).
  tagline: "What a good looking guy over here",

  // 2–3 lines in your own voice — used as the résumé summary.
  summary: "Systems-minded Backend Engineer with a foundational background in cybersecurity, specializing in designing resilient, high-availability product infrastructure. Passionate about both building scalable systems and understanding how to securely break them. i combine deep hands-on experience in Linux system administration and infrastructure design with a product-focused approach to delivering clean, reliable solutions and code.",
  // Technical skills — grouped chips. Shown on About and the Résumé. Edit freely;
  // add or rename groups and they flow through to both pages.
  skills: {
    "Languages": ["Node.js", "TypeScript", "JavaScript", "Python", "Go", "Java", "Kotlin", "C#", "C++", "Rust", "Groovy", "Perl", "Prolog", "R", "SQL", "Bash", "PowerShell"],
    "Backend & APIs": ["Express", "Gin", "Flask", "Django", "Spring Boot", "ASP.NET", "REST", "gRPC", "GraphQL", "WebSockets"],
    "Frontend": ["React", "Redux", "Zustand", "Vue", "Astro", "HTML", "CSS", "Vite", "Webpack", "Rollup"],
    "Architecture & Systems": ["Microservices", "Distributed systems", "Event-driven", "System design", "Caching", "RabbitMQ", "CI/CD"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Redis", "SQLite", "Elasticsearch"],
    "DevOps & Cloud": ["Docker", "Docker Compose", "Portainer", "Kubernetes", "Argo CD", "Jenkins", "GitHub Actions", "Azure DevOps", "Jira", "AWS", "Nginx", "Traefik", "Proxmox", "Linux", "Git"],
    "Security & Offensive": ["Pentesting", "AppSec", "SAST", "DAST", "SCA", "OWASP Top 10", "Secure coding", "Burp Suite", "OWASP ZAP", "Nmap", "Metasploit"],
    "Networking": ["TCP/IP", "DNS", "VPNs", "Tailscale", "OpenVPN", "Reverse proxies", "Load balancing", "Firewalls", "SSH"],
    "Data Science & BI": ["Pandas", "NumPy", "scikit-learn", "Jupyter", "Matplotlib", "Power BI", "Tableau", "Excel automation", "Talend Open Studio"],
    "Testing & QA": ["Cypress", "Selenium", "Unit testing", "Integration testing", "E2E testing", "Test automation"],
    "Game Engines": ["Unity", "Godot"],
    "Hardware & Embedded": ["Arduino", "Raspberry Pi", "ESP32"],
  } as Record<string, string[]>,

  // Soft skills — short list.
  softSkills: ["Ownership", "Clear communication", "Pragmatism", "Mentoring", "Self-sufficient", "Fast-learner"],

  // Things I'm into outside code — shown on the About page as a small grid.
  // `icon` must exist in src/icons/index.ts (e.g. server, bike, heart, shield,
  // book-open, cpu, terminal, map-pin).
  interests: [
    { label: "Developing", icon: "code", note: "Building new solutions and figuring out how they should work"},
    { label: "Problem Solving", icon: "puzzle", note: "I love to solve puzzles and challenges"},
    { label: "Hardware", icon: "cpu", note: "Tinkering with hardware and working on new builds"},
    { label: "Homelab", icon: "server", note: "I love self-hosting my apps and working on my homelab"},
    { label: "Cybersecurity", icon: "shield", note: "How modern systems are broken and misused is fascinating and offers invaluable perspective to any tech professional"},
    { label: "Motorcycles", icon: "bike", note: "Riding on open roads and going on adventures on my bike"},
    { label: "Dogs", icon: "dog_paw", note: "Dogs make life worth living"},
    { label: "Retro Gaming", icon: "joystick", note: "My favorite generation of consoles is the PS2. It feels crazy that it's considered retro"},
    { label: "Music", icon: "music", note: "I'm a definition accurate audiophile. I own all the music I listen to and self host it only for me"},
    { label: "Cooking", icon: "chef", note: "I love cooking, reading and tinkering with recipes always excites me"},
  ] as Interest[],

  // Spoken languages.
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Fluent" },
  ] as { name: string; level: string }[],
};
