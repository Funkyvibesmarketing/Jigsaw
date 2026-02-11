import imgRectangle14120 from "figma:asset/1f4323015aa5bd0f08e5ce951e568156ed52ce87.png";

// TypeScript interface for team member data
export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: React.ReactNode;
  image: string;
  linkedinUrl?: string; // Optional LinkedIn profile URL
}

// Default team member data (fallback/mock data)
export const getDefaultTeamMembers = (): TeamMember[] => [
  {
    id: 1,
    name: "Nick Kershaw",
    title: "Mortgage & Insurance Adviser",
    bio: (
      <>
        <span>{`Serving as a Royal Navy Clearance Diver from `}</span>
        <span className="font-bold">2004–2016</span>
        <span>{`, my career was interrupted in `}</span>
        <span className="font-bold">2015</span>
        <span>{` by a back-fracturing bobsleigh crash. I subsequently spent `}</span>
        <span className="font-bold">2016–2018</span>
        <span>{` retraining in financial services, leading to the `}</span>
        <span className="font-bold">2019</span>
        <span>{` founding of Jigsaw. Our ongoing mission is to simplify finance and help clients secure homes.`}</span>
      </>
    ),
    image: imgRectangle14120,
    linkedinUrl: "https://www.linkedin.com/in/nick-kershaw-123456789/" // Example LinkedIn URL
  },
  {
    id: 2,
    name: "Sarah Thompson",
    title: "Senior Financial Consultant",
    bio: (
      <>
        <span>{`With over `}</span>
        <span className="font-bold">15 years</span>
        <span>{` of experience in financial planning, I specialise in helping families achieve their homeownership dreams. My background in `}</span>
        <span className="font-bold">corporate finance</span>
        <span>{` and commitment to personalised service ensures every client receives tailored solutions. I joined Jigsaw in `}</span>
        <span className="font-bold">2020</span>
        <span>{` to bring expertise and compassion to mortgage advisory.`}</span>
      </>
    ),
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTE1OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkedinUrl: "https://www.linkedin.com/in/sarah-thompson-987654321/" // Example LinkedIn URL
  },
  {
    id: 3,
    name: "James Mitchell",
    title: "Protection & Insurance Specialist",
    bio: (
      <>
        <span>{`I began my career in `}</span>
        <span className="font-bold">2012</span>
        <span>{` as an insurance analyst and have since become a certified protection specialist. My passion lies in safeguarding families and their futures through comprehensive `}</span>
        <span className="font-bold">insurance solutions</span>
        <span>{`. Joining Jigsaw in `}</span>
        <span className="font-bold">2021</span>
        <span>{`, I focus on creating peace of mind for our clients with expert advice and reliable coverage.`}</span>
      </>
    ),
    image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA5NzQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkedinUrl: "https://www.linkedin.com/in/james-mitchell-555555555/" // Example LinkedIn URL
  }
];

export const defaultTeamMembers = getDefaultTeamMembers();

// Helper function to parse bio text with bold formatting
// Example usage: "Text with **bold** words" -> React nodes with bold spans
export function parseBioText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <span key={index} className="font-bold">{boldText}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

// API fetch function - Replace with your actual API endpoint
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    // TODO: Replace this URL with your actual API endpoint
    // const response = await fetch('https://your-api.com/api/team-members');
    // if (!response.ok) throw new Error('Failed to fetch team members');
    // const data = await response.json();
    
    // For now, simulate API call with delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // TODO: Transform your API response to match the TeamMember interface
    // Example transformation:
    // return data.map((member: any) => ({
    //   id: member.id,
    //   name: member.name,
    //   title: member.title,
    //   bio: parseBioText(member.bioText), // Use helper to format bio
    //   image: member.imageUrl
    // }));
    
    return getDefaultTeamMembers();
  } catch (error) {
    console.error('Error fetching team members:', error);
    // Return fallback data if API fails
    return getDefaultTeamMembers();
  }
}
