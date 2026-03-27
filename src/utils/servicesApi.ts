// TypeScript interfaces for API data
export interface DetailCard {
  id: number;
  type: 'normal' | 'bullet' | 'price'; // Card content type
  title?: string; // Optional title for the card
  text?: string; // Main text for normal type (legacy support)
  description?: string; // Description text for normal type
  textItalic?: string; // Optional italic text for normal type
  textItalic2?: string; // Optional second italic text for normal type
  image?: string; // Optional image URL for each card
  imagem?: string; // Mobile Optional image URL for each card
  imageInset?: string; // Optional custom inset positioning for the image (e.g., "-107.69% -45.15% -64.94% 19.5%")
  bulletTitle?: string; // Title for bullet list type
  bulletSubTitle?: string; // Title for bullet list type
  bulletPoints?: string[]; // Array of bullet points
  priceData?: {
    newClientLabel: string;
    newClientSubLabel?: string;
    newClientPrice: string;
    newClientDescription?: string;
    newClientDescription2?: string;
    existingClientLabel?: string;
    existingClientZeroPrice?: string;
    existingClientPrice?: string;
    existingClientSubLabel?: string;
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
        title: "First Time Buyers",
        description: `<p>Buying your first home can feel like learning a new language — one spoken entirely by banks.</p><br />
                      <p>We’ll translate the jargon, explain what matters, and help you make confident choices without feeling rushed.</p><br />
                      <p>From working out what you can borrow to getting your offer over the line, we’ll keep things calm, clear, and moving.</p>`,
        textItalic: "Got a “silly question”?  No such thing — ask away.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Firsttimebuyers.webp",
        imageInset: "-0.69% -0.15% 0.06% 21.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Work out what you can comfortably borrow (not just what a calculator says).",
          "Compare lenders, rates and criteria without the headache",
          "Navigate schemes, incentives and the small print",
          "Avoid expensive “rookie mistakes” with real, regulated advice"
        ],
        textItalic2: "If you want the right person in your corner,  speak to the team.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Firsttimebuyers.webp",
        imageInset: "-0.69% -0.15% 0.06% 21.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "The Money Bit",
          newClientSubLabel: "Simple, transparent fees.",
          newClientPrice: "We charge a flat fee of £650 for all new clients.",
          newClientDescription: "That’s it - no percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "The Bonus News",
          //existingClientSubLabel: "For our Existing Clients",
          existingClientPrice: "Future residential remortgages for existing clients are free. Because paying again for advice you already got feels… unnecessary.",
          existingClientDescription: "Sounds too good to be true? It’s not, but why not ask more questions."
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/ftb.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Firsttimebuyers.webp",
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
        title: "Home Mover Mortgages",
        description: `<p>Moving house is exciting… and slightly chaotic.</p><br />
                      <p>You might be able to take your mortgage with you, or it might make more sense to switch to something that fits your new home and lifestyle.</p><br />
                      <p>Either way, we’ll explain it clearly and keep the mortgage side organised, so the move feels manageable.</p>`,
        textItalic: "Before you fall for a floor plan, let’s talk numbers.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/hmm2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Homemovermortgage.webp",
        imageInset: "-2.69% -2.15% -0.94% 20.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Work out whether moving your mortgage stacks up",
          "Compare switching options if a new deal suits you better",
          "Factor in the true cost of moving (not just the mortgage bit)",
          "Keep the process coordinated so you're not juggling ten things at once"
        ],
        textItalic2: "Want a calm plan for a chaotic move?  Have a chat with us.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/hmm2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Homemovermortgage.webp",
        imageInset: "-2.69% -2.15% -0.94% 20.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "The Money Bit",
          newClientSubLabel: "Simple, transparent fees.",
          newClientPrice: "We charge a flat fee of £650 for all new clients.",
          newClientDescription: "That’s it - no percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "The Bonus News",
          //existingClientSubLabel: "For our Existing Clients",
          existingClientPrice: "Future residential remortgages for existing clients are free. Because paying again for advice you already got feels… unnecessary.",
          existingClientDescription: "Quick question before you list your place?  Fire it over."
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/hmm2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Homemovermortgage.webp",
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
        title: "Remortgage",
        description: `<p>Rates change. Life changes. Your mortgage should keep up.</p><br />
                      <p>Whether you want a better deal, to borrow more, or to escape your lender’s “surprise” fees, we’ll help you switch smoothly and sensibly.</p><br />
                      <p>We’ll look at timing, true cost, and what actually benefits you - not just the headline rate.</p>`,
        textItalic: "If your mortgage feels a bit “meh”,  let’s fix that.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/Remortgage.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/RemortgageM.webp",
        imageInset: "-0.69% -15.15% -0.94% 57.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Compare rates and deals (without spreadsheet stress)",
          "Work out whether switching is worth it after fees and timing",
          "Borrow more for home improvements or big plans",
          "Talk through debt consolidation clearly (no scary buzzwords)"
        ],
        textItalic2: "Send us your current deal - we’ll tell you what it’s really doing.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/Remortgage.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/RemortgageM.webp",
        imageInset: "-0.69% -15.15% -0.94% 57.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "The Money Bit",
          newClientSubLabel: "Simple, transparent fees.",
          newClientPrice: "We charge a flat fee of £650 for all new clients.",
          newClientDescription: "That’s it - no percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "The Bonus News",
          //existingClientSubLabel: "For our Existing Clients",
          existingClientPrice: "Future residential remortgages for existing clients are free. Because paying again for advice you already got feels… unnecessary.",
          existingClientDescription: "Fancy a second opinion before you commit?  We’re here."
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/Remortgage.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/RemortgageM.webp",
        imageInset: "-0.69% -15.15% -0.94% 57.5%"
      }
    ]
  },
  {
    id: 4,
    title: "Mortgages for Military Personnel",
    nextTitle: "Protection",
    description: "Commercial mortgages for business premises, investment properties, and development projects.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Mortgages for Military Personnel",
        description: `<p>Forces life doesn’t come with neat paperwork or a predictable schedule.</p><br />
                      <p>We get postings, deployments, and “can we do this at 7pm?” calls - and we build the mortgage process around that reality.</p><br />
                      <p>Clear advice, flexible appointments, and a steady hand to keep things moving when life changes fast.</p>`,
        textItalic: "Serving’s hard enough - let’s make the mortgage bit easier.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Mortgageformilitarypersonnel.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Work around deployments, shift patterns and tight timelines",
          "Navigate lenders who understand armed forces circumstances",
          "Keep the paperwork tidy and the process on track",
          "Get clear answers quickly (without chasing you for weeks)"
        ],
        textItalic2: "Got a tight window? Give us the dates — we’ll do the rest.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Mortgageformilitarypersonnel.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      },
      {
        id: 3,
        type: 'price',
        priceData: {
          newClientLabel: "The Money Bit",
          newClientSubLabel: "Simple, transparent fees.",
          newClientPrice: "We charge a flat fee of £650 for all new clients.",
          newClientDescription: "That’s it - no percentages, no sliding scales, no mystery ranges.",
          existingClientLabel: "The Bonus News",
          //existingClientSubLabel: "For our Existing Clients",
          existingClientPrice: "Future residential remortgages for existing clients are free. Because paying again for advice you already got feels… unnecessary.",
          existingClientDescription: "Want the fee explained in plain English? Just ask."
        },
        image: "https://jigsaw.funkyvibes.co.uk/service-images/mmp.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/Mortgageformilitarypersonnel.webp",
        imageInset: "-0.69% -0.15% -0.94% 19.5%"
      }
    ]
  },
  {
    id: 5,
    title: "Protection",
    nextTitle: "First Time Buyers",
    description: "Commercial mortgages for business premises, investment properties, and development projects.",
    detailCards: [
      {
        id: 1,
        type: 'normal',
        title: "Protection",
        description: `<P><b>Talking about protection isn’t exactly dinner-party chat. But not planning for it? That’s usually far more expensive.</b></P><br />
                      <P>We’ll explain what matters, what doesn’t, and how each type of cover works in real life — without scare tactics or pressure.</P><br />
                      <P>Life changes. Income shifts. Health isn’t guaranteed. Protection simply makes sure your plans don’t fall apart if something unexpected happens.</P>`,
        //textItalic: "Serving’s hard enough - let’s make the mortgage bit easier.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
        imageInset: "-0.69% -19.15% -0.94% 40.5%"
      },
      {
        id: 2,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Understand the difference between Life Cover, Critical Illness, Income Protection and Family Income Benefit.",
          "Work out how much cover is genuinely necessary (not just what a calculator spits out).",
          "Compare insurers, definitions and claims records — not just the cheapest premium."
        ],
        //textItalic2: "Want more information? We’re happy to walk you through it.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
        imageInset: "-0.69% -19.15% -0.94% 40.5%"
      },
      {
        id: 3,
        type: 'bullet',
        bulletTitle: "Here’s the Deal",
        bulletSubTitle: "We’ll help you:",
        bulletPoints: [
          "Structure cover tax-efficiently and place it in trust where appropriate.",
          "Avoid gaps, overlaps and policies that look good on paper but disappoint later."
        ],
        textItalic2: "Want more information? We’re happy to walk you through it.",
          image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
          imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
          imageInset: "-0.69% -19.15% -0.94% 40.5%"
      },
      {
        id: 4,
        type: 'normal',
        title: "Products",
        description: `<p><b>Life Insurance</b></p>
                      <p>Pays a lump sum if you pass away — helping clear debts or support your family financially.</p><br />
                      <p><b>Critical Illness Cover</b></p>
                      <p>Pays a lump sum if you’re diagnosed with a specified serious condition — giving breathing space when income may pause but expenses don’t.</p>`,
        //textItalic: "Not sure which fits? That’s what we’re here for.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
        imageInset: "-0.69% -19.15% -0.94% 40.5%"
      },
      {
        id: 5,
        type: 'normal',
        title: "Products",
        description: `<p><b>Income Protection (IP)</b></p>
                      <p>Pays a monthly income if illness or injury stops you working — protecting your lifestyle long term..</p><br />
                      <p><b>Family Income Benefit (FIB)</b></p>
                      <p>Pays a monthly income instead of a lump sum —
                      often a more cost-effective way to replace earnings.</p><br />`,
        textItalic: "Not sure which fits? That’s what we’re here for.",
        image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
        imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
        imageInset: "-0.69% -19.15% -0.94% 40.5%"
      },
      {
        id: 6,
        type: 'price',
        priceData: {
          newClientLabel: "The Money Bit",
          //newClientSubLabel: "Simple, transparent fees.",
          newClientPrice: "Our advice fee:",
          //newClientDescription: "We’re paid by the insurer when cover is placed.",
          newClientDescription2: "We’re paid by the insurer when cover is placed.",
          //existingClientLabel: "aa",
          //existingClientSubLabel: "For our Existing Clients",
          existingClientZeroPrice: "£0",
          existingClientPrice: "That doesn’t change our advice — it simply means protection guidance is accessible, properly structured, and built around you from day one.",
          existingClientDescription: "Want to sense-check what you’ve already got? We’re happy to review it."
        },
          image: "https://jigsaw.funkyvibes.co.uk/service-images/protection2.webp",
          imagem: "https://jigsaw.funkyvibes.co.uk/service-images/protectionM.webp",
          imageInset: "-0.69% -19.15% -0.94% 40.5%"
      }
    ]
  },
];

// API fetch function
export async function fetchServices(): Promise<Service[]> {
  try {
    // TODO: Replace this URL with your actual API endpoint
    const response = await fetch('https://jigsaw.funkyvibes.co.uk/api/services.php');
    if (!response.ok) throw new Error('Failed to fetch services');
    const data = await response.json();

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
    return data.services;
    //return defaultServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return default data if API fails
    return defaultServices;
  }
}