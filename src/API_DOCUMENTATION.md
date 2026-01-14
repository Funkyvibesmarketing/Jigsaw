# API Documentation

## Overview
This document explains the API structure for both Services and Blogs components, along with centralized API utilities and how to integrate your backend.

## API Endpoint
Replace `YOUR_API_ENDPOINT_HERE` in `/components/Services.tsx` with your actual API URL:
```typescript
const response = await fetch('https://your-api.com/api/services');
```

## Expected API Response Format

### JSON Structure
```json
{
  "services": [
    {
      "id": 1,
      "title": "First Time Buyers",
      "nextTitle": "Remortgage",
      "description": "Service description text",
      "backgroundImage": "https://your-cdn.com/images/first-time-buyers.jpg",
      "detailCards": [
        {
          "id": 1,
          "text": "Card content text goes here",
          "image": "https://your-cdn.com/images/card-1.jpg"
        },
        {
          "id": 2,
          "text": "Another card content",
          "image": "https://your-cdn.com/images/card-2.jpg"
        }
      ]
    },
    {
      "id": 2,
      "title": "Remortgage",
      "nextTitle": "Buy to Let",
      "description": "Another service description",
      "detailCards": [
        {
          "id": 1,
          "text": "Remortgage card content"
        }
      ]
    }
  ]
}
```

## TypeScript Interfaces

```typescript
interface DetailCard {
  id: number;
  text: string;
  image?: string; // Optional - URL to card image
}

interface Service {
  id: number;
  title: string;
  nextTitle: string;
  description: string;
  backgroundImage?: string; // Optional - URL for Step 1 background
  detailCards: DetailCard[];
}
```

## Field Descriptions

### Service Object
- **id** (required): Unique identifier for the service
- **title** (required): Main title displayed in both Step 1 and Step 2
- **nextTitle** (required): Title of the next service (for navigation preview)
- **description** (optional): Brief description of the service
- **backgroundImage** (optional): URL to image for the card stack in Step 1. If not provided, defaults to the imported `imgRectangle`
- **detailCards** (required): Array of detail cards shown in Step 2

### DetailCard Object
- **id** (required): Unique identifier for the card
- **text** (required): Main content text displayed on the card
- **image** (optional): URL to an image to display on the card (currently not rendered but available for future use)

## Implementation Steps

### 1. Update API Endpoint
In `/components/Services.tsx`, find the `fetchServices` function and update the URL:
```typescript
const response = await fetch('https://your-api.com/api/services');
```

### 2. Backend Implementation Example (Node.js/Express)

```javascript
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.services.findAll({
      include: [{ model: db.detailCards }]
    });
    
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});
```

### 3. Image Handling
For images, you can:
- Use a CDN URL
- Use relative URLs if served from the same domain
- Use data URIs for small images
- Use placeholder services like Unsplash

Example with images:
```json
{
  "id": 1,
  "title": "First Time Buyers",
  "backgroundImage": "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  "detailCards": [
    {
      "id": 1,
      "text": "We help first-time buyers...",
      "image": "https://your-cdn.com/cards/ftb-1.jpg"
    }
  ]
}
```

## Error Handling

The component includes automatic fallback to default data if:
- The API request fails
- The network is unavailable
- The API returns invalid data

Default services data is defined in `/components/Services.tsx` as `defaultServices`.

## Loading States

The component tracks loading state with `isLoading`:
- Initially `true` when component mounts
- Set to `false` after data is fetched
- Currently uses default data during loading (can be extended to show a loading spinner)

## Adding Loading UI (Optional)

To show a loading indicator, add this before the main return statement:

```typescript
if (isLoading) {
  return (
    <div className="relative w-full min-h-screen bg-[#2c4657] z-30 flex items-center justify-center">
      <div className="text-white text-2xl">Loading services...</div>
    </div>
  );
}
```

## Authentication (If Needed)

If your API requires authentication, update the fetch call:

```typescript
const response = await fetch('YOUR_API_ENDPOINT_HERE/api/services', {
  headers: {
    'Authorization': `Bearer ${YOUR_TOKEN}`,
    'Content-Type': 'application/json'
  }
});
```

## Testing

Test your API with curl:
```bash
curl https://your-api.com/api/services
```

Or with JavaScript in browser console:
```javascript
fetch('https://your-api.com/api/services')
  .then(r => r.json())
  .then(data => console.log(data));
```

## Notes

- The component will use default data if API fails, ensuring the app never breaks
- Images are optional fields - the design works without them
- The `nextTitle` field should reference the next service in the sequence (circular)
- Minimum of 2 services recommended for proper navigation
- Each service should have at least 1 detail card

---

# Blogs API Documentation

## Overview
The Blogs component fetches dynamic blog content from an API endpoint. This document explains the expected API structure for blogs.

## Centralized API Utility
Blogs use a centralized API utility located at `/utils/blogsApi.ts` for consistent data fetching across desktop and mobile components.

## API Endpoint
The endpoint is configured in `/utils/blogsApi.ts`:
```typescript
const API_BASE_URL = 'YOUR_API_ENDPOINT_HERE';
```

Replace `YOUR_API_ENDPOINT_HERE` with your actual API URL, for example:
```typescript
const API_BASE_URL = 'https://your-api.com/api';
```

## Expected API Response Format

### JSON Structure
```json
{
  "blogs": [
    {
      "id": 1,
      "date": "May 14, 2024",
      "title": "Understanding Mortgage Rates",
      "description": "A comprehensive guide to understanding how mortgage rates work and what affects them.",
      "content": "Full blog article content goes here. This can include multiple paragraphs and detailed information about the topic...",
      "image": "https://your-cdn.com/images/blog-1.jpg",
      "author": "John Smith",
      "category": "Mortgages"
    },
    {
      "id": 2,
      "date": "May 10, 2024",
      "title": "First Time Buyer Tips",
      "description": "Essential tips for first-time home buyers navigating the property market.",
      "content": "Detailed content about first-time buyer tips...",
      "image": "https://your-cdn.com/images/blog-2.jpg"
    }
  ]
}
```

## TypeScript Interface

Located in `/utils/blogsApi.ts`:

```typescript
export interface BlogData {
  id: number;
  date: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
}
```

## Field Descriptions

### Blog Object
- **id** (required): Unique identifier for the blog post
- **date** (required): Publication date in human-readable format (e.g., "May 14, 2024")
- **title** (required): Blog post title (displayed in card and detail view)
- **description** (required): Brief summary/excerpt of the blog post (shown in blog cards)
- **content** (required): Full blog article content (displayed in popup detail view)
- **image** (optional): URL to featured image for the blog post
- **author** (optional): Author name
- **category** (optional): Blog category/tag

## API Functions

The `/utils/blogsApi.ts` exports the following functions:

### fetchBlogs()
Fetches all blog posts from the API.

```typescript
import { fetchBlogs } from './utils/blogsApi';

const blogs = await fetchBlogs();
```

**Returns**: `Promise<BlogData[]>`
- On success: Array of blog posts
- On failure: Empty array `[]` (fails silently with console error)

## Implementation Steps

### 1. Update API Endpoint
In `/utils/blogsApi.ts`, update the `API_BASE_URL`:
```typescript
const API_BASE_URL = 'https://your-api.com/api';
```

### 2. Backend Implementation Example (Node.js/Express)

```javascript
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.blogs.findAll({
      order: [['createdAt', 'DESC']], // Most recent first
      limit: 50
    });
    
    const formattedBlogs = blogs.map(blog => ({
      id: blog.id,
      date: blog.publishedDate,
      title: blog.title,
      description: blog.excerpt,
      content: blog.content,
      image: blog.featuredImage,
      author: blog.authorName,
      category: blog.category
    }));
    
    res.json({ blogs: formattedBlogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});
```

### 3. Image Handling
For blog images, you can:
- Use a CDN URL
- Use relative URLs if served from the same domain
- Use Unsplash or other placeholder services
- Leave empty to use default fallback images

Example with images:
```json
{
  "id": 1,
  "title": "Understanding Mortgage Rates",
  "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  "description": "Learn about mortgage rates..."
}
```

## Component Integration

Blogs are fetched once in `/App.tsx` and passed down to components:

```typescript
// In App.tsx
const [blogsData, setBlogsData] = useState<BlogData[]>([]);

useEffect(() => {
  const loadData = async () => {
    const blogs = await fetchBlogs();
    setBlogsData(blogs);
  };
  loadData();
}, []);

// Passed to components
<Blogs blogs={blogsData} />
<BlogsMobile blogs={blogsData} />
```

## Blog Display Features

### Desktop Component (`/components/Blogs.tsx`)
- Infinite 3D carousel using Swiper.js with coverflow effect
- 20 duplicated slides for smooth infinite scrolling
- Navigation buttons with turquoise hover effects
- Blog detail popup with full content
- Previous/Next navigation in popup

### Mobile Component (`/components/BlogsMobile.tsx`)
- Scroll-triggered animations for title and cards
- "BLOGS" text slides up with color transition:
  - Starts at `rgba(34, 37, 38, 1)` (solid #222526)
  - Fades to 30% opacity when sticky
  - Remains visible throughout scroll
- Same carousel and popup functionality as desktop
- Optimized touch interactions

## Error Handling

Both components include automatic fallback:
- API failures default to empty array `[]`
- Network errors are logged to console
- Components render empty state gracefully
- No breaking errors shown to users

## Loading States

The centralized API utility handles loading:
```typescript
export async function fetchBlogs(): Promise<BlogData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return []; // Return empty array on error
  }
}
```

## Authentication (If Needed)

If your API requires authentication, update `/utils/blogsApi.ts`:

```typescript
export async function fetchBlogs(): Promise<BlogData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      headers: {
        'Authorization': `Bearer ${YOUR_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    // ... rest of the code
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}
```

## Testing

Test your API with curl:
```bash
curl https://your-api.com/api/blogs
```

Or with JavaScript in browser console:
```javascript
fetch('https://your-api.com/api/blogs')
  .then(r => r.json())
  .then(data => console.log(data));
```

## Carousel Configuration

The blog carousel uses these Swiper.js settings:
- **Effect**: Coverflow (3D card rotation)
- **Slides per view**: 1.2 (shows partial next/prev cards)
- **Loop**: true (infinite scrolling)
- **Center slides**: true
- **Duplicates**: 20 sets of blogs for smooth looping
- **Navigation**: Custom buttons with arrow icons

## Notes

- Minimum of 3-5 blog posts recommended for optimal carousel appearance
- The carousel duplicates blogs 20 times for smooth infinite scrolling
- Content field supports plain text (HTML parsing can be added if needed)
- Date format is flexible - use any human-readable format
- Blog detail popup includes responsive design for all screen sizes
- Mobile version features scroll-based animations using Motion (Framer Motion)

---

# Centralized API Architecture

## Overview
Both Services and Blogs use centralized API utilities for consistent data fetching:
- `/utils/servicesApi.ts` - Services data
- `/utils/blogsApi.ts` - Blogs data

## Benefits
- **Single source of truth**: API endpoints defined in one place
- **Reusability**: Functions can be called from any component
- **Type safety**: TypeScript interfaces ensure data consistency
- **Error handling**: Centralized error handling with graceful fallbacks
- **Maintainability**: Easy to update endpoints and add features

## Usage Pattern

```typescript
// 1. Import the API function
import { fetchBlogs } from './utils/blogsApi';
import { fetchServices } from './utils/servicesApi';

// 2. Fetch data (typically in App.tsx)
const blogs = await fetchBlogs();
const services = await fetchServices();

// 3. Pass to components
<Blogs blogs={blogs} />
<Services services={services} />
```

## Future Enhancements

Potential additions to the API utilities:
- Caching layer for performance
- Request debouncing
- Pagination support
- Search and filtering
- Real-time updates via WebSocket
- Optimistic UI updates
