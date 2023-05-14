import { FolderMenu } from 'components/FolderMenu'
import { Section, SectionItem } from 'components/Section'
import { useDirectoryContext } from 'contexts'
import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Content } from 'types'

export const FolderSection: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { renameFolder, createFolder, foldersMap, updateChildrenFolders } =
    useDirectoryContext()
  const currentFolder = useMemo(
    () => foldersMap[id || 'main'],
    [foldersMap, id]
  )
  const folders = useMemo(
    () => currentFolder.folders.map((item) => foldersMap[item]),
    [currentFolder.folders, foldersMap]
  )

  const handleSortFolders = useCallback(
    (data: string[]) => updateChildrenFolders(id || 'main', data),
    [id, updateChildrenFolders]
  )

  const menuItems = useMemo(
    () => [
      {
        id: '1',
        text: 'New folder',
        onClick: () => createFolder('New folder', id || 'main'),
      },
    ],
    [createFolder, id]
  )

  const renderChildren = useCallback(
    (item: Content) => {
      return (
        <SectionItem
          key={`item_${item.id}`}
          id={item.id}
          title={item.name}
          icon="folder"
          url={`/folder/${item.id}`}
          onRename={(name: string) => renameFolder(name, item.id)}
          Menu={FolderMenu}
        />
      )
    },
    [renameFolder]
  )

  if (folders.length < 1) return null

  return (
    <Section
      title="Folders"
      items={folders}
      renderChildren={renderChildren}
      onSortItems={handleSortFolders}
      menuItems={menuItems}
    />
  )
}
