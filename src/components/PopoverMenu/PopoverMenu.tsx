import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './PopoverMenu.module.scss'
import { Anchor, PopoverMenuItem } from 'types'
import { getCoords } from 'utils'

const renderItem = (item: PopoverMenuItem) => {
  if (item.type === 'custom') return item.render(styles.item)
  if (item.type === 'default')
    return (
      <button key={item.id} className={styles.item} onClick={item.onClick}>
        <span>{item.text}</span>
      </button>
    )
}

interface Props {
  open: boolean
  items?: PopoverMenuItem[]
  anchor: Anchor
  closeHandler: () => void
}

export const PopoverMenu: React.FC<Props> = ({
  open,
  items,
  anchor,
  closeHandler,
}) => {
  const coords = useMemo(() => getCoords(anchor), [anchor])

  return (
    <>
      {open &&
        createPortal(
          <div className={styles.container}>
            <div
              className={styles.popover}
              style={{ top: coords.y, left: coords.x }}
            >
              {items?.map(renderItem)}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
