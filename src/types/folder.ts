import { File } from './file'

export interface Folder {
  id: string
  name: string
  parent: string | null
  content: {
    folders: Record<string, Folder>
    files: Record<string, File>
  }
}
