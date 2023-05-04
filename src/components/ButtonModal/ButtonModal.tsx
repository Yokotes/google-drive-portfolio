import { Modal } from 'components/Modal'
import React, { useCallback, useState } from 'react'

interface Props {
  buttonContent: string
  modalTitle: string
  modalContent: JSX.Element
  className?: string
}

export const ButtonModal: React.FC<Props> = ({
  modalContent,
  className,
  modalTitle,
  buttonContent,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = useCallback(() => setIsOpen(false), [])
  const handleOpen = useCallback(() => setIsOpen(true), [])

  return (
    <>
      <button className={className} onClick={handleOpen}>
        {buttonContent}
      </button>
      <Modal closeHandler={handleClose} title={modalTitle} open={isOpen}>
        {modalContent}
      </Modal>
    </>
  )
}
