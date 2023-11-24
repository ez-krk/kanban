import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { IDL } from '@/models/idl'
import { PROGRAM_ID } from '@/constants'
import { Address, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'

export const createInvite = async ({
  owner,
  member,
  connection,
}: {
  owner: PublicKey
  member: PublicKey
  connection: ConnectionContextState
}): Promise<Transaction> => {
  const program = new Program(IDL, PROGRAM_ID as Address, connection)

  const team = PublicKey.findProgramAddressSync(
    [Buffer.from('team'), owner.toBuffer()],
    program.programId
  )[0]

  const doer = PublicKey.findProgramAddressSync(
    [Buffer.from('doer'), member.toBuffer()],
    program.programId
  )[0]

  const invite = PublicKey.findProgramAddressSync(
    // b"invite", owner.key().as_ref(), doer.key().as_ref()
    [Buffer.from('invite'), owner.toBuffer(), doer.toBuffer()],
    program.programId
  )[0]

  const transaction = await program.methods
    .createInvite()
    .accounts({
      owner,
      doer,
      team,
      invite,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  return transaction
}
