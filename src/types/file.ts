export type FileExtension = 'docx' | 'xlsx'

export interface File {
  id: string
  name: string
  extension: FileExtension
  parent: string | null
}
