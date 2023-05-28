import { Anchor } from 'types'
import { isHTMLElement } from './typeCheckers'

export const getCoords = (anchor: Anchor) => {
  if (!anchor) return { x: 0, y: 0 }
  if (isHTMLElement(anchor)) {
    const { x, y } = anchor.getBoundingClientRect()
    return { x, y }
  }

  return anchor
}
