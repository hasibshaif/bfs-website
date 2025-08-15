import { FaGlobe } from "react-icons/fa";
import { Member } from "@/types/people";

export const executiveBoard: Member[] = [
  {
    name: "Gregory Tomchuk",
    position: "President",
    major: "Computer Science",
    year: "Junior",
    image: "/images/people/gregory-tomchuk.jpeg",
    linkedin: "https://www.linkedin.com/in/gregory-tomchuk",
    links: []
  },
  {
    name: "Nabil Hasan",
    position: "Vice President",
    major: "Computer Science",
    year: "Junior",
    image: "/images/people/nabil-hasan.jpeg",
    linkedin: "https://www.linkedin.com/in/nabil-hasan1",
    links: []
  },
  {
    name: "Hasib Shaif",
    position: "Secretary",
    major: "Computer Science",
    year: "Senior",
    image: "/images/people/hasib-shaif.jpeg",
    linkedin: "https://www.linkedin.com/in/hasib-shaif/",
    links: [
      {
        type: "website",
        url: "https://hasibshaif.us",
        icon: FaGlobe,
        label: "Personal Website"
      }
    ]
  },
  {
    name: "Mohsin Ali",
    position: "Treasurer",
    major: "Computer Science",
    year: "Senior",
    image: "/images/people/mohsin-ali.jpeg",
    linkedin: "https://www.linkedin.com/in/mohsin-ali27",
    links: []
  }
];

export const committee: Member[] = [
  {
    name: "Nishat Angum",
    position: "Marketer",
    major: "Computer Information Systems",
    year: "Junior",
    image: "/images/people/nishat-angum.jpg",
    linkedin: "https://www.linkedin.com/in/nishat-angum-406288275",
    links: []
  },
  {
    name: "Dereck Teverne",
    position: "Community Outreach",
    major: "Computer Science",
    year: "Junior",
    image: "/images/people/dereck-teverne.jpg",
    linkedin: "https://www.linkedin.com/in/dereck-taverne/",
    links: []
  }
];
