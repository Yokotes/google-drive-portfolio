import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './PopoverMenu.module.scss'
import { Anchor, PopoverMenuItem } from 'types'
import { getCoords } from 'utils'

interface Props {
  open: boolean
  items?: PopoverMenuItem[]
  anchor: Anchor
}

export const PopoverMenu: React.FC<Props> = ({ open, items, anchor }) => {
  const coords = useMemo(() => getCoords(anchor), [anchor])

  return (
    <>
      {open &&
        createPortal(
          <div
            className={styles.popover}
            style={{ top: coords.y, left: coords.x }}
          >
            {items?.map((item) => (
              <button
                key={item.id}
                className={styles.item}
                onClick={item.onClick}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}
