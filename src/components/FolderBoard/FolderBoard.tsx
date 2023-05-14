import React from 'react'
import styles from './FolderBoard.module.scss'

import { FileSection } from 'components/FileSection'
import { Header } from 'components/Header'
import { FolderSection } from 'components/FolderSection'

export const FolderBoard: React.FC = () => {
  return (
    <div className={styles.board}>
      <div className={styles.content}>
        <Header />
        <FolderSection />
        <FileSection />
      </div>
    </div>
  )
}
