import { PopoverMenu } from 'components'

export type PopoverMenuItem = {
  id: string
  text: string
  onClick: () => void
}

export type MenuType = React.ComponentType<
  Omit<React.ComponentProps<typeof PopoverMenu>, 'items'> & { id: string }
>
