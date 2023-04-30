import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.scss'
import { OpenMenuIcon } from './icons'

const ICONS = {
  docx: '/images/doc.png',
  xlsx: '/images/excel.png',
  folder: '/images/folder.png',
}

interface Props {
  title: string
  icon: keyof typeof ICONS
  url: string
  menu?: JSX.Element
}

export const SectionItem: React.FC<Props> = ({ title, icon, url, menu }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleOpenMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMenuIsOpen(true)
  }

  return (
    <Link to={url} className={styles.item}>
      <span className={styles.main}>
        <img src={ICONS[icon]} alt="Section Icon" className={styles.icon} />
        <span>{title}</span>
      </span>
      <button className={styles.openMenuButton} onClick={handleOpenMenuClick}>
        <OpenMenuIcon />
      </button>
      {menuIsOpen && menu}
    </Link>
  )
}
