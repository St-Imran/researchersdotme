# API Documentation - Mock Backend

This document describes the mock API endpoints available in the application. These endpoints simulate a backend API and will be replaced with actual MongoDB connections in production.

## Base URL

All API routes are prefixed with `/api/`

---

## 📚 Blogs API

### GET `/api/blogs`

Get all blogs with optional filtering.

**Query Parameters:**

- `category` (optional) - Filter by blog category
- `featured` (optional) - Filter featured blogs (`true`/`false`)
- `limit` (optional) - Limit number of results

**Response:**

```json
[
  {
    "id": 1,
    "title": "Top Market Research Companies",
    "subtitle": "August 20, 2025",
    "date": "2025-08-20",
    "description": "...",
    "excerpt": "...",
    "bg": "/card1.webp",
    "link": "/blogs/top-market-research-companies",
    "author": "Researchers Team",
    "category": "Market Research",
    "featured": true,
    "readTime": "5 min read"
  }
]
```

**Example:**

```javascript
// Get all featured blogs
fetch("/api/blogs?featured=true");

// Get blogs by category
fetch("/api/blogs?category=Market Research");

// Get limited results
fetch("/api/blogs?limit=5");
```

---

### GET `/api/blog/[slug]`

Get a single blog by slug.

**URL Parameters:**

- `slug` - Blog slug identifier

**Response:**

```json
{
  "id": 1,
  "title": "Top Market Research Companies in the UAE for Startups",
  "date": "2025-08-20",
  "author": "Researchers Team",
  "category": "Market Research",
  "readTime": "5 min read",
  "image": "/card1.webp",
  "content": "<h2>Introduction</h2><p>...</p>",
  "tags": ["Market Research", "UAE", "Startups"],
  "relatedBlogs": [2, 3, 7]
}
```

**Example:**

```javascript
fetch("/api/blog/top-market-research-companies");
```

---

## 🔧 Services API

### GET `/api/services`

Get all services with optional filtering.

**Query Parameters:**

- `category` (optional) - Filter by service category
- `featured` (optional) - Filter featured services

**Response:**

```json
[
  {
    "id": 1,
    "title": "Market Research Services",
    "subtitle": "Unlocking Insights, Driving Strategy",
    "description": "...",
    "bg": "/card1.webp",
    "link": "/services/innerPages/feasibilityStudies",
    "category": "market-research",
    "featured": true
  }
]
```

**Example:**

```javascript
fetch("/api/services?featured=true");
```

---

## 📧 Contact API

### POST `/api/contact`

Submit a contact form.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971 XX XXX XXXX",
  "company": "ABC Corp",
  "service": "market-research",
  "message": "I'm interested in your services..."
}
```

**Required Fields:**

- `name`
- `email`
- `message`

**Response (Success):**

```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-11-26T10:30:00.000Z"
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Name, email, and message are required fields"
}
```

**Example:**

```javascript
fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, I need help with...",
  }),
});
```

---

## 📰 Newsletter API

### POST `/api/newsletter`

Subscribe to newsletter.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Required Fields:**

- `email`

**Response (Success):**

```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2025-11-26T10:30:00.000Z"
  }
}
```

### GET `/api/newsletter`

Get newsletter statistics.

**Response:**

```json
{
  "totalSubscribers": 1547,
  "growthRate": "+12.5%",
  "activeSubscribers": 1432
}
```

**Example:**

```javascript
// Subscribe
fetch("/api/newsletter", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "user@example.com" }),
});

// Get stats
fetch("/api/newsletter");
```

---

## ⭐ Testimonials API

### GET `/api/testimonials`

Get testimonials with optional filtering.

**Query Parameters:**

- `featured` (optional) - Filter featured testimonials
- `limit` (optional) - Limit number of results

**Response:**

```json
[
  {
    "id": 1,
    "name": "Sarah Al-Mansouri",
    "position": "CEO",
    "company": "TechVision UAE",
    "image": "/testimonial1.jpg",
    "rating": 5,
    "text": "Researchers helped us understand our market...",
    "date": "2025-01-15",
    "featured": true
  }
]
```

### POST `/api/testimonials`

Submit a new testimonial.

**Request Body:**

```json
{
  "name": "John Doe",
  "position": "CEO",
  "company": "ABC Corp",
  "text": "Great service!",
  "rating": 5
}
```

**Example:**

```javascript
// Get featured testimonials
fetch("/api/testimonials?featured=true&limit=3");
```

---

## 📊 Case Studies API

### GET `/api/case-studies`

Get case studies with optional filtering.

**Query Parameters:**

- `featured` (optional) - Filter featured case studies
- `category` (optional) - Filter by category
- `limit` (optional) - Limit number of results

**Response:**

```json
[
  {
    "id": 1,
    "title": "Market Entry Strategy for Tech Startup",
    "client": "TechVision UAE",
    "industry": "Technology",
    "challenge": "...",
    "solution": "...",
    "results": [
      "Identified 3 key customer segments",
      "Achieved 150% of first-year revenue targets"
    ],
    "image": "/case1.jpg",
    "featured": true,
    "category": "Market Research",
    "duration": "3 months",
    "year": "2024"
  }
]
```

**Example:**

```javascript
// Get featured case studies
fetch("/api/case-studies?featured=true");

// Get by category
fetch("/api/case-studies?category=Data Analytics");
```

---

## Error Handling

All endpoints follow a consistent error response format:

**Error Response:**

```json
{
  "success": false,
  "message": "Error description here"
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Server Error

---

## Migration to MongoDB

When migrating to MongoDB:

1. Replace mock data with MongoDB queries
2. Add proper validation using libraries like Joi or Yup
3. Implement authentication and authorization
4. Add rate limiting
5. Set up proper error logging
6. Add pagination for large datasets
7. Implement caching strategies

**Example MongoDB Integration:**

```javascript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("researchersdb");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const blogs = await db.collection("blogs").find({}).toArray();
    res.status(200).json(blogs);
  }
}
```

---

## Environment Variables (for production)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
EMAIL_SERVICE_API_KEY=your_email_service_key
WHATSAPP_API_KEY=your_whatsapp_api_key
```

---

## Notes

- All mock APIs simulate successful responses
- No data is persisted - all submissions are logged to console
- Production implementation should include proper validation, error handling, and data persistence
- Consider implementing API rate limiting in production
- Add CORS headers if API will be accessed from different domains
