import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.scss'
import { OpenMenuIcon } from './icons'
import { InputLabel, PopoverMenu } from 'components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS, Transform } from '@dnd-kit/utilities'
import { PopoverMenuItem } from 'types'

const ICONS = {
  docx: '/images/doc.png',
  xlsx: '/images/excel.png',
  folder: '/images/folder.png',
}

const checkTransform = (transform: Transform | null) => {
  if (!transform) return false

  return transform.x !== 0 && transform.y !== 0
}

interface Props {
  id: string
  title: string
  icon: keyof typeof ICONS
  url: string
  onRename: (name: string) => void
  menuItems?: PopoverMenuItem[]
}

// NOTE: Jeez... there is a lot of logic in this component
export const SectionItem: React.FC<Props> = ({
  id,
  title,
  icon,
  url,
  onRename,
  menuItems = [],
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 })
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isInput, setIsInput] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  const handleChangeInputLabel = useCallback(() => setIsInput(true), [])
  // NOTE: Also not clear decision...
  const handleRename = useCallback(
    (name: string) => {
      onRename(name)
      setIsInput(false)
    },
    [onRename]
  )

  const handleOpenMenuClick = useCallback(() => {
    setMenuIsOpen(true)

    const pos = buttonRef.current?.getBoundingClientRect()

    if (!pos) return
    if (pos.x === buttonPos.x && pos.y === buttonPos.y) return

    setButtonPos({ x: pos.x, y: pos.y })
  }, [buttonPos.x, buttonPos.y])

  const handleCloseMenu = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    setMenuIsOpen(false)
  }, [])

  const isDragging = useMemo(() => checkTransform(transform), [transform])

  const CustomLink = useCallback(
    (props: Record<string, any>) => {
      if (isDragging || isInput) return <span {...props}>{props.children}</span>

      return (
        <Link to={url} {...props}>
          {props.children}
        </Link>
      )
    },
    [isDragging, isInput, url]
  )

  const renameItem: PopoverMenuItem = useMemo(
    () => ({
      id: '1000',
      text: 'Rename',
      onClick: handleChangeInputLabel,
    }),
    [handleChangeInputLabel]
  )

  // NOTE: Pretty bad decisison, because it isn't clear. But I can't come up with a better solution. Maybe I'll fix it.
  const menuNewItems = useMemo(
    () => [...menuItems, renameItem],
    [menuItems, renameItem]
  )

  const sortableListeners = useMemo(
    () => (!isInput ? listeners : {}),
    [isInput, listeners]
  )

  return (
    <div style={style} ref={setNodeRef} className={styles.item}>
      <CustomLink
        className={styles.link}
        {...sortableListeners}
        {...attributes}
      >
        <span className={styles.main}>
          <img src={ICONS[icon]} alt="Section Icon" className={styles.icon} />
          <InputLabel onSubmit={handleRename} text={title} isInput={isInput} />
        </span>
      </CustomLink>
      <button
        ref={buttonRef}
        className={styles.openMenuButton}
        onClick={handleOpenMenuClick}
      >
        <OpenMenuIcon />
      </button>
      <PopoverMenu
        open={menuIsOpen}
        anchor={buttonPos}
        items={menuNewItems}
        closeHandler={handleCloseMenu}
      />
    </div>
  )
}
