import React, { useCallback, useState } from 'react'
import styles from './InputLabel.module.scss'

interface Props {
  text: string
  onSubmit: (data: string) => void
}

export const InputLabel: React.FC<Props> = ({ onSubmit, text }) => {
  const [isInput, setIsInput] = useState(false)

  const stopBubbles = (e: React.MouseEvent) => {
    e.preventDefault()
  }
  const openInput = (e: React.MouseEvent) => {
    stopBubbles(e)
    setIsInput(true)
  }
  const handleSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return

      onSubmit(e.currentTarget.value.trim())
      setIsInput(false)
    },
    [onSubmit]
  )

  return (
    <>
      {isInput ? (
        <input
          className={styles.input}
          defaultValue={text}
          onClick={stopBubbles}
          onKeyUp={handleSubmit}
        />
      ) : (
        <span onClick={openInput}>{text}</span>
      )}
    </>
  )
}
