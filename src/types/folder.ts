import { Content } from './common'

export interface Folder {
  id: string
  url: string
  name: string
  content: Content[]
}
