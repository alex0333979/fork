import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { countries } from '@/lib/utils/countries';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = [];
  for (const c of countries) {
    const countryName = c.country.toLowerCase().replace(/\s/g, '-');
    fields.push({
      loc: `https://passportphotos.com/${countryName}/`,
      lastmod: new Date().toISOString()
    });
    fields.push({
      loc: `https://passportphotos.com/${countryName}/passport/`,
      lastmod: new Date().toISOString()
    });
    fields.push({
      loc: `https://passportphotos.com/${countryName}/visa/`,
      lastmod: new Date().toISOString()
    });
  }
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
