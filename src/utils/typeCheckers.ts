import { Content, File, Folder } from 'types'

export const isFolder = (content: Content): content is Folder => {
  return Boolean((content as Folder).content)
}

export const isFile = (content: Content): content is File => {
  return Boolean((content as File).extension)
}
