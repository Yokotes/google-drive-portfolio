import { Observer, useObserver } from 'hooks'
import React, { ReactNode, useCallback, useContext, useState } from 'react'
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

// main: {
//   id: 'main',
//   name: 'My Drive',
//   parent: null,
//   content: {
//     folders: {
//       test: {
//         id: 'test',
//         name: 'Test Folder',
//         parent: 'main',
//         content: { files: {}, folders: {} },
//       },
//     },
//     files: {
//       test: {
//         id: 'test',
//         name: 'Doc File',
//         parent: 'main',
//         extension: 'docx',
//       },
//     },
//   },
// },
// test: {
//   id: 'test',
//   name: 'Test Folder',
//   parent: 'main',
//   content: { files: {}, folders: {} },
// },

type FolderMap = Record<string, Folder>

const DEFAULT_FOLDERS: FolderMap = {
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
  foldersMap: FolderMap
  foldersMapObserver: Observer<FolderMap>
  createFolder: CreateFolder
  createFile: CreateFile
}

const DirectoryContext = React.createContext<DirectoryContextValue | null>(null)

export const DirectoryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [foldersMap, foldersMapObserver] =
    useObserver<FolderMap>(DEFAULT_FOLDERS)

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

      foldersMap[parent] = {
        ...foldersMap[parent],
        content: {
          ...foldersMap[parent].content,
          folders: {
            ...foldersMap[parent].content.folders,
            [id]: folder,
          },
        },
      }
    },
    [foldersMap]
  )

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

      foldersMap[parent] = {
        ...foldersMap[parent],
        content: {
          ...foldersMap[parent].content,
          files: {
            ...foldersMap[parent].content.files,
            [id]: file,
          },
        },
      }
    },
    [foldersMap]
  )

  return (
    <DirectoryContext.Provider
      value={{ foldersMap, foldersMapObserver, createFolder, createFile }}
    >
      {children}
    </DirectoryContext.Provider>
  )
}

export const useDirectoryContext = () => {
  const context = useContext(DirectoryContext)

  if (!context) {
    throw new Error('Wrap component with FolderContextProvider!')
  }

  return context
}
