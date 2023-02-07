import React, { createContext, useMemo, useState } from 'react'
import { PrismicDocument } from '@prismicio/types'

interface IPrismicContext {
  page: PrismicDocument<Record<string, any>, string, string>
  setPage: (val: PrismicDocument) => void
}

export const PrismicContext = createContext<IPrismicContext>({
  page: {} as PrismicDocument,
  setPage: () => undefined,
})

export const PrismicContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [page, setPage] = useState<PrismicDocument>({})

  const value = useMemo(() => ({ page, setPage }), [page, setPage])

  return (
    <PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
  )
}
