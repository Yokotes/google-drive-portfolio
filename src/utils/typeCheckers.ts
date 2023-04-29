import { File, Folder } from 'types'

export const isFolder = (content: Folder | File): content is Folder => {
  return Boolean((content as Folder).content)
}

export const isFile = (content: Folder | File): content is File => {
  return Boolean((content as File).extension)
}
