import React from 'react'
import { Link } from 'react-router-dom'
import { File, Folder } from 'types'

interface Props {
  // TODO: Move to types
  data: Folder | File
}

export const SectionItem: React.FC<Props> = ({ data }) => {
  // TODO: Temporary. Change later
  return <Link to={`/folder/${data.id}`}>{data.name}</Link>
}
