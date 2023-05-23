import React, { useCallback } from 'react'
import styles from './InputLabel.module.scss'

interface Props {
  text: string
  isInput: boolean
  onSubmit: (data: string) => void
}

export const InputLabel: React.FC<Props> = ({ onSubmit, text, isInput }) => {
  const handleSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return

      onSubmit(e.currentTarget.value.trim())
    },
    [onSubmit]
  )

  return (
    <>
      {isInput ? (
        <input
          className={styles.input}
          defaultValue={text}
          onKeyUp={handleSubmit}
        />
      ) : (
        <span>{text}</span>
      )}
    </>
  )
}
