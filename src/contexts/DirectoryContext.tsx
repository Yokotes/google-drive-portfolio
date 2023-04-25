import React, { ReactNode, useContext } from 'react'
import { Content } from 'types'

interface DirectoryContextValue {
  content: Content[]
}

const DirectoryContext = React.createContext<DirectoryContextValue | null>(null)

export const DirectoryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <DirectoryContext.Provider value={{ content: [] }}>
      {children}
    </DirectoryContext.Provider>
  )
}

export const useDirectoryContext = () => {
  const context = useContext(DirectoryContext)

  if (!context) {
    throw new Error('Using useFolderContext ouside the FolderContextProvider!')
  }

  return context
}
