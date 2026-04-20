import { getApiUrl } from "./apiConfig";
import { fetchJSON } from "./apiHelper";

// TypeScript interfaces for API data

export interface carouselTexts {
  id: number;
  header: string;
  text: string;
  hasLearnMore?: boolean;
  boldText?: string;
}

export const defaultAboutUsCarouselData: carouselTexts[] = [
  {
    id: 1,
    header: "The Origin Story.",
    text: "Founded on the principles Nick picked up on a less-than-traditional career path—calm under pressure, straight-talking, and doing things properly - ",
    hasLearnMore: true
  },
  {
    id: 2,
    header: "Straight Talking.",
    text: "We keep things simple: straight answers, no jargon, no waffle. We’ll chat things through properly, so you know exactly what you’re signing up to-and why.",
  },
  {
    id: 3,
    header: "Pay What’s Fair.",
    text: "We believe no one should pay more than necessary for any financial product — especially their mortgage — and that fees should always be clear, fair and fully explained upfront."
  },
  {
    id: 4,
    header: "Regulated, Reliable, On Your Side.",
    text: "We’re fully authorised and regulated, which means advice you can trust-and a process that’s done properly. Friendly? Yes.Professional? Absolutely."
  },
  {
    id: 5,
    header: "One Fee, Ongoing Support.",
    text: "You pay once for expert advice, and we don’t disappear after completion. We’ll be here for the long run-including free remortgage support when it’s time for your next step."
  }
];

// API fetch function
export async function fetchAboutUsCarouselData(): Promise<carouselTexts[]> {
  try {
    // Use helper with 5s timeout and 2 retries for iOS reliability
    const data = await fetchJSON<carouselTexts[]>(
      getApiUrl('about-us-carousel.php'),
      {},
      { timeout: 5000, maxRetries: 2, retryDelay: 1000 }
    );

    // Simulate API call with a delay for realistic loading
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Transform your API response to match the Service interface
    // Example transformation:
    // return data.services.map((service: any) => ({
    //   id: service.id,
    //   title: service.title,
    //   nextTitle: service.nextTitle,
    //   description: service.description,
    //   backgroundImage: service.backgroundImage,
    //   detailCards: service.cards.map((card: any) => ({
    //     id: card.id,
    //     text: card.text,
    //     image: card.imageUrl
    //   }))
    // }));
    return data;
    //return defaultAboutUsCarouselData;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return default data if API fails
    return defaultAboutUsCarouselData;
  }
}