import React, { useMemo } from 'react'
import { PopoverMenu } from 'components'
import { Anchor, PopoverMenuItem } from 'types'
import { useDirectoryContext } from 'contexts'
import { ButtonModal } from 'components/ButtonModal'

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
        type: 'custom',
        render: (className) => (
          <ButtonModal
            key="createFolderModal"
            buttonContent="New folder"
            modalTitle="Create folder"
            modalContent={<>Folder form</>}
            className={className}
          />
        ),
      },
      {
        id: '1',
        type: 'custom',
        render: (className) => (
          <ButtonModal
            key="createFileModal"
            buttonContent="New file"
            modalTitle="Create file"
            modalContent={<>File form</>}
            className={className}
          />
        ),
      },
    ],
    []
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
