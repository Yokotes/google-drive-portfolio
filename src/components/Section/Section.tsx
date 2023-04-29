import React from 'react'
import styles from './Section.module.scss'
import { File, Folder } from 'types'
import { SectionItem } from './SectionItem'

interface Props {
  title: string
  items: (Folder | File)[]
}

export const Section: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        {items.map((item) => (
          <SectionItem key={`item_${item.id}`} data={item} />
        ))}
      </div>
    </div>
  )
}
