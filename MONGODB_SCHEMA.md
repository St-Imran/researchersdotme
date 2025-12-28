# MongoDB Schema Reference

This document provides the recommended MongoDB schemas for migrating from mock API to production database.

## 📚 Collections Overview

```
researchersdb/
├── blogs
├── services
├── contacts
├── newsletters
├── testimonials
├── caseStudies
├── users (for future admin)
└── settings (for future config)
```

---

## 1. Blogs Collection

### Schema

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  author: {
    type: String,
    required: true,
    default: "Researchers Team"
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Market Research",
      "Data Analytics",
      "Branding",
      "Industry Insights",
      "Small Business",
      "Technology"
    ]
  },
  description: {
    type: String,
    required: true,
    maxLength: 200
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: String,
    default: "5 min read"
  },
  tags: [{
    type: String,
    trim: true
  }],
  relatedBlogs: [{
    type: ObjectId,
    ref: 'Blog'
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  publishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.blogs.createIndex({ slug: 1 }, { unique: true });
db.blogs.createIndex({ category: 1 });
db.blogs.createIndex({ featured: 1 });
db.blogs.createIndex({ status: 1 });
db.blogs.createIndex({ createdAt: -1 });
db.blogs.createIndex({ title: "text", description: "text", content: "text" });
```

### Sample Document

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Top Market Research Companies in the UAE for Startups",
  "slug": "top-market-research-companies",
  "date": ISODate("2025-08-20T00:00:00Z"),
  "author": "Researchers Team",
  "category": "Market Research",
  "description": "Top Market Research Companies in the UAE for Startups",
  "excerpt": "Discover the leading market research companies...",
  "content": "<h2>Introduction</h2><p>...</p>",
  "image": "/card1.webp",
  "featured": true,
  "readTime": "5 min read",
  "tags": ["Market Research", "UAE", "Startups", "Business Strategy"],
  "relatedBlogs": [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013")
  ],
  "views": 1247,
  "likes": 89,
  "status": "published",
  "publishedAt": ISODate("2025-08-20T10:00:00Z"),
  "createdAt": ISODate("2025-08-15T14:30:00Z"),
  "updatedAt": ISODate("2025-08-20T10:00:00Z")
}
```

---

## 2. Services Collection

### Schema

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "market-research",
      "consulting",
      "analytics",
      "research",
      "advisory"
    ]
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  detailedContent: {
    type: String
  },
  features: [{
    type: String
  }],
  pricing: {
    type: String
  },
  duration: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.services.createIndex({ category: 1 });
db.services.createIndex({ featured: 1 });
db.services.createIndex({ order: 1 });
db.services.createIndex({ status: 1 });
```

---

## 3. Contacts Collection

### Schema

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    enum: [
      "market-research",
      "business-consulting",
      "data-analytics",
      "brand-strategy",
      "other"
    ]
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: ObjectId,
    ref: 'User'
  },
  notes: [{
    text: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  ipAddress: String,
  userAgent: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: Date,
  closedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ status: 1 });
db.contacts.createIndex({ submittedAt: -1 });
db.contacts.createIndex({ priority: 1 });
```

---

## 4. Newsletter Subscribers Collection

### Schema

```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['website', 'blog', 'manual', 'import'],
    default: 'website'
  },
  preferences: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    categories: [{
      type: String
    }]
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: Date,
  unsubscribeToken: {
    type: String,
    unique: true
  },
  lastEmailSent: Date,
  emailsReceived: {
    type: Number,
    default: 0
  },
  emailsOpened: {
    type: Number,
    default: 0
  },
  emailsClicked: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.newsletters.createIndex({ email: 1 }, { unique: true });
db.newsletters.createIndex({ status: 1 });
db.newsletters.createIndex({ subscribedAt: -1 });
```

---

## 5. Testimonials Collection

### Schema

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  order: {
    type: Number,
    default: 0
  },
  serviceUsed: {
    type: String
  },
  projectDuration: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  approvedAt: Date,
  approvedBy: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.testimonials.createIndex({ featured: 1 });
db.testimonials.createIndex({ status: 1 });
db.testimonials.createIndex({ rating: -1 });
db.testimonials.createIndex({ order: 1 });
```

---

## 6. Case Studies Collection

### Schema

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  client: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  results: [{
    type: String,
    required: true
  }],
  image: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  year: {
    type: String,
    required: true
  },
  metrics: {
    revenueIncrease: String,
    costSavings: String,
    timeReduction: String,
    customerSatisfaction: String
  },
  technologies: [{
    type: String
  }],
  testimonial: {
    type: ObjectId,
    ref: 'Testimonial'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes

```javascript
db.caseStudies.createIndex({ slug: 1 }, { unique: true });
db.caseStudies.createIndex({ category: 1 });
db.caseStudies.createIndex({ featured: 1 });
db.caseStudies.createIndex({ industry: 1 });
db.caseStudies.createIndex({ status: 1 });
```

---

## 🔧 Mongoose Models Example

### Blog Model

```javascript
// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // ... rest of fields
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ category: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ title: "text", description: "text", content: "text" });

// Virtual for related blogs populated
blogSchema.virtual("relatedBlogsData", {
  ref: "Blog",
  localField: "relatedBlogs",
  foreignField: "_id",
});

// Pre-save middleware to update slug
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
```

---

## 🚀 Database Setup Commands

### Create Database and Collections

```javascript
use researchersdb;

// Create collections with validators
db.createCollection("blogs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "slug", "category", "content"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        slug: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
});

db.createCollection("services");
db.createCollection("contacts");
db.createCollection("newsletters");
db.createCollection("testimonials");
db.createCollection("caseStudies");
```

### Create All Indexes

```javascript
// Blogs
db.blogs.createIndex({ slug: 1 }, { unique: true });
db.blogs.createIndex({ category: 1 });
db.blogs.createIndex({ featured: 1 });
db.blogs.createIndex({ createdAt: -1 });

// Services
db.services.createIndex({ category: 1 });
db.services.createIndex({ featured: 1 });

// Contacts
db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ submittedAt: -1 });

// Newsletters
db.newsletters.createIndex({ email: 1 }, { unique: true });

// Testimonials
db.testimonials.createIndex({ featured: 1 });

// Case Studies
db.caseStudies.createIndex({ slug: 1 }, { unique: true });
db.caseStudies.createIndex({ category: 1 });
```

---

## 📊 Sample Data Migration Script

```javascript
// scripts/migrateToMongo.js
import { connectToDatabase } from "../lib/mongodb";
import { blogsData } from "../mockData/blogs";

async function migrateMockData() {
  const { db } = await connectToDatabase();

  try {
    // Migrate Blogs
    const blogsResult = await db.collection("blogs").insertMany(blogsData);
    console.log(`Inserted ${blogsResult.insertedCount} blogs`);

    // Migrate Services
    // ... similar for other collections

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrateMockData();
```

---

## 🔒 Security Considerations

1. **Connection String**: Never commit MongoDB URI to repository
2. **Validation**: Always validate input on server side
3. **Sanitization**: Sanitize user inputs to prevent injection
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Authentication**: Add authentication for admin operations
6. **Backup**: Set up automated backups
7. **Monitoring**: Monitor database performance and queries

---

**Next Steps:**

1. Set up MongoDB Atlas account or local MongoDB
2. Create database and collections
3. Run index creation commands
4. Update API routes to use MongoDB
5. Test thoroughly before deploying

See `API_DOCUMENTATION.md` for API integration details.
