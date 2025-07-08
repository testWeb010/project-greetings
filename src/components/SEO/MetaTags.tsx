import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const MetaTags = ({
  title = 'HomeDaze - Find Your Dream Home',
  description = 'Premium real estate platform offering verified properties and seamless rental experience.',
  keywords = 'real estate, property rental, homes, apartments, housing, accommodation, verified properties',
  image = 'https://thehomedaze.com/og-image.jpg',
  url = 'https://thehomedaze.com',
  type = 'website',
  noIndex = false
}: MetaTagsProps) => {
  const fullTitle = title.includes('HomeDaze') ? title : `${title} | HomeDaze`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="HomeDaze" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="HomeDaze" />
      <meta name="theme-color" content="#3B82F6" />
    </Helmet>
  );
};

export default MetaTags;