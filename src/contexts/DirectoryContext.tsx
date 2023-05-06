import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { File, FileExtension, Folder } from 'types'
import { generateId } from 'utils'

interface CreateFolder {
  (name: string, parent: string): void
}

interface CreateFile {
  (name: string, parent: string, extension: FileExtension): void
}

type FoldersMap = Record<string, Folder>
type FilesMap = Record<string, File>

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
  // TODO: Rewrite to useReducer
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

  const renameFolder = useCallback((newName: string, id: string) => {
    return null
  }, [])

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
        // TODO: Come up how to fix it without this statement
        if (parentFolder.files.includes(id)) return prev

        parentFolder.files.push(id)

        return { ...prev, [parent]: parentFolder }
      })
    },
    [foldersMap]
  )

  useEffect(() => {
    renameFolder('lol', 'test')
  }, [renameFolder])

  return (
    <DirectoryContext.Provider
      value={{ foldersMap, filesMap, createFolder, createFile }}
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
