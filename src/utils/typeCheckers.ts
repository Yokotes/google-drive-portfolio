import { Anchor, Content, File, Folder } from 'types'

export const isFolder = (content: Content): content is Folder => {
  return Boolean((content as Folder).folders)
}

export const isFile = (content: Content): content is File => {
  return Boolean((content as File).extension)
}

export const isHTMLElement = (anchor: Anchor): anchor is HTMLElement => {
  return !!(anchor as HTMLElement).getBoundingClientRect
}
