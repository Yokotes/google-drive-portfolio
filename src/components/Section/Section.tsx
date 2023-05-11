import React, { useCallback, useState } from 'react'
import styles from './Section.module.scss'
import { Content, ContentType, PopoverMenuItem } from 'types'
import { SectionItem } from './SectionItem'
import { isFile, isFolder } from 'utils'
import { useDirectoryContext } from 'contexts'
import { FolderMenu } from 'components/FolderMenu'
import { FileMenu } from 'components/FileMenu'
import { useParams } from 'react-router-dom'
import { PopoverMenu } from 'components/PopoverMenu'

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

const getItemMenu = (data: Content) => {
  if (isFolder(data)) return FolderMenu
  if (isFile(data)) return FileMenu
}

interface Props {
  title: string
  contentType: ContentType
  items: Content[]
}

export const Section: React.FC<Props> = ({ title, items, contentType }) => {
  const { id } = useParams<{ id: string }>()
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  )
  const { renameFile, renameFolder, createFile, createFolder } =
    useDirectoryContext()

  const getRenameHandler = useCallback(
    (data: Content) => {
      if (isFile(data)) return (name: string) => renameFile(name, data.id)
      if (isFolder(data)) return (name: string) => renameFolder(name, data.id)

      return (name: string) => console.log(name)
    },
    [renameFile, renameFolder]
  )

  const getSectionMenuItems = useCallback(
    (type: ContentType): PopoverMenuItem[] => {
      if (type === 'file')
        return [
          {
            id: '1',
            text: 'New document',
            onClick: () => createFile('New document', id || 'main', 'docx'),
          },
          {
            id: '2',
            text: 'New spreadsheet',
            onClick: () => createFile('New spreadsheet', id || 'main', 'xlsx'),
          },
        ]

      if (type === 'folder')
        return [
          {
            id: '1',
            text: 'New folder',
            onClick: () => createFolder('New folder', id || 'main'),
          },
        ]

      return []
    },
    [createFile, createFolder, id]
  )

  const handleSectionContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  const clearCursorPos = useCallback(() => setCursorPos(null), [])

  return (
    <>
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div
          className={styles.content}
          onContextMenu={handleSectionContextMenu}
        >
          {items.map((item) => (
            <SectionItem
              key={`item_${item.id}`}
              id={item.id}
              title={item.name}
              icon={getIcon(item)}
              url={getUrl(item)}
              onRename={getRenameHandler(item)}
              Menu={getItemMenu(item)}
            />
          ))}
        </div>
      </div>
      <PopoverMenu
        open={!!cursorPos}
        closeHandler={clearCursorPos}
        anchor={cursorPos}
        items={getSectionMenuItems(contentType)}
      />
    </>
  )
}
