import React, { useCallback } from 'react'
import styles from './Modal.module.scss'
import { createPortal } from 'react-dom'

interface Props {
  title: string
  children: React.ReactNode
  open: boolean
  closeHandler: () => void
}

export const Modal: React.FC<Props> = ({
  children,
  title,
  open,
  closeHandler,
}) => {
  if (!open) return <></>

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  // TODO: It is breaking popover close handler
  return createPortal(
    <div className={styles.container}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button className={styles.closeButton} onClick={closeHandler}>
            X
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}
