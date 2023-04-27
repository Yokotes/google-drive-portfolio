import { FolderBoard } from 'components'
import { useDirectoryContext } from 'contexts'
import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

export const DirectoryRoutes = () => {
  const { foldersMap } = useDirectoryContext()
  const folders = useMemo(() => Object.values(foldersMap), [foldersMap])

  return (
    <Routes>
      {folders.map((item) => (
        <Route
          key={item.id}
          // TODO: Move to function
          path={item.id !== 'main' ? `folder/${item.id}` : '/'}
          element={<FolderBoard folder={item} />}
        />
      ))}
    </Routes>
  )
}
