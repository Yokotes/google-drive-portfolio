import { File, FileExtension } from './file'
import { Folder } from './folder'

export interface CreateFolder {
  (name: string, parent: string): void
}

export interface CreateFile {
  (name: string, parent: string, extension: FileExtension): void
}

export interface RenameFolder {
  (newName: string, id: string): void
}

export interface RenameFile {
  (newName: string, id: string): void
}

export interface RemoveFolder {
  (id: string): void
}

export interface RemoveFile {
  (id: string): void
}

export interface UpdateChildrenFiles {
  (id: string, files: string[]): void
}

export interface UpdateChildrenFolders {
  (id: string, folders: string[]): void
}

export type FoldersMap = Record<string, Folder>
export type FilesMap = Record<string, File>
