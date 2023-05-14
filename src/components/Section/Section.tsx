import React, { useCallback, useState } from 'react'
import styles from './Section.module.scss'
import { Content, PopoverMenuItem } from 'types'
import { PopoverMenu } from 'components/PopoverMenu'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

interface RenderChildren {
  (item: Content): JSX.Element
}

interface Props {
  title: string
  items: Content[]
  renderChildren: RenderChildren
  onSortItems: (data: string[]) => void
  menuItems?: PopoverMenuItem[]
}

// TODO: Split component to separate components for folder and files, because too much checks
export const Section: React.FC<Props> = ({
  title,
  items,
  renderChildren,
  onSortItems,
  menuItems,
}) => {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleSectionContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  const clearCursorPos = useCallback(() => setCursorPos(null), [])

  const handleDragEnd = (event: DragOverEvent) => {
    const { active, over } = event
    const ids = items.map((item) => item.id)

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id.toString())
      const newIndex = ids.indexOf(over.id.toString())

      const data = arrayMove(ids, oldIndex, newIndex)
      onSortItems(data)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items}>
        <div className={styles.section}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
          </div>
          <div
            className={styles.content}
            onContextMenu={handleSectionContextMenu}
          >
            {items.map(renderChildren)}
          </div>
        </div>
        {menuItems && menuItems.length && (
          <PopoverMenu
            open={!!cursorPos}
            closeHandler={clearCursorPos}
            anchor={cursorPos}
            items={menuItems}
          />
        )}
      </SortableContext>
    </DndContext>
  )
}
