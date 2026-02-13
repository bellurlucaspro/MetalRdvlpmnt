import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export const SEOHead = ({
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime
}: SEOHeadProps) => {
    const siteUrl = (import.meta.env && import.meta.env.VITE_SITE_URL) ? import.meta.env.VITE_SITE_URL : 'https://metalr.com';
    const safeUrl = url || '';
    const fullUrl = safeUrl.startsWith('http') ? safeUrl : `${siteUrl}${safeUrl}`;

    const safeImage = image || '';
    const fullImage = safeImage ? (safeImage.startsWith('http') ? safeImage : `${siteUrl}${safeImage}`) : `${siteUrl}/og-image.jpg`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title} | METALR</title>
            <meta name="description" content={description} />
            {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="METALR" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Article specific */}
            {type === 'article' && (
                <>
                    {author && <meta property="article:author" content={author} />}
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                </>
            )}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': type === 'article' ? 'Article' : 'WebSite',
                    headline: title,
                    description: description,
                    image: fullImage,
                    url: fullUrl,
                    ...(type === 'article' && {
                        author: {
                            '@type': 'Person',
                            name: author || 'METALR'
                        },
                        datePublished: publishedTime,
                        dateModified: modifiedTime || publishedTime,
                        publisher: {
                            '@type': 'Organization',
                            name: 'METALR',
                            logo: {
                                '@type': 'ImageObject',
                                url: `${siteUrl}/logo.png`
                            }
                        }
                    })
                })}
            </script>
        </Helmet>
    );
};
