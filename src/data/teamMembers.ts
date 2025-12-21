// Import individual profile photos
// Place your images in src/assets/ folder and import them here
// Example:
import danishPhoto from '../assets/me.jpeg';
import varunPhoto from '../assets/varun.jpg';
import rahulPhoto from '../assets/rahul.jpg';
import ankitPhoto from '../assets/ankit.jpg';
import chiragPhoto from '../assets/chirag.jpg';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "danish",
    name: "Danish Verma",
    role: "team lead",
    image: danishPhoto, // Replace with: danishPhoto
    bio: [
      "specializes in systems architecture and backend development. passionate about building scalable, reliable infrastructure.",
      "interests include distributed systems, performance optimization, and security.",
    ],
  },
  {
    id: "varun",
    name: "Varun Gupta",
    role: "moral support",
    image: varunPhoto, // Replace with: varunPhoto
    bio: [
      "focused on creating intuitive interfaces and smooth user experiences. believes in the power of thoughtful design.",
      "enjoys working at the intersection of design and engineering.",
    ],
  },
  {
    id: "rahul",
    name: "Rahul Jaluthria",
    role: "the assaulter",
    image: rahulPhoto, // Replace with: rahulPhoto
    bio: [
      "dedicated to finding and fixing vulnerabilities before they become problems. experienced in penetration testing and secure code review.",
      "active participant in ctf competitions and open source security tools.",
    ],
  },
  {
    id: "ankit",
    name: "Ankit Kumar",
    role: "type-c cable",
    image: ankitPhoto, // Replace with: ankitPhoto
    bio: [
      "keeps systems running smoothly with automation and monitoring. expert in cloud infrastructure and ci/cd pipelines.",
      "passionate about reliability engineering and incident response.",
    ],
  },
  {
    id: "chirag",
    name: "Chirag Singh",
    role: "kinda just exists",
    image: chiragPhoto, // Replace with: chiragPhoto
    bio: [
      "bridges the gap between user needs and technical implementation. focused on accessible, inclusive design.",
      "believes good design is invisible — it just works.",
    ],
  },
];
