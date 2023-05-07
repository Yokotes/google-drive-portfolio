import { PopoverMenu } from 'components/PopoverMenu'
import { useDirectoryContext } from 'contexts'
import React from 'react'
import { Anchor, PopoverMenuItem } from 'types'

interface Props {
  id: string
  anchor: Anchor
  open: boolean
  closeHandler: (e: React.SyntheticEvent) => void
}

export const FolderMenu: React.FC<Props> = ({
  id,
  anchor,
  open,
  closeHandler,
}) => {
  const { removeFolder } = useDirectoryContext()
  const items: PopoverMenuItem[] = [
    { id: '1', text: 'Remove', onClick: () => removeFolder(id) },
  ]

  return (
    <PopoverMenu
      anchor={anchor}
      open={open}
      closeHandler={closeHandler}
      items={items}
    />
  )
}
