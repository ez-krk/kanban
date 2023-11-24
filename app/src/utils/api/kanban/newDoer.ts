import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { IDL } from '@/models/kanban/idl'
import { KANBAN_PROGRAM_ID } from '@/constants'
import { Address, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'

export const newDoer = async ({
  name,
  owner,
  connection,
}: {
  name: string
  owner: PublicKey
  connection: ConnectionContextState
}): Promise<Transaction> => {
  const program = new Program(IDL, KANBAN_PROGRAM_ID as Address, connection)
  const doer = PublicKey.findProgramAddressSync(
    [Buffer.from('doer'), owner.toBuffer()],
    program.programId
  )[0]

  const transaction = await program.methods
    .newDoer(name)
    .accounts({
      owner,
      doer,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  return transaction
}
