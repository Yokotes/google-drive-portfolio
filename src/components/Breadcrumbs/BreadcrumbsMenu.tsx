import React, { useMemo } from 'react'
import { PopoverMenu } from 'components'
import { Anchor, PopoverMenuItem } from 'types'
import { useDirectoryContext } from 'contexts'

interface Props {
  folderId: string
  open: boolean
  anchor: Anchor
}

export const BreadcrumbsMenu: React.FC<Props> = ({
  folderId,
  open,
  anchor,
}) => {
  const { createFolder } = useDirectoryContext()

  const items = useMemo<PopoverMenuItem[]>(
    () => [
      {
        id: '0',
        text: 'Create new folder',
        icon: <>+</>,
        onClick: () => {
          createFolder('kek', folderId)
        },
      },
    ],
    [createFolder, folderId]
  )

  return <PopoverMenu open={open} anchor={anchor} items={items} />
}
