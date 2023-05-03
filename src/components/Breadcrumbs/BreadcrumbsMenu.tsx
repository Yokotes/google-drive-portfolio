import React, { useMemo } from 'react'
import { PopoverMenu } from 'components'
import { Anchor, PopoverMenuItem } from 'types'
import { useDirectoryContext } from 'contexts'

interface Props {
  folderId: string
  open: boolean
  anchor: Anchor
  closeHandler: () => void
}

export const BreadcrumbsMenu: React.FC<Props> = ({
  folderId,
  open,
  anchor,
  closeHandler,
}) => {
  const { createFolder, createFile } = useDirectoryContext()

  const items = useMemo<PopoverMenuItem[]>(
    () => [
      {
        id: '0',
        text: 'New folder',
        onClick: () => {
          createFolder('kek', folderId)
        },
      },
      {
        id: '1',
        text: 'New file',
        onClick: () => {
          createFile('kek', folderId, 'docx')
        },
      },
    ],
    [createFile, createFolder, folderId]
  )

  return (
    <PopoverMenu
      open={open}
      anchor={anchor}
      items={items}
      closeHandler={closeHandler}
    />
  )
}
