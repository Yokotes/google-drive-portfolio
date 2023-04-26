export interface File {
  id: string
  name: string
  extension: 'docx' | 'xlsx'
  parent: string | null
}
