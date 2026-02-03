import React from "react";
import FixedButton from "../Common/Contact/FixedButton";
import Hero from "./homepage/Hero";
import SEO from "../components/SEO";

const LandingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Researchers.me",
    "description": "Leading market research and business consulting firm in UAE specializing in feasibility studies, market analysis, data analytics, and strategic consulting.",
    "url": "https://researchers.me",
    "logo": "https://researchers.me/logo.png",
    "image": "https://researchers.me/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai"
    },
    "telephone": "+971-56-574-7998",
    "email": "info@researchers.me",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Research & Consulting Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Market Research",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Feasibility Studies"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Market Analysis"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Business Consulting",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Strategic Planning"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Data Analytics",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Intelligence"
              }
            }
          ]
        }
      ]
    },
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

  return (
    <>
      <SEO
        title="Researchers.me - Leading Market Research & Business Consulting in UAE"
        description="Transform your business with data-driven insights. Expert market research, feasibility studies, and strategic consulting services in Dubai, UAE. 500+ projects completed with 98% client satisfaction."
        keywords="market research UAE, business consulting Dubai, feasibility studies UAE, market analysis Dubai, data analytics UAE, business intelligence, strategic consulting, competitive intelligence, UAE research company"
        structuredData={structuredData}
      />
      <FixedButton />
      <Hero />
    </>
  );
};

export default LandingPage;
