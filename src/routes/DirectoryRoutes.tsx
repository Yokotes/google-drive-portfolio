import { useDirectoryContext } from 'contexts'
import React, { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { isFolder } from 'utils'

export const DirectoryRoutes = () => {
  const { content } = useDirectoryContext()
  const folders = useMemo(() => content.filter(isFolder), [content])

  return (
    <Routes>
      {folders.map((item) => (
        <Route key={item.id} path={item.url} element={<>{item.name}</>} />
      ))}
    </Routes>
  )
}
