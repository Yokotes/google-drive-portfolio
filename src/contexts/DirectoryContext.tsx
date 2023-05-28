import React, { ReactNode, useCallback, useContext, useState } from 'react'
import {
  CreateFile,
  CreateFolder,
  File,
  FilesMap,
  Folder,
  FoldersMap,
  RemoveFile,
  RemoveFolder,
  RenameFile,
  RenameFolder,
  UpdateChildrenFiles,
  UpdateChildrenFolders,
} from 'types'
import { generateId } from 'utils'

const DEFAULT_FOLDERS: FoldersMap = {
  main: {
    id: 'main',
    name: 'My Drive',
    parent: null,
    folders: ['test'],
    files: ['testFile'],
  },
  test: {
    id: 'test',
    name: 'Test Folder',
    parent: 'main',
    folders: [],
    files: [],
  },
}

const DEFAULT_FILES_MAP: FilesMap = {
  testFile: {
    id: 'testFile',
    name: 'Doc File',
    parent: 'main',
    extension: 'docx',
  },
}

interface DirectoryContextValue {
  foldersMap: FoldersMap
  filesMap: FilesMap
  createFolder: CreateFolder
  createFile: CreateFile
  renameFolder: RenameFolder
  renameFile: RenameFile
  removeFolder: RemoveFolder
  removeFile: RemoveFile
  updateChildrenFiles: UpdateChildrenFiles
  updateChildrenFolders: UpdateChildrenFolders
}

// How data structure does should look like?
// 1. It needs easy to render routes (all folders and files in the same place, array)
// 2. It needs easy to render breadcrumbs (should contain parent field to backtrace)

// Do I need to store folders and files in the same place?
// Yes, I need to prevent extra check when folder contant renders

const DirectoryContext = React.createContext<DirectoryContextValue | null>(null)

export const DirectoryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [foldersMap, setFoldersMap] = useState(DEFAULT_FOLDERS)
  const [filesMap, setFilesMap] = useState(DEFAULT_FILES_MAP)

  const createFolder: CreateFolder = useCallback(
    (name, parent) => {
      if (!foldersMap[parent])
        throw new Error(`Folder ${parent} doesn't exist!`)
      if (name === parent)
        throw new Error(`${name} and ${parent} can't be the same!`)

      const id = generateId(name)
      const folder = {
        id,
        name,
        parent,
        files: [],
        folders: [],
      } as Folder

      setFoldersMap((prev) => {
        const parentFolder = prev[parent]
        parentFolder.folders.push(id)

        return { ...prev, [parent]: parentFolder, [id]: folder }
      })
    },
    [foldersMap]
  )

  const renameFolder: RenameFolder = useCallback(
    (newName, id) => {
      if (!foldersMap[id]) throw new Error(`Folder ${id} doesn't exist!`)

      const folder = foldersMap[id]

      if (folder.name === newName) return

      folder.name = newName

      setFoldersMap((prev) => ({
        ...prev,
        [id]: folder,
      }))
    },
    [foldersMap]
  )

  const renameFile: RenameFile = useCallback(
    (newName, id) => {
      if (!filesMap[id]) throw new Error(`File ${id} doesn't exist!`)

      const file = filesMap[id]

      if (file.name === newName) return

      file.name = newName

      setFilesMap((prev) => ({
        ...prev,
        [id]: file,
      }))
    },
    [filesMap]
  )

  const createFile: CreateFile = useCallback(
    (name, parent, extension) => {
      if (!foldersMap[parent])
        throw new Error(`Folder ${parent} doesn't exist!`)

      const id = generateId('file_')
      const file = {
        id,
        name,
        extension,
        parent,
      } as File

      // Batching will handle this in one render. Thanks, React!
      setFilesMap((prev) => ({ ...prev, [id]: file }))
      setFoldersMap((prev) => {
        const parentFolder = prev[parent]

        // There is an extra invoking this function in strict mode. I don't known why it happens
        if (parentFolder.files.includes(id)) return prev

        parentFolder.files.push(id)

        return { ...prev, [parent]: parentFolder }
      })
    },
    [foldersMap]
  )

  const removeFolder: RemoveFolder = useCallback(
    (id) => {
      if (!foldersMap[id]) throw new Error(`Folder ${id} doesn't exist!`)

      setFoldersMap((prev) => {
        const parent = prev[id].parent

        if (!parent) throw new Error(`Can't remove main folder!`)

        prev[parent].folders = prev[parent].folders.filter(
          (item) => item !== id
        )
        delete prev[id]

        return { ...prev }
      })
    },
    [foldersMap]
  )

  const removeFile: RemoveFile = useCallback(
    (id) => {
      if (!filesMap[id]) throw new Error(`File ${id} doesn't exist!`)

      const parent = filesMap[id].parent

      setFilesMap((prev) => {
        delete prev[id]
        return { ...prev }
      })

      setFoldersMap((prev) => {
        prev[parent].files = prev[parent].files.filter((item) => item !== id)
        return { ...prev }
      })
    },
    [filesMap]
  )

  const updateChildrenFolders: UpdateChildrenFolders = useCallback(
    (id, folders) => {
      if (!foldersMap[id]) throw new Error(`Folder ${id} doesn't exist!`)

      setFoldersMap((prev) => ({ ...prev, [id]: { ...prev[id], folders } }))
    },
    [foldersMap]
  )

  const updateChildrenFiles: UpdateChildrenFiles = useCallback(
    (id, files) => {
      if (!foldersMap[id]) throw new Error(`Folder ${id} doesn't exist!`)

      setFoldersMap((prev) => ({ ...prev, [id]: { ...prev[id], files } }))
    },
    [foldersMap]
  )

  return (
    <DirectoryContext.Provider
      value={{
        foldersMap,
        filesMap,
        createFolder,
        createFile,
        renameFolder,
        renameFile,
        removeFolder,
        removeFile,
        updateChildrenFiles,
        updateChildrenFolders,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  )
}

export const useDirectoryContext = () => {
  const context = useContext(DirectoryContext)

  if (!context) {
    throw new Error('Using useFolderContext ouside the FolderContextProvider!')
  }

  return context
}
