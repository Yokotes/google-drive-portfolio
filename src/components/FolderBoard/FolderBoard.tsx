import React from 'react'
import styles from './FolderBoard.module.scss'
import { Header, Section } from 'components'
import { useDirectoryContext } from 'contexts'
import { useParams } from 'react-router-dom'

export const FolderBoard: React.FC = () => {
  const { createFolder, foldersMap } = useDirectoryContext()
  const { id } = useParams<{ id: string }>()
  const folder = foldersMap[id || 'main']
  const folders = Object.values(folder.content.folders)
  const files = Object.values(folder.content.files)

  const handleAddFolder = () => {
    createFolder('test', folder.id)
  }

  return (
    <div className={styles.board}>
      <div className={styles.content}>
        <Header />
        {folders.length > 0 && <Section title="Folders" items={folders} />}
        {files.length > 0 && <Section title="Files" items={files} />}
        <button onClick={handleAddFolder}>Add folder</button>
      </div>
    </div>
  )
}
