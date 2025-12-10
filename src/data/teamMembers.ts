export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "alex",
    name: "Alex Chen",
    role: "lead developer",
    image: "",
    bio: [
      "specializes in systems architecture and backend development. passionate about building scalable, reliable infrastructure.",
      "interests include distributed systems, performance optimization, and security.",
    ],
  },
  {
    id: "jordan",
    name: "Jordan Park",
    role: "frontend engineer",
    image: "",
    bio: [
      "focused on creating intuitive interfaces and smooth user experiences. believes in the power of thoughtful design.",
      "enjoys working at the intersection of design and engineering.",
    ],
  },
  {
    id: "sam",
    name: "Sam Rivera",
    role: "security researcher",
    image: "",
    bio: [
      "dedicated to finding and fixing vulnerabilities before they become problems. experienced in penetration testing and secure code review.",
      "active participant in ctf competitions and open source security tools.",
    ],
  },
  {
    id: "taylor",
    name: "Taylor Kim",
    role: "devops engineer",
    image: "",
    bio: [
      "keeps systems running smoothly with automation and monitoring. expert in cloud infrastructure and ci/cd pipelines.",
      "passionate about reliability engineering and incident response.",
    ],
  },
  {
    id: "casey",
    name: "Casey Morgan",
    role: "product designer",
    image: "",
    bio: [
      "bridges the gap between user needs and technical implementation. focused on accessible, inclusive design.",
      "believes good design is invisible — it just works.",
    ],
  },
];
