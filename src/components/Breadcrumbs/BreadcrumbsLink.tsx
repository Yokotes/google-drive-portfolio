import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { RightArrow, DownArrow } from './icons'
import { BreadcrumbsMenu } from './BreadcrumbsMenu'

interface Props {
  id: string
  title: string
  url: string
  last?: boolean
}

export const BreadcrumbsLink: React.FC<Props> = ({ id, title, url, last }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleOpenMenuClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      setOpenMenu(true)
    },
    []
  )

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  // TODO: Works really bad. FIX!!!
  useEffect(() => {
    const button = buttonRef.current

    button?.addEventListener('blur', handleCloseMenu)

    return () => {
      button?.removeEventListener('blur', handleCloseMenu)
    }
  }, [handleCloseMenu])

  return (
    <>
      <span className={styles.linkContainer}>
        <Link className={styles.link} to={url}>
          {title}
          {last && (
            <button
              className={styles.openMenuButton}
              onClick={handleOpenMenuClick}
              ref={buttonRef}
            >
              <DownArrow />
            </button>
          )}
        </Link>
        {!last && <RightArrow />}
      </span>
      <BreadcrumbsMenu
        folderId={id}
        open={openMenu}
        anchor={buttonRef.current}
      />
    </>
  )
}
