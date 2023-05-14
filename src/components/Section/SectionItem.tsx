import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.scss'
import { OpenMenuIcon } from './icons'
import { InputLabel, PopoverMenu } from 'components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 })
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  // TODO: Try to get rid of state
  const [isDragStarted, setIsDragStarted] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleOpenMenuClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setMenuIsOpen(true)

      const pos = buttonRef.current?.getBoundingClientRect()

      if (!pos) return
      if (pos.x === buttonPos.x && pos.y === buttonPos.y) return

      setButtonPos({ x: pos.x, y: pos.y })
    },
    [buttonPos.x, buttonPos.y]
  )

  const handleCloseMenu = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    setMenuIsOpen(false)
  }, [])

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      setIsDragStarted(true)
      listeners?.onDragStart(e)
    },
    [listeners]
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      setIsDragStarted(false)
      listeners?.onDragEnd(e)
    },
    [listeners]
  )

  const CustomLink = ({ children }: { children: React.ReactNode }) => {
    if (isDragStarted) {
      return <span className={styles.item}>{children}</span>
    }

    // TODO: Fix link. Now it's broken and I don't know why
    return (
      <Link to={url} className={styles.item}>
        {children}
      </Link>
    )
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CustomLink>
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
      </CustomLink>
      {Menu && (
        <Menu
          id={id}
          open={menuIsOpen}
          anchor={buttonPos}
          closeHandler={handleCloseMenu}
        />
      )}
    </div>
  )
}
