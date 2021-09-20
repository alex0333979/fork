import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { COOKIE_ENTRIES } from '@/lib/auth';

export const getSavedEntriesFromCookie = (ctx: GetServerSidePropsContext): string[] => {
  const parsedCookie = cookie.parse(ctx.req.headers.cookie ?? '');
  const strEntries = parsedCookie[COOKIE_ENTRIES];
  return strEntries ? strEntries.split(',') : [];
};
