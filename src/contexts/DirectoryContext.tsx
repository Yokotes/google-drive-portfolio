import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { File, FileExtension, Folder } from 'types'
import { generateId } from 'utils'

/**
 * addFolder(folderConfig)
 * addFile(fileConfig)
 *
 *  folderConfig: {
 *    name: 'main'
 *    parent: 123456
 *  }
 *
 *  fileConfig: {
 *    name: 'kek',
 *    extension: 'docx'
 *  }
 */

interface CreateFolder {
  (name: string, parent: string): void
}

interface CreateFile {
  (name: string, parent: string, extension: FileExtension): void
}

type FoldersMap = Record<string, Folder>

const DEFAULT_FOLDERS: FoldersMap = {
  main: {
    id: 'main',
    name: 'My Drive',
    parent: null,
    content: {
      folders: {
        test: {
          id: 'test',
          name: 'Test Folder',
          parent: 'main',
          content: { files: {}, folders: {} },
        },
      },
      files: {
        test: {
          id: 'test',
          name: 'Doc File',
          parent: 'main',
          extension: 'docx',
        },
      },
    },
  },
  test: {
    id: 'test',
    name: 'Test Folder',
    parent: 'main',
    content: { files: {}, folders: {} },
  },
}

interface DirectoryContextValue {
  foldersMap: Record<string, Folder>
  createFolder: CreateFolder
  createFile: CreateFile
}

const DirectoryContext = React.createContext<DirectoryContextValue | null>(null)

export const DirectoryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // TODO: Rewrite to useReducer
  const [foldersMap, setFoldersMap] = useState(DEFAULT_FOLDERS)

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
        content: { files: {}, folders: {} },
      } as Folder
      setFoldersMap((prev) => ({
        // TODO: Refactor this hell
        ...prev,
        [parent]: {
          ...prev[parent],
          content: {
            ...prev[parent].content,
            folders: {
              ...prev[parent].content.folders,
              [id]: folder,
            },
          },
        },
        [id]: folder,
      }))
    },
    [foldersMap]
  )

  const renameFolder = useCallback((newName: string, id: string) => {
    setFoldersMap((prev) => ({ ...prev, [id]: { ...prev[id], name: newName } }))
  }, [])

  const createFile: CreateFile = useCallback(
    (name, parent, extension) => {
      if (!foldersMap[parent])
        throw new Error(`Folder ${parent} doesn't exist!`)

      const id = generateId('file_' + name)
      const file = {
        id,
        name,
        extension,
        parent,
      } as File

      setFoldersMap((prev) => ({
        // Come up with this monster
        ...prev,
        [parent]: {
          ...prev[parent],
          content: {
            ...prev[parent].content,
            files: {
              ...prev[parent].content.files,
              [id]: file,
            },
          },
        },
      }))
    },
    [foldersMap]
  )

  useEffect(() => {
    renameFolder('lol', 'test')
  }, [renameFolder])

  return (
    <DirectoryContext.Provider value={{ foldersMap, createFolder, createFile }}>
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
