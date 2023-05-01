import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { RightArrow, DownArrow } from './icons'
import { PopoverMenu } from 'components'

interface Props {
  title: string
  url: string
  last?: boolean
}

export const BreadcrumbsLink: React.FC<Props> = ({ title, url, last }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const buttonRef = useRef(null)

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
      <PopoverMenu
        open={openMenu}
        anchor={buttonRef.current}
        closeHandler={handleCloseMenu}
      />
    </>
  )
}
