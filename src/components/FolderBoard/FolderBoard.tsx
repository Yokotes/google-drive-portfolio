import React from 'react'
import styles from './FolderBoard.module.scss'
import { Header, Section } from 'components'
import { useDirectoryContext } from 'contexts'
import { useParams } from 'react-router-dom'

export const FolderBoard: React.FC = () => {
  const { foldersMap, filesMap } = useDirectoryContext()
  const { id } = useParams<{ id: string }>()
  const currentFolder = foldersMap[id || 'main']
  const files = currentFolder.files.map((file) => filesMap[file])
  const folders = currentFolder.folders.map((folder) => foldersMap[folder])

  return (
    <div className={styles.board}>
      <div className={styles.content}>
        <Header />
        {folders.length > 0 && <Section title="Folders" items={folders} />}
        {files.length > 0 && <Section title="Files" items={files} />}
      </div>
    </div>
  )
}
