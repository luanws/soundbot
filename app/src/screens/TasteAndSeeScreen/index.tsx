import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import SearchFileTree from '../../components/Search/SearchFileTree'
import { FileTree } from '../../models/file-tree'
import { TasteAndSeeService } from '../../services/taste-and-see'

const TasteAndSeeScreen: React.FC = () => {
  const [tasteAndSeeFileTree, setTasteAndSeeFileTree] = useState<FileTree | null>(null)

  useEffect(() => {
    updateTasteAndSee()
  }, [])

  async function updateTasteAndSee() {
    const songs = await TasteAndSeeService.getTasteAndSees()
    setTasteAndSeeFileTree(songs)
  }

  function searchFileTree(selectedDirectory: FileTree, searchText: string): FileTree[] {
    return TasteAndSeeService.searchTasteAndSees(selectedDirectory.children, searchText)
  }

  return (
    <>
      {tasteAndSeeFileTree ? (
        <SearchFileTree
          rootFileTree={tasteAndSeeFileTree}
          searchFileTree={searchFileTree}
        />
      ) : <Loading />}
    </>
  )
}

export default TasteAndSeeScreen