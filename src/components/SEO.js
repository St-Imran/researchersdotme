import Head from 'next/head';

export default function SEO({
  title = 'Researchers.me - Market Research & Business Consulting in UAE',
  description = 'Leading market research and business consulting firm in UAE. We provide data-driven insights, feasibility studies, market analysis, and strategic consulting services for business growth.',
  keywords = 'market research UAE, business consulting Dubai, feasibility studies, data analytics, business intelligence, strategic consulting, market analysis, UAE research firm',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
  structuredData
}) {
  const siteUrl = 'https://researchers.me';
  const canonicalUrl = canonical || siteUrl;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Researchers.me",
    "description": "Leading market research and business consulting firm delivering data-driven insights for strategic growth across the UAE and beyond.",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "image": `${siteUrl}${ogImage}`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai"
    },
    "telephone": "+971-56-574-7998",
    "email": "info@researchers.me",
    "priceRange": "$$",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "geoRadius": "500000"
    },
    "sameAs": [
      "https://www.facebook.com/ResearchersMe/",
      "https://www.instagram.com/researchers.me/",
      "https://twitter.com/researchers_me",
      "https://www.linkedin.com/company/researchers-me/"
    ]
  };

  const combinedStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Researchers.me" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Researchers.me" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:site" content="@researchers_me" />
      <meta name="twitter:creator" content="@researchers_me" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0070f3" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedStructuredData)
        }}
      />
    </Head>
  );
}
