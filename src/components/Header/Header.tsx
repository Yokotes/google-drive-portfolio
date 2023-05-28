import { Breadcrumbs } from 'components/Breadcrumbs'
import React from 'react'
import { useParams } from 'react-router-dom'

export const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <Breadcrumbs folderId={id || 'main'} />
    </div>
  )
}
