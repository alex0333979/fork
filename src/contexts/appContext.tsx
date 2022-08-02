import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

interface IContextProps {
  openDocument: boolean
  setOpenDocument: (open?: boolean) => void
}

const AppContext = createContext<IContextProps>({
  openDocument: false,
  setOpenDocument: () => null,
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openDocument, setOpenDocument] = useState<boolean>(false)

  return (
    <AppContext.Provider
      value={{
        openDocument,
        setOpenDocument: (o?: boolean) => setOpenDocument(Boolean(o)),
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): IContextProps => useContext(AppContext)
