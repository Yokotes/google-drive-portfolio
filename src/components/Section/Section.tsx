import React, { useCallback } from 'react'
import styles from './Section.module.scss'
import { Content } from 'types'
import { SectionItem } from './SectionItem'
import { isFile, isFolder } from 'utils'
import { useDirectoryContext } from 'contexts'
import { FolderMenu } from 'components/FolderMenu'
import { FileMenu } from 'components/FileMenu'

const getIcon = (data: Content) => {
  if (isFolder(data)) return 'folder'
  if (isFile(data)) return data.extension

  // TODO: Add default icon
  return 'folder'
}

const getUrl = (data: Content) => {
  if (isFolder(data)) return `/folder/${data.id}`

  return '/'
}

const getMenu = (data: Content) => {
  if (isFolder(data)) return FolderMenu
  if (isFile(data)) return FileMenu
}

interface Props {
  title: string
  items: Content[]
}

export const Section: React.FC<Props> = ({ title, items }) => {
  const { renameFile, renameFolder } = useDirectoryContext()

  const getRenameHandler = useCallback(
    (data: Content) => {
      if (isFile(data)) return (name: string) => renameFile(name, data.id)
      if (isFolder(data)) return (name: string) => renameFolder(name, data.id)

      return (name: string) => console.log(name)
    },
    [renameFile, renameFolder]
  )

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        {items.map((item) => (
          <SectionItem
            key={`item_${item.id}`}
            id={item.id}
            title={item.name}
            icon={getIcon(item)}
            url={getUrl(item)}
            onRename={getRenameHandler(item)}
            Menu={getMenu(item)}
          />
        ))}
      </div>
    </div>
  )
}
