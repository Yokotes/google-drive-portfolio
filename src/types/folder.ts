export interface Folder {
  id: string
  name: string
  parent: string | null
  files: string[]
  folders: string[]
}
