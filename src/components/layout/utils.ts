/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PAGES } from '../../constants'

export const getFaqLink = (path: string): string => {
  const isNonHomePage = Object.keys(PAGES).some(
    // @ts-ignore
    (_pathName) => _pathName !== 'home' && path === PAGES[_pathName],
  )

  return isNonHomePage ? `${PAGES.home}#faq` : '#faq'
}
