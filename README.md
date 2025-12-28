# Researchers.me - Market Research & Business Intelligence Platform

A modern Next.js web application for Researchers.me, providing market research, business consulting, and data analytics services across the UAE and MENA region.

## 🚀 Project Overview

This is a [Next.js](https://nextjs.org/) project featuring:

- **Services Showcase** - Comprehensive market research and consulting services
- **Blog Platform** - Insights, trends, and best practices in market research
- **Contact System** - Integrated contact forms with API backend
- **Case Studies** - Success stories and client testimonials
- **Mock API Backend** - Ready for MongoDB migration

## 📋 Features

### ✨ Current Features

- 🏠 Dynamic service pages with detailed information
- 📝 Full-featured blog system with search and filtering
- 📧 Contact form with validation and API integration
- 📊 Case studies and testimonials
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 🔍 SEO-friendly structure
- ⚡ Fast performance with Next.js optimization

### 🔜 Coming Soon

- MongoDB integration
- Admin dashboard for content management
- User authentication
- Newsletter management system
- Advanced analytics integration

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Styling:** CSS Modules, Bootstrap 5
- **UI Components:** Material-UI (MUI)
- **Image Optimization:** Next.js Image
- **State Management:** React Hooks
- **Icons:** Material-UI Icons
- **Editor:** CKEditor (for content creation)

## 📁 Project Structure

```
researchersdotme/
├── public/                 # Static assets
├── src/
│   ├── pages/
│   │   ├── api/           # API routes (mock backend)
│   │   ├── blogs/         # Blog pages
│   │   ├── services/      # Service pages
│   │   ├── contact/       # Contact page
│   │   ├── about/         # About page
│   │   ├── cases/         # Case studies
│   │   └── _app.js        # App wrapper
│   ├── Common/            # Shared components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── CardMenu/
│   ├── components/        # Page-specific components
│   ├── constants/         # Static data
│   └── globals.css        # Global styles
├── API_DOCUMENTATION.md   # API reference
├── CHANGES.md            # Change log
└── README.md             # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/St-Imran/researchersdotme.git
cd researchersdotme
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔌 API Endpoints

The project includes a complete mock API backend. See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed information.

### Available Endpoints:

- `GET /api/blogs` - Get all blogs
- `GET /api/blog/[slug]` - Get blog details
- `GET /api/services` - Get all services
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/testimonials` - Get testimonials
- `GET /api/case-studies` - Get case studies

## 🗄️ MongoDB Migration

The project is ready for MongoDB integration. Follow these steps:

1. **Install MongoDB dependencies:**

```bash
npm install mongodb mongoose
```

2. **Create `.env.local`:**

```env
MONGODB_URI=your_mongodb_connection_string
```

3. **Update API routes:**
   Replace mock data with MongoDB queries (see API_DOCUMENTATION.md)

## 🎨 Customization

### Updating Colors

Main colors are defined in CSS modules. Update the gradient:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding Blog Posts

Currently uses mock data in `/api/blogs.js`. When MongoDB is connected, add blogs through your admin interface.

### Modifying Services

Update service data in `/api/services.js` or through MongoDB once connected.

## 📱 Pages

- **Home** (`/`) - Landing page with hero section
- **Services** (`/services`) - Service listing with categories
- **Service Detail** (`/services/innerPages/[page]`) - Dynamic service pages
- **Blogs** (`/blogs`) - Blog listing with filtering
- **Blog Detail** (`/blogs/[slug]`) - Individual blog pages
- **About** (`/about`) - About the company
- **Contact** (`/contact`) - Contact form
- **Case Studies** (`/cases`) - Success stories
- **News** (`/news`) - News and reports

## 🔧 Configuration

### Next.js Config

Basic configuration in `next.config.mjs`. Extend as needed:

```javascript
const nextConfig = {
  // Add your custom config here
  images: {
    domains: ["yourdomain.com"],
  },
};
```

### Bootstrap

Imported globally in `_app.js`. Customize in your CSS modules.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
npm run start
```

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Change Log](./CHANGES.md) - Recent updates and fixes
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

This is a private project for Researchers.me. For internal contributors:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Contact & Support

- **Website:** [researchers.me](https://researchers.me)
- **Email:** Info@researchers.me
- **WhatsApp:** +91 9999888676
- **Location:** UAE & MENA Region

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the component library
- Bootstrap for the CSS framework

---

**Version:** 1.0.0  
**Last Updated:** November 26, 2025  
**Repository:** [github.com/St-Imran/researchersdotme](https://github.com/St-Imran/researchersdotme)  
**Branch:** december-changes
