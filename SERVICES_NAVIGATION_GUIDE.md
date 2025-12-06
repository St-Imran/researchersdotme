# Services Page Navigation Guide

## How to Use the New Hierarchical Navigation

### Overview

The services page now supports 3-level hierarchical navigation that matches the structure in the sidebar. You can drill down from main categories to subcategories to individual services.

---

## Step-by-Step Navigation

### 1. **View All Services** (Default State)

When you first load the page:

- All services are displayed
- Main Categories filter shows "All" selected
- You'll see service cards from all categories

### 2. **Filter by Main Category**

Click any main category button:

- **Market Research Services**
- **Business Consulting Services**
- **Analytics & Data Services**
- **Experience & Operational Research**
- **Market Entry & Expansion Advisory**

**What happens:**

- A "Subcategories" section appears below Main Categories
- Service cards are filtered to show only services from that main category
- Breadcrumb appears: `All Services / [Selected Category]`

### 3. **Filter by Subcategory**

After selecting a main category, click a subcategory:

**Example: Business Consulting Services → Strategy & Advisory**

- "Strategy & Advisory"
- "Marketing Consulting"
- "Innovation & Transformation"

**What happens:**

- A "Services" section appears (for sub-subcategories)
- Service cards are further filtered
- Breadcrumb updates: `All Services / Business Consulting Services / Strategy & Advisory`

### 4. **Filter by Specific Service** (Sub-subcategory)

After selecting a subcategory, click a specific service:

**Example: Strategy & Advisory → Business Growth Advisory**

- "Business Growth Advisory"
- "Go-To-Market Strategy"
- "Entry-Level Marketing Plans"
- "Strategic Initiative Tracking"
- "Scenario Planning & What-if Analysis"
- "Feasibility Studies"
- "Profitability & Cost Analysis"
- "Revenue & Margin Insights"
- "Corporate Social Responsibility (CSR) & Green Initiatives"

**What happens:**

- Only that specific service is displayed
- Breadcrumb shows full path: `All Services / Business Consulting Services / Strategy & Advisory`

---

## Understanding Service Cards

Each service card displays:

### Card Header (Colored Gradient)

- **Badge**: "Specialized Service" or "Service Category"
  - Specialized Service = 3rd level (most specific)
  - Service Category = 2nd level
- **Title**: Name of the service
- **Heading**: Descriptive tagline (if available)

### Card Content (White Background)

- **Category Path**: Pills showing the hierarchy
  - Example: `Market Research Services › Brand Research › Brand Awareness & Health Tracking`
  - Click to understand the service's position in hierarchy
- **Description**: Details about the service
- **Learn More →** link (if page available)

---

## Search Functionality

The search bar at the top works across all levels:

- Type to search service titles, descriptions, or headings
- Search works independently of category filters
- Combine search with category selection for precise results

---

## Breadcrumb Navigation

Breadcrumbs appear at the top once you select a category:

```
All Services / Business Consulting Services / Strategy & Advisory
     ↑                      ↑                          ↑
  Click to          Click to return           Current selection
 see all         to main category
```

**Usage:**

- Click any breadcrumb to jump back to that level
- All child selections are automatically cleared

---

## Filter Reset Behavior

### Clicking a Main Category:

- Resets subcategory selection
- Resets sub-subcategory selection
- Shows all services in that main category

### Clicking a Subcategory:

- Keeps main category selection
- Resets sub-subcategory selection
- Shows all services in that subcategory

### Clicking "All" in any filter section:

- Shows all items at that level and below

---

## Visual Indicators

### Color Coding

Service cards use rotating gradient colors:

1. Purple gradient (#667eea → #764ba2)
2. Pink gradient (#f093fb → #f5576c)
3. Blue gradient (#4facfe → #00f2fe)
4. Green gradient (#43e97b → #38f9d7)

### Hover Effects

- Filter buttons: Rise up with shadow
- Service cards: Rise up with enhanced shadow
- Breadcrumbs: Light purple background
- Learn More links: Arrow moves right

---

## Example Navigation Flows

### Flow 1: Find a Specific Service

1. Click "Business Consulting Services" (main category)
2. Click "Strategy & Advisory" (subcategory)
3. Click "Feasibility Studies" (specific service)
4. View the service card details
5. Click "Learn More →" to visit the detail page

### Flow 2: Explore All Marketing Services

1. Click "Business Consulting Services"
2. Click "Marketing Consulting"
3. View all 5 marketing services:
   - Marketing Strategy & Execution
   - Digital Strategy Consulting
   - Campaign Evaluation & Optimization
   - Customer Insights Advisory
   - Brand & Market Positioning

### Flow 3: Search and Filter Combined

1. Type "Analytics" in search
2. Click "Analytics & Data Services" to narrow down
3. Click "Data & Insights" subcategory
4. View filtered results matching both search and category

### Flow 4: Quick Category Browse

1. Keep "All" selected in main categories
2. Use search to find service names
3. View category path in each card to understand structure
4. Click breadcrumb to explore related services

---

## Keyboard Navigation Tips

- **Tab**: Navigate between filter buttons
- **Enter/Space**: Activate selected button
- **Escape**: Clear search (if in search input)
- **Tab through cards**: Navigate service cards with keyboard

---

## Mobile Experience

On mobile devices:

- Filter buttons stack vertically for easier tapping
- Service cards take full width
- Breadcrumbs wrap to multiple lines if needed
- All functionality remains the same

---

## Data Structure Reference

The navigation follows this structure from `constants/data.js`:

```
navigationData = [
  {
    title: "Main Category",
    heading: "Category Heading",
    subTitle: "Category Description",
    url: "/link",
    subSections: [
      {
        title: "Subcategory",
        heading: "Subcategory Heading",
        subTitle: "Subcategory Description",
        url: "javascript:void(0)",
        subSections: [
          {
            title: "Specific Service",
            heading: "Service Heading",
            subTitle: "Service Description",
            url: "/service-page"
          }
        ]
      }
    ]
  }
]
```

---

## Troubleshooting

### "No services found" appears

- Check if you have too many filters applied
- Try clicking "All" in filter sections
- Clear the search box
- Reset by clicking "All Services" in breadcrumb

### Filter section not appearing

- Ensure you've selected a parent category first
- Some categories may not have subcategories (only 2-level deep)

### Service card shows no Learn More link

- Some services use `javascript:void(0)` as placeholder URLs
- These services don't have dedicated detail pages yet

---

## Statistics Displayed

The stats section shows:

- **500+** Projects Completed
- **200+** Happy Clients
- **15+** Years Experience
- **98%** Client Satisfaction

---

## Call to Action

At the bottom of the page:

- **Title**: "Ready to Transform Your Business?"
- **Button**: "Get Started" (links to /contact)

---

**Last Updated**: January 26, 2025
**Total Services**: 100+ across all categories
**Navigation Levels**: 3 (Main → Sub → Specialized)
