import React, { createContext, useMemo, useState } from 'react'
import Link from 'next/link'
import { PrismicLink, PrismicProvider } from '@prismicio/react'
import { PrismicDocument } from '@prismicio/types'

import { linkResolver } from '@/../prismicio'

interface IPrismicContext {
  pageData: PrismicDocument<Record<string, any>, string, string>
  setPageData: (val: PrismicDocument) => void
}

const NextLinkShim = ({ href, locale, children, ...props }: any) => (
  <Link href={href} locale={locale}>
    <a {...props}>{children}</a>
  </Link>
)

const richTextComponents = {
  hyperlink: ({ children, node }: any) => (
    <PrismicLink field={node.data}>{children}</PrismicLink>
  ),
}

export const PrismicContext = createContext<IPrismicContext>({
  pageData: {} as PrismicDocument,
  setPageData: () => undefined,
})

export const PrismicContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [pageData, setPageData] = useState<PrismicDocument>(
    {} as unknown as PrismicDocument,
  )

  const value = useMemo(
    () => ({ pageData, setPageData }),
    [pageData, setPageData],
  )

  return (
    <PrismicContext.Provider value={value}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={NextLinkShim}
        richTextComponents={richTextComponents}>
        {children}
      </PrismicProvider>
    </PrismicContext.Provider>
  )
}
