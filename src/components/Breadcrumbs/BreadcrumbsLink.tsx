import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { RightArrow, DownArrow } from './icons'

interface Props {
  title: string
  url: string
  last?: boolean
}

export const BreadcrumbsLink: React.FC<Props> = ({ title, url, last }) => {
  const handleOpenMenuClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.bubbles = false
      console.log('clicked')
    },
    []
  )

  return (
    <span className={styles.linkContainer}>
      <Link className={styles.link} to={url}>
        {title}
        {last && (
          <button
            className={styles.openMenuButton}
            onClick={handleOpenMenuClick}
          >
            <DownArrow />
          </button>
        )}
      </Link>
      {!last && <RightArrow />}
    </span>
  )
}
