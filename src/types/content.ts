import { File } from './file'
import { Folder } from './folder'

export type ContentType = 'folder' | 'file'

export type Content = Folder | File
