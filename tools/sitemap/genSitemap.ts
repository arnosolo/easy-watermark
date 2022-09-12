import { generateLink, generateSitemap, links, locales } from './base';

const sitemapFileName = 'sitemap.xml';

async function main() {
    links.push({ ...generateLink('', 0.8), changefreq: 'monthly' });

    const countryCodes = locales.map((locale) => locale.countryCode)

    countryCodes.forEach((locale: string) => {
        links.push(generateLink(locale, 0.7));
    });

    generateSitemap(sitemapFileName);
}

main();
