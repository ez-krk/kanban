import ChatMenu, { ChatRoom } from '@/components/pages/user/chat/ChatMenu'
import ChatBox from '@/components/pages/user/chat/ChatBox'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import useToastMessage from '@/hooks/useToastMessage'
import {
  DocumentData,
  QueryDocumentSnapshot,
  limit,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useTranslation } from 'next-i18next'
import { UserChatRoom, genUserChatRoomPath } from '@/types/models'
import { query } from '@/lib/skeet/firestore'
import DashboardMenu from './DashboardMenu'
import DashboardBox from './DashboardBox'
import { PROTOCOL_PDA, SOL_HACK_PDA, VULNERABILITY_PDA } from '@/types'
import { KanbanContext } from '@/contexts/KanbanContextProvider'
import { TEAM_PDA } from '@/models/kanban/structs'

export default function DashboardScreen() {
  const { t } = useTranslation()

  const user = useRecoilValue(userState)
  const addToast = useToastMessage()

  const [loading, setLoading] = useState(true)
  const { program, doer, setDoer, teams, setTeams, todos, setTodos } =
    useContext(KanbanContext)

  const [isNewChatModalOpen, setNewChatModalOpen] = useState(
    teams && teams[0] ? false : true
  )
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  )

  const [selectedTeam, setSelectedTeam] = useState<TEAM_PDA | null>(null)

  const [chatList, setChatList] = useState<ChatRoom[]>([])

  const [lastChat, setLastChat] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [isDataLoading, setDataLoading] = useState(false)

  return (
    <>
      <div className="content-height flex w-full flex-col items-start justify-start overflow-auto sm:flex-row">
        <DashboardMenu
          program={program}
          doer={doer}
          setDoer={setDoer}
          teams={teams}
          setTeams={setTeams}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          isNewChatModalOpen={isNewChatModalOpen}
          setNewChatModalOpen={setNewChatModalOpen}
          currentChatRoomId={currentChatRoomId}
          setCurrentChatRoomId={setCurrentChatRoomId}
          chatList={chatList}
          setChatList={setChatList}
          lastChat={lastChat}
          setLastChat={setLastChat}
          isDataLoading={isDataLoading}
          setDataLoading={setDataLoading}
        />
        <DashboardBox
          doer={doer}
          selectedTeam={selectedTeam}
          todos={todos}
          setTodos={setTodos}
          currentChatRoomId={currentChatRoomId}
        />
      </div>
    </>
  )
}
