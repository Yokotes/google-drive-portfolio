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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

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

// TODO: Split component to separate components for folder and files, because too much checks
export const Section: React.FC<Props> = ({ title, items, contentType }) => {
  const { id } = useParams<{ id: string }>()
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  )
  const {
    renameFile,
    renameFolder,
    createFile,
    createFolder,
    updateChildrenFiles,
    updateChildrenFolders,
  } = useDirectoryContext()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getUpdateFunction = (type: ContentType) => {
    if (type === 'file') return updateChildrenFiles
    if (type === 'folder') return updateChildrenFolders

    return () => {
      return null
    }
  }
  const update = getUpdateFunction(contentType)

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

  const handleDragEnd = (event: DragOverEvent) => {
    const { active, over } = event
    const ids = items.map((item) => item.id)

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id.toString())
      const newIndex = ids.indexOf(over.id.toString())

      const data = arrayMove(ids, oldIndex, newIndex)
      update(id || 'main', data)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items}>
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
      </SortableContext>
    </DndContext>
  )
}
