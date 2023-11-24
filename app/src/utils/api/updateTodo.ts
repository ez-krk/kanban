import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { IDL } from '@/models/idl'
import { PROGRAM_ID } from '@/constants'
import { Address, BN, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'
import { Status, SolWeekDay } from '@/models/todo'

export const updateTodo = async ({
  title,
  content,
  status,
  day,
  owner,
  connection,
}: {
  title: string
  content: string
  status: Status
  day: SolWeekDay
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
  // console.log(doerPDA);

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const seed = new BN(randomNumberInRange(0, 1337))

  const todo = PublicKey.findProgramAddressSync(
    // b"todo", team.key().as_ref(), owner.key().as_ref()
    [
      Buffer.from('todo'),
      doerPDA.team.toBuffer(),
      owner.toBuffer(),
      seed.toArrayLike(Buffer, 'le', 8),
    ],
    program.programId
  )[0]

  const transaction = await program.methods
    .createTodo(title, content, status + 1, day + 1, seed)

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
