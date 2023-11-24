import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { IDL } from '@/models/idl'
import { PROGRAM_ID } from '@/constants'
import { Address, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'

export const newTeam = async ({
  name,
  doer,
  owner,
  connection,
}: {
  name: string
  doer: PublicKey
  owner: PublicKey
  connection: ConnectionContextState
}): Promise<Transaction> => {
  const program = new Program(IDL, PROGRAM_ID as Address, connection)
  const team = PublicKey.findProgramAddressSync(
    [Buffer.from('team'), owner.toBuffer()],
    program.programId
  )[0]

  const transaction = await program.methods
    .newTeam(name)
    .accounts({
      owner,
      doer,
      team,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  return transaction
}
