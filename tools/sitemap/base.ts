import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs-extra';
import chalk from 'chalk';

const domain = 'my-watermark.web.app';
const hostname = `https://${domain}`;
const sitemapFilePath = './public/';
const configPath = 'src/locales/config';

const langMap = Object.fromEntries(
    fs.readdirSync(configPath, { withFileTypes: true }).map((dirent) => {
        const { htmlLanguageCode } = fs.readJSONSync(`${configPath}/${dirent.name}`);
        return [dirent.name.replace('.json', ''), htmlLanguageCode];
    }),
);

export const locales = Object.keys(langMap).map((countryCode) => {
    return {
        countryCode,
        languageCode: langMap[countryCode]
    }
})

// An array sitemap links
export const links: any[] = [];

// Create a stream to write to
const smStream = new SitemapStream({
    hostname,
    xmlns: {
        news: false,
        xhtml: true,
        image: false,
        video: false,
    },
});

const writeStream = (sitemapFileName: string) =>
    fs.createWriteStream(`${sitemapFilePath}${sitemapFileName}`);

export function generateLink(url: string, priority: number) {
    const link = {
        url: `${hostname}/${url}`,
        priority,
        links: [],
    };

    locales.forEach((locale) => {
        const localeLink = {
            lang: locale.languageCode,
            url: `https://${domain}/${locale.countryCode}`,
        };

        link.links.push(localeLink as never);
    });

    return link;
}

export function generateSitemap(sitemapFileName: string) {
    streamToPromise(smStream).then(() => {
        console.log(`${chalk.cyan(`✨ [${sitemapFileName}]`)} - File is generate successfully:`);
        console.log(`${sitemapFilePath + chalk.green(sitemapFileName)}\n`);
    });

    smStream.pipe(writeStream(sitemapFileName));

    links.forEach((link) => {
        smStream.write(link);
    });

    smStream.end();
}
