import { PopoverMenu } from 'components/PopoverMenu'
import { useDirectoryContext } from 'contexts'
import React from 'react'
import { Anchor, PopoverMenuItem } from 'types'

interface Props {
  id: string
  anchor: Anchor
  open: boolean
  // TODO: Move to types
  closeHandler: (e: React.SyntheticEvent) => void
}

// TODO: Anchor saves prev position after deleting folders
export const FileMenu: React.FC<Props> = ({
  id,
  anchor,
  open,
  closeHandler,
}) => {
  const { removeFile } = useDirectoryContext()
  const items: PopoverMenuItem[] = [
    { id: '1', text: 'Remove', onClick: () => removeFile(id) },
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
