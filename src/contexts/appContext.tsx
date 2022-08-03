import React, { createContext, ReactNode, useState } from 'react'
interface IContextProps {
  openDocument: boolean
  setOpenDocument: (open?: boolean) => void
}

export const AppContext = createContext<IContextProps>({
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
