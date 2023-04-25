import React from 'react'
import { DirectoryRoutes } from './routes'
import { DirectoryContextProvider } from 'contexts'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <DirectoryContextProvider>
        <DirectoryRoutes />
      </DirectoryContextProvider>
    </BrowserRouter>
  )
}

export default App
