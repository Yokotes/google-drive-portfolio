import React, { useCallback, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { RightArrow, DownArrow } from './icons'
import { BreadcrumbsMenu } from './BreadcrumbsMenu'

interface Props {
  id: string
  title: string
  url: string
}

export const BreadcrumbsLink: React.FC<Props> = ({ id, title, url }) => {
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

  const renderArrow = useCallback(
    (active: boolean) =>
      active ? (
        <button
          className={styles.openMenuButton}
          onClick={handleOpenMenuClick}
          ref={buttonRef}
        >
          <DownArrow />
        </button>
      ) : (
        <RightArrow />
      ),
    [handleOpenMenuClick]
  )
  return (
    <>
      <span className={styles.linkContainer}>
        <NavLink className={styles.link} to={url}>
          {({ isActive }) => (
            <>
              {title}
              {renderArrow(isActive)}
            </>
          )}
        </NavLink>
      </span>
      <BreadcrumbsMenu
        folderId={id}
        open={openMenu}
        anchor={buttonRef.current}
        closeHandler={handleCloseMenu}
      />
    </>
  )
}
