import React, { createContext, useState, useEffect, useMemo } from 'react'
// import { onAuthStateChangeListener } from "@/tools/supabase";
import type { ReactNode } from 'react'
import type { PROTOCOL_PDA, SOL_HACK_PDA, VULNERABILITY_PDA } from '@/types'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Address, Program } from '@coral-xyz/anchor'
import { IDL } from '@/idl'
import { KANBAN_PROGRAM_ID } from '@/constants'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { DOER_PDA, TEAM_PDA, TODO_PDA } from '@/models/kanban/structs'
import { Keypair } from '@solana/web3.js'

interface KanbanContext {
  program: Program<IDL> | null
  doer: DOER_PDA | null
  setDoer: React.Dispatch<React.SetStateAction<DOER_PDA | null>> | null
  teams: TEAM_PDA[] | null
  setTeams: React.Dispatch<React.SetStateAction<TEAM_PDA[] | null>> | null
  todos: TODO_PDA[] | null
  setTodos: React.Dispatch<React.SetStateAction<TODO_PDA[] | null>> | null
  secretKey: Uint8Array | null
}

export const KanbanContext = createContext<KanbanContext>({
  program: null,
  doer: null,
  setDoer: () => null,
  teams: null,
  setTeams: () => null,
  todos: null,
  setTodos: () => null,
  secretKey: null,
})

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey } = useWallet()
  const connection = useConnection()
  const user = useRecoilValue(userState)

  const program = useMemo(
    () => new Program(IDL, KANBAN_PROGRAM_ID as Address, connection),
    [connection]
  )
  const [doer, setDoer] = useState<DOER_PDA | null>(null)

  const [teams, setTeams] = useState<TEAM_PDA[] | null>(null)

  const [todos, setTodos] = useState<TODO_PDA[] | null>(null)

  const [secretKey, setSecretKey] = useState<Uint8Array | null>(null)

  const value = {
    program,
    doer,
    setDoer,
    teams,
    setTeams,
    todos,
    setTodos,
    secretKey,
  }

  useEffect(() => {
    if (publicKey && !doer) {
      const fetchDoer = async () => {
        // @ts-ignore
        return await program.account.doer.all([
          {
            memcmp: {
              offset: 8,
              bytes: publicKey.toBase58(),
            },
          },
        ])
      }
      fetchDoer()
        .then((response) => {
          console.log(response)
          // @ts-ignore
          const doerMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          setDoer(doerMap)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [publicKey])

  useEffect(() => {
    if (publicKey && doer) {
      const fetchTeams = async () => {
        // @ts-ignore
        return await program.account.team.all([
          {
            memcmp: {
              offset: 8,
              bytes: doer.pubkey.toBase58(),
            },
          },
        ])
      }
      fetchTeams()
        .then((response) => {
          // @ts-ignore
          const teamsMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          console.log('teams :', teamsMap)
          setTeams(teamsMap)
        })
        .catch((error) => console.log(error))
    }
  }, [publicKey, doer])

  useEffect(() => {
    if (publicKey && doer && teams) {
      const fetchTodos = async () => {
        // @ts-ignore
        return await program.account.todo.all([
          {
            memcmp: {
              offset: 8 + 32,
              bytes: teams[0].pubkey.toBase58(),
            },
          },
        ])
      }
      fetchTodos()
        .then((response) => {
          // @ts-ignore
          const todosMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            account.columnId =
              account.status == 1
                ? 'todo'
                : account.status == 2
                ? 'doing'
                : account.status == 3
                ? 'done'
                : ''
            return result
          })
          console.log('todos :', todosMap)
          setTodos(todosMap)
        })
        .catch((error) => console.log(error))
    }
  }, [publicKey, doer, teams])

  useEffect(() => {
    if (user && user.secretKey) {
      setSecretKey(
        Buffer.from(
          Uint8Array.from(
            user.secretKey.split(',').map((item) => {
              return parseInt(item)
            })
          )
        )
      )
      // console.log(secretKey)
    }
  }, [user])

  return (
    <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
  )
}
