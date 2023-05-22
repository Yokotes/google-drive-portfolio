import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.scss'
import { OpenMenuIcon } from './icons'
import { InputLabel, PopoverMenu } from 'components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS, Transform } from '@dnd-kit/utilities'

const ICONS = {
  docx: '/images/doc.png',
  xlsx: '/images/excel.png',
  folder: '/images/folder.png',
}

type MenuType = React.ComponentType<
  Omit<React.ComponentProps<typeof PopoverMenu>, 'items'> & { id: string }
>

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

  const isDragging = useMemo(() => checkTransform(transform), [transform])

  // TODO: Reduce amount of renders, and we got a new problem - renaming stopped working
  const CustomLink = useCallback(
    (props: Record<string, any>) => {
      if (isDragging) return <span {...props}>{props.children}</span>

      return (
        <Link to={url} {...props}>
          {props.children}
        </Link>
      )
    },
    [isDragging, url]
  )

  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <CustomLink className={styles.item}>
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
