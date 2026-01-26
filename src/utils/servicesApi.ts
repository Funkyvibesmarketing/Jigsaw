// TypeScript interfaces for API data
export interface DetailCard {
  id: number;
  type: 'normal' | 'bullet' | 'price'; // Card content type
  title?: string; // Optional title for the card
  text?: string; // Main text for normal type (legacy support)
  description?: string; // Description text for normal type
  image?: string; // Optional image URL for each card
  imagem?: string; // Mobile Optional image URL for each card
  imageInset?: string; // Optional custom inset positioning for the image (e.g., "-107.69% -45.15% -64.94% 19.5%")
  bulletTitle?: string; // Title for bullet list type
  bulletPoints?: string[]; // Array of bullet points
  priceData?: {
    newClientLabel: string;
    newClientPrice: string;
    newClientDescription: string;
    existingClientLabel: string;
    existingClientPrice: string;
    existingClientDescription: string;
  };
}

export interface Service {
  id: number;
  title: string;
  nextTitle: string;
  description: string;
  backgroundImage?: string; // Optional background image for Step 1
  detailCards: DetailCard[];
}

// Default/fallback service data
export const defaultServices: Service[] = [
  {
    id: 1,
    title: "First Time Buyers",
    nextTitle: "Home Mover Mortgages",
    description: "Our purchase deals will cover whether the property is your dream cottage in Anglesey, a chic apartment in Edinburgh, or a home for the family in Coventry.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Buying home for first time? We make it easy",
        description: "Buying your first home can feel like learning a new language—one spoken entirely by banks. We translate the process, help you find the best deals, and support you every step of the way. So you can move in with confidence, not confusion.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/ftbm.webp",
        imageInset: "-0.69% -0.15% 0.06% 21.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "We'll help you with:",
        bulletPoints: [
          "Understand what you can borrow",
          "Compare mortgage products",
          "Navigate schemes and incentives, rates and lenders criteria",
          "Avoid rookie mistakes with real, regulated advice"
        ],
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/ftbm.webp",
        imageInset: "-0.69% -0.15% 0.06% 21.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "Transparent Fees for new Clients:",
          newClientPrice: "£650",
          newClientDescription: "No percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "For Existing Clients:",
          existingClientPrice: "Free of Cost!",
          existingClientDescription: "Because paying again for advice you already got feels... unnecessary"
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/ftbm.webp",
        imageInset: "-0.69% -0.15% 0.06% 21.5%"
      }
    ]
  },
  {
    id: 2,
    title: "Home Mover Mortgages",
    nextTitle: "Remortgage",
    description: "Looking to remortgage? We'll help you find the best deals and save money on your existing mortgage.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Moving to a new home?",
        description: "You may save money by taking your mortgage with you—if not, we’ll assist with a mortgage upgrade. Relevant to your new property and current life and lifestyle. We’ll review your current deal, advise on porting vs. switching, and help you plan financially for the big move.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/hmm2.webp",
        imageInset: "-2.69% -2.15% -0.94% 20.5%"
      },
      {
        id: 2,
        type: 'price',
        priceData: {
          newClientLabel: "Transparent Fees for new Clients:",
          newClientPrice: "£495",
          newClientDescription: "No percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "For Existing Clients:",
          existingClientPrice: "Free of Cost!",
          existingClientDescription: "Because paying again for advice you already got feels... unnecessary"
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/hmm2.webp",
        imageInset: "-2.69% -2.15% -0.94% 20.5%"
      }
    ]
  },
  {
    id: 3,
    title: "Remortgage",
    nextTitle: "Mortgages for Military Personnel",
    description: "Whether you're a first-time landlord or expanding your portfolio, we have the expertise to help.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Rates change. Life changes. Your mortgage should, too.",
        description: "Whether you’re looking for a better deal, borrowing more, or just escaping your current lender’s“surprise”fees, we’ll guide you through the switch.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/remo.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "We'll help you:",
        bulletPoints: [
          "Rate comparisons",
          "Equity release",
          "Debt Consolidation strategies"
        ],
        image: "https://jigsaw.funkyvibes.co.uk/service-images/remo.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "Transparent Fees for new Clients:",
          newClientPrice: "£650",
          newClientDescription: "No percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "For Existing Clients:",
          existingClientPrice: "Free of Cost!",
          existingClientDescription: "Because paying again for advice you already got feels... unnecessary"
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/remo.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      }
    ]
  },
  {
    id: 4,
    title: "Mortgages for Military Personnel",
    nextTitle: "First Time Buyers",
    description: "Commercial mortgages for business premises, investment properties, and development projects.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Serving your country shouldn’t make it harder to own a home",
        description: "We understand the realities of life in the forces—postings, deployments, limited time, unpredictable paperwork—and we shape our service around it.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "We provide you with:",
        bulletPoints: [
          "Tailored advice for armed forces buyers",
          "Flexible appointment times",
          "Experience with military-specific mortgage products"
        ],
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "Transparent Fees for new Clients:",
          newClientPrice: "£650",
          newClientDescription: "No percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "For Existing Clients:",
          existingClientPrice: "Free of Cost!",
          existingClientDescription: "Because paying again for advice you already got feels... unnecessary"
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      }
    ]
  },
];

// API fetch function
export async function fetchServices(): Promise<Service[]> {
  try {
    // TODO: Replace this URL with your actual API endpoint
    // const response = await fetch('https://your-api.com/api/services');
    // if (!response.ok) throw new Error('Failed to fetch services');
    // const data = await response.json();
    
    // Simulate API call with a delay for realistic loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    
    return defaultServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return default data if API fails
    return defaultServices;
  }
}