import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './PopoverMenu.module.scss'

interface Props {
  open: boolean
  items?: []
  anchor: HTMLElement | null
  closeHandler: () => void
}

export const PopoverMenu: React.FC<Props> = ({
  open,
  items,
  anchor,
  closeHandler,
}) => {
  const coords = useMemo(() => anchor?.getBoundingClientRect(), [anchor])

  useEffect(() => {
    if (open) {
      // TODO: Why does it fires immediately?
      window.addEventListener('click', () => {
        console.log('clicked')
        closeHandler()
      })
      return
    }

    window.removeEventListener('click', () => {
      console.log('clicked')
      closeHandler()
    })
  }, [closeHandler, open])

  return (
    <>
      {open &&
        createPortal(
          <div
            className={styles.popover}
            style={{ top: coords?.y || 0, left: coords?.x || 0 }}
          >
            kek
          </div>,
          document.body
        )}
    </>
  )
}
