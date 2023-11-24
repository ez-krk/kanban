import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { IDL } from '@/models/idl'
import { PROGRAM_ID } from '@/constants'
import { Address, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'

export const deleteTodo = async ({
  todo,
  owner,
  connection,
}: {
  todo: PublicKey
  owner: PublicKey
  connection: ConnectionContextState
}): Promise<Transaction> => {
  const program = new Program(IDL, PROGRAM_ID as Address, connection)

  const doer = PublicKey.findProgramAddressSync(
    [Buffer.from('doer'), owner.toBuffer()],
    program.programId
  )[0]

  // @ts-ignore
  const doerPDA = await program.account.doer.fetch(doer)
  console.log(doerPDA)

  const transaction = await program.methods
    .deleteTodo()
    .accounts({
      owner,
      doer,
      team: doerPDA.team,
      todo,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  return transaction
}
