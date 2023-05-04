interface CustomPopoverMenuItem {
  id: string
  type: 'custom'
  render: (buttonClassName: string) => JSX.Element
}

interface DefaultPopoverMenuItem {
  id: string
  type: 'default'
  text: string
  onClick: () => void
}

export type PopoverMenuItem = DefaultPopoverMenuItem | CustomPopoverMenuItem
