import { FolderBoard } from 'components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const DirectoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FolderBoard />} />
      <Route path="/folder/:id" element={<FolderBoard />} />
    </Routes>
  )
}
