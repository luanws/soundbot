import React, { useEffect, useRef, useState } from 'react'
import VideoCell from '../../components/Cell/VideoCell'
import Loading from '../../components/Loading'
import PlayerModal, { PlayerModalRef } from '../../components/Modal/PlayerModal'
import SearchFileTree from '../../components/Search/SearchFileTree'
import { FileTree } from '../../models/file-tree'
import { CommandService } from '../../services/command'
import { TasteAndSeeService } from '../../services/taste-and-see'
import { Divider, TodayTasteAndSeeContainer, TodayTasteAndSeeInfoText, TodayTasteAndSeeTitleText } from './styles'

const TasteAndSeeScreen: React.FC = () => {
  const playerModalRef = useRef<PlayerModalRef>(null)

  const [tasteAndSeeFileTree, setTasteAndSeeFileTree] = useState<FileTree | null>(null)
  const [todayTasteAndSee, setTodayTasteAndSee] = useState<FileTree | null>(null)
  const [todayTasteAndSeeIsPlaying, setTodayTasteAndSeeIsPlaying] = useState<boolean>(false)

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

  async function handleStopTodayTasteAndSee() {
    await CommandService.stopVideo()
    setTodayTasteAndSeeIsPlaying(false)
    playerModalRef.current?.close()
  }

  async function handlePlayTodayTasteAndSee(todayTasteAndSee: FileTree) {
    await CommandService.playVideo({
      dirname: todayTasteAndSee.dirname,
      filename: todayTasteAndSee.name,
    })
    setTodayTasteAndSeeIsPlaying(true)
    playerModalRef.current?.open()
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
                </TodayTasteAndSeeInfoText>
                <VideoCell
                  filename={todayTasteAndSee.name}
                  playing={false}
                  onPress={() => handlePlayTodayTasteAndSee(todayTasteAndSee)}
                />
              </TodayTasteAndSeeContainer>
              <Divider />
            </>
          )}
        />
      ) : <Loading />}
      {todayTasteAndSee && todayTasteAndSeeIsPlaying && (
        <PlayerModal
          ref={playerModalRef}
          playingVideoFilename={todayTasteAndSee.name}
          stopVideo={handleStopTodayTasteAndSee}
        />
      )}
    </>
  )
}

export default TasteAndSeeScreen