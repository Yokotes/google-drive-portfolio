import { useDirectoryContext } from 'contexts'
import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

export const DirectoryRoutes = () => {
  const { foldersMap, createFolder } = useDirectoryContext()
  const folders = useMemo(() => Object.values(foldersMap), [foldersMap])
  console.log(folders)
  return (
    <Routes>
      {folders.map((item) => (
        <Route
          key={item.id}
          path={item.id !== 'main' ? `folder/${item.id}` : '/'}
          element={
            <>
              {item.name}{' '}
              <button onClick={() => createFolder('test', 'main')}>
                add folder
              </button>
            </>
          }
        />
      ))}
    </Routes>
  )
}
