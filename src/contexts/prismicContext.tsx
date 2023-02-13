import React, { createContext, useMemo, useState } from 'react'
import { PrismicDocument } from '@prismicio/types'

interface IPrismicContext {
  pageData: PrismicDocument<Record<string, any>, string, string>
  setPageData: (val: PrismicDocument) => void
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
    <PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
  )
}
