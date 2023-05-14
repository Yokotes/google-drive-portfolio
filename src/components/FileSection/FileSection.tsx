import { FileMenu } from 'components/FileMenu'
import { Section, SectionItem } from 'components/Section'
import {} from 'components/Section/SectionItem'
import { useDirectoryContext } from 'contexts'
import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Content, File } from 'types'

export const FileSection: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { renameFile, createFile, foldersMap, filesMap, updateChildrenFiles } =
    useDirectoryContext()
  const currentFolder = foldersMap[id || 'main']
  const files = currentFolder.files.map((file) => filesMap[file])

  const handleSortFiles = useCallback(
    (data: string[]) => updateChildrenFiles(id || 'main', data),
    [id, updateChildrenFiles]
  )

  const menuItems = useMemo(
    () => [
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
    ],
    [createFile, id]
  )

  const renderChildren = useCallback(
    (item: Content) => {
      return (
        <SectionItem
          key={`item_${item.id}`}
          id={item.id}
          title={item.name}
          icon={(item as File).extension}
          url={`/file/${item.id}`}
          onRename={(name: string) => renameFile(name, item.id)}
          Menu={FileMenu}
        />
      )
    },
    [renameFile]
  )

  if (files.length < 1) return null

  return (
    <Section
      title="Files"
      renderChildren={renderChildren}
      items={files}
      onSortItems={handleSortFiles}
      menuItems={menuItems}
    />
  )
}
