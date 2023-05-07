import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.scss'
import { OpenMenuIcon } from './icons'
import { InputLabel, PopoverMenu } from 'components'

const ICONS = {
  docx: '/images/doc.png',
  xlsx: '/images/excel.png',
  folder: '/images/folder.png',
}

type MenuType = React.ComponentType<
  Omit<React.ComponentProps<typeof PopoverMenu>, 'items'> & { id: string }
>

interface Props {
  id: string
  title: string
  icon: keyof typeof ICONS
  url: string
  onRename: (name: string) => void
  Menu?: MenuType
}

export const SectionItem: React.FC<Props> = ({
  id,
  title,
  icon,
  url,
  Menu,
  onRename,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleOpenMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMenuIsOpen(true)
  }

  const handleCloseMenu = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    setMenuIsOpen(false)
  }, [])

  return (
    <Link to={url} className={styles.item}>
      <span className={styles.main}>
        <img src={ICONS[icon]} alt="Section Icon" className={styles.icon} />
        <InputLabel onSubmit={onRename} text={title} />
      </span>

      <button
        ref={buttonRef}
        className={styles.openMenuButton}
        onClick={handleOpenMenuClick}
      >
        <OpenMenuIcon />
      </button>
      {Menu && (
        <Menu
          id={id}
          open={menuIsOpen}
          anchor={buttonRef.current}
          closeHandler={handleCloseMenu}
        />
      )}
    </Link>
  )
}
