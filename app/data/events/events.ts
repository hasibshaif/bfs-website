export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  subtext?: string;
  semester: string;
  eventFolder: string;
}

export const events: Event[] = [
  {
    id: "chartered",
    title: "Baruch Full Stack gets officially chartered!",
    date: "2025-04-01",
    description: "Thanks to USG's approval, BFS will be an officially recognized Baruch student organization starting from the Fall 2025 semester!",
    semester: "spring_2025",
    eventFolder: ""
  },
  {
    id: "fireside-chat",
    title: "Fireside Chat and Q&A w/ Naman Pujari, SWE at Bloomberg",
    date: "2025-03-27",
    description: "Attendees learned about Naman, a former fellow CUNY student, and his journey to becoming a software engineer at Bloomberg. He also shared his advice on how to excel as an aspiring professional, and we held a Q&A session for students to ask him anything.",
    semester: "spring_2025",
    eventFolder: "fireside_chat_with_naman_pujari"
  },
  {
    id: "intro-react",
    title: "Intro To React w/ Baruch Association for Information Systems (AIS)",
    date: "2025-03-20",
    description: "Attendees got to learn the fundamentals of React, an industry-standard library for modern web development. We also conducted a live code-along to get a practical experience of how to use React.",
    semester: "spring_2025",
    eventFolder: "intro_to_react"
  },
  {
    id: "gim_1",
    title: "General Interest Meeting #1",
    date: "2025-02-20",
    description: "Attendees got to discover our club, learn about our goals and mission (including plans for semester-long projects), connect with fellow tech enthusiasts, meet the e-board, and enjoy pizza!",
    semester: "spring_2025",
    eventFolder: "gim_1"
  },
  {
    id: "club-showcase",
    title: "Club Showcase",
    date: "2025-02-11",
    description: "Our inaugural tabling event, where we introduced BFS to the student community, generated excitement for our club, promoted our upcoming GIM, and shared our vision and mission.",
    semester: "spring_2025",
    eventFolder: "club_showcase"
  }
];

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
