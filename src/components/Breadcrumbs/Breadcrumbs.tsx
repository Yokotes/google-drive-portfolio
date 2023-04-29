import { useDirectoryContext } from 'contexts'
import React, { useMemo } from 'react'
import { Folder } from 'types'
import { BreadcrumbsLink } from './BreadcrumbsLink'
import styles from './Breadcrumbs.module.scss'

interface Props {
  folderId: string
}

// TODO: Maybe move to utils
const getFoldersChain = (id: string, foldersMap: Record<string, Folder>) => {
  let currentFolder = foldersMap[id] as Folder | null
  const result = [] as Folder[]

  while (currentFolder) {
    result.unshift(currentFolder)

    currentFolder = currentFolder.parent
      ? foldersMap[currentFolder.parent]
      : null
  }

  return result
}

export const Breadcrumbs: React.FC<Props> = ({ folderId }) => {
  const { foldersMap } = useDirectoryContext()
  const folders = useMemo(
    () => getFoldersChain(folderId, foldersMap),
    [foldersMap, folderId]
  )

  return (
    <div className={styles.container}>
      {folders.map((folder, index, arr) => (
        <BreadcrumbsLink
          key={`link_${folder.id}`}
          title={folder.name}
          url={folder.id === 'main' ? '/' : `/folder/${folder.id}`}
          last={index === arr.length - 1}
        />
      ))}
    </div>
  )
}
