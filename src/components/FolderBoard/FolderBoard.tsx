import React from 'react'
import { Folder } from 'types'
import styles from './FolderBoard.module.scss'

interface Props {
  folder: Folder
}

export const FolderBoard: React.FC<Props> = ({ folder }) => {
  return (
    <div className={styles.board}>
      <div className={styles.content}>{folder.name}</div>
    </div>
  )
}
