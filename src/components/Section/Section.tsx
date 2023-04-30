import React from 'react'
import styles from './Section.module.scss'
import { Content } from 'types'
import { SectionItem } from './SectionItem'
import { isFile, isFolder } from 'utils'

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

interface Props {
  title: string
  items: Content[]
}

export const Section: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        {items.map((item) => (
          <SectionItem
            key={`item_${item.id}`}
            title={item.name}
            icon={getIcon(item)}
            url={getUrl(item)}
          />
        ))}
      </div>
    </div>
  )
}
