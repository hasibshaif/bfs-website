import { 
  FaCode,
  FaLightbulb,
  FaHandshake,
  FaRocket
} from "react-icons/fa";
import { Feature } from "@/types/about";

export const features: Feature[] = [
  {
    icon: FaCode,
    title: "Full-Stack Development",
    description: "Learn both frontend and backend technologies to build complete web applications."
  },
  {
    icon: FaLightbulb,
    title: "Project-Driven Learning",
    description: "Apply your skills through real-world projects that solve actual problems."
  },
  {
    icon: FaHandshake,
    title: "Collaborative Environment",
    description: "Work with fellow students in a supportive, team-oriented atmosphere."
  },
  {
    icon: FaRocket,
    title: "Industry Connections",
    description: "Connect with professionals and companies in the tech industry through our events and panels."
  }
];
