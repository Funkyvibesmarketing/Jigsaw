import imgRectangle14120 from "figma:asset/1f4323015aa5bd0f08e5ce951e568156ed52ce87.png";
import { getApiUrl } from "./apiConfig";
import { fetchJSON } from "./apiHelper";


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
    title: "Navy Diver to Mortgage Advisor",
    bio: (
      <>
        <span>{`Hi, I’m Nick Kershaw, founder of Jigsaw Financial. I spent 12 years as a Royal Navy Clearance Diver—where “calm under pressure” wasn’t a slogan, it was a Tuesday. Then I broke my back in a bobsleigh crash (yes, really) forcing me to swap ice tracks for interest rates. I’ve been the first-time buyer staring at a form thinking, “Is this in English?” and I’m a husband and dad, so I get what’s at stake when you’re making big decisions for your home and family.I built Jigsaw around three rules: keep it clear, keep it personal, keep it fair. I now help people avoid overpaying, cut through jargon, and find solutions that suit your plans.`}</span>

      </>
    ),
    image: imgRectangle14120,
    linkedinUrl: "https://www.linkedin.com/in/nick-kershaw-123456789/" // Example LinkedIn URL
  },
  {
    id: 2,
    name: "Gemma Lawlor",
    title: "Protection Adviser",
    bio: (
      <>
        <span>{`Hi, I’m Gemma, Protection Adviser at Jigsaw Financial. I help people put straightforward, sensible protection in place for their income, home and family — without the jargon or awkward sales chat. With nearly 20 years in financial services, I understand real-life budgets, responsibilities and the pressure that comes with them. I use that experience to help clients choose protection that genuinely fits their life, not just what looks good on paper. I’m a married mum of two, so I know priorities change quickly and having the right safety net matters. My approach is relaxed, honest and focused on long-term relationships and reassurance.`}</span>

      </>
    ),
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTE1OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkedinUrl: "https://www.linkedin.com/in/sarah-thompson-987654321/" // Example LinkedIn URL
  },
  {
    id: 3,
    name: "Lois Kershaw",
    title: "Mortgage Processor",
    bio: (
      <>
        <span>{`Hi, I’m Lois, Mortgage Processor at Jigsaw Financial. I work behind the scenes to keep the mortgage process organised, on track and far less overwhelming than people expect. I focus on the detail — checking paperwork, tracking progress and making sure nothing gets missed. I like being the calm presence when things feel busy. As a wife and parent, I know big life decisions come with plenty of questions (and a bit of stress), so I aim to make everything feel manageable and reassuring. If you’re ever wondering, “Is this a silly question?” — it isn’t. I’m here to help, at every step.`}</span>
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
    // Use helper with 5s timeout and 2 retries for iOS reliability
    const data = await fetchJSON<{ teams: TeamMember[] }>(
      getApiUrl('teams.php'),
      {},
      { timeout: 5000, maxRetries: 2, retryDelay: 1000 }
    );

    // For now, simulate API call with delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Transform your API response to match the TeamMember interface
    // Example transformation:
    // return data.map((member: any) => ({
    //   id: member.id,
    //   name: member.name,
    //   title: member.title,
    //   bio: parseBioText(member.bioText), // Use helper to format bio
    //   image: member.imageUrl
    // }));
    return data.teams;
    //return getDefaultTeamMembers();
  } catch (error) {
    console.error('Error fetching team members:', error);
    // Return fallback data if API fails
    return getDefaultTeamMembers();
  }
}
