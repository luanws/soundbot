import React, { useEffect, useState } from 'react'
import VideoCell from '../../components/Cell/VideoCell'
import Loading from '../../components/Loading'
import SearchFileTree from '../../components/Search/SearchFileTree'
import { FileTree } from '../../models/file-tree'
import { TasteAndSeeService } from '../../services/taste-and-see'
import { Divider, TodayTasteAndSeeContainer, TodayTasteAndSeeInfoText, TodayTasteAndSeeTitleText } from './styles'

const TasteAndSeeScreen: React.FC = () => {
  const [tasteAndSeeFileTree, setTasteAndSeeFileTree] = useState<FileTree | null>(null)
  const [todayTasteAndSee, setTodayTasteAndSee] = useState<FileTree | null>(null)

  const todayString = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    updateTasteAndSee()
  }, [])

  async function updateTasteAndSee() {
    const tasteAndSees = await TasteAndSeeService.getTasteAndSees()
    setTasteAndSeeFileTree(tasteAndSees)
    searchTodayTasteAndSee(tasteAndSees)
  }

  function searchTodayTasteAndSee(tasteAndSeeFileTree: FileTree) {
    const todayTasteAndSee = TasteAndSeeService.getTodayTasteAndSee(tasteAndSeeFileTree.children)
    setTodayTasteAndSee(todayTasteAndSee || null)
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
          ListHeaderComponent={todayTasteAndSee && (
            <>
              <TodayTasteAndSeeContainer>
                <TodayTasteAndSeeTitleText>{todayString}</TodayTasteAndSeeTitleText>
                <TodayTasteAndSeeInfoText>
                  Foi encontrado um vídeo correspondente à data de hoje.
                  Clique no botão abaixo para iniciar.
                  Caso queira ver outros vídeos, utilize a navegação abaixo.
                </TodayTasteAndSeeInfoText>
                <VideoCell
                  filename={todayTasteAndSee.name}
                  playing={false}
                />
              </TodayTasteAndSeeContainer>
              <Divider />
            </>
          )}
        />
      ) : <Loading />}
    </>
  )
}

export default TasteAndSeeScreen