import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Commitment, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Kanban } from "../target/types/kanban";
import assert from "node:assert/strict";

const commitment: Commitment = "finalized";

describe("kanban", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Kanban as Program<Kanban>;

  const owner = Keypair.generate();
  const member = Keypair.generate();

  const ownerName = "€$¥";
  const memberName = "¥€$";

  const title = "kanban";
  const content = "do the kanban they said..";

  const seed = new BN(1);

  const doer = PublicKey.findProgramAddressSync(
    // "b"doer", owner.key().as_ref()
    [Buffer.from("doer"), owner.publicKey.toBuffer()],
    program.programId
  )[0];

  const memberPda = PublicKey.findProgramAddressSync(
    // "b"doer", owner.key().as_ref()
    [Buffer.from("doer"), member.publicKey.toBuffer()],
    program.programId
  )[0];

  const team = PublicKey.findProgramAddressSync(
    // b"team", owner.key().as_ref()
    [Buffer.from("team"), owner.publicKey.toBuffer()],
    program.programId
  )[0];

  const invite = PublicKey.findProgramAddressSync(
    // b"invite", owner.key().as_ref(), doer.key().as_ref()
    [Buffer.from("invite"), owner.publicKey.toBuffer(), memberPda.toBuffer()],
    program.programId
  )[0];

  const todo = PublicKey.findProgramAddressSync(
    // b"todo", team.key().as_ref(), owner.key().as_ref(), seed.to_le_bytes().as_ref()
    [
      Buffer.from("todo"),
      team.toBuffer(),
      owner.publicKey.toBuffer(),
      seed.toBuffer("le", 8),
    ],
    program.programId
  )[0];

  it("airdrop", async () => {
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        owner.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        member.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
  });

  it("register new doer", async () => {
    await program.methods
      .newDoer(ownerName)
      .accounts({
        owner: owner.publicKey,
        doer,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);
  });

  it("register another doer", async () => {
    await program.methods
      .newDoer(memberName)
      .accounts({
        owner: member.publicKey,
        doer: memberPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([member])
      .rpc()
      .then(confirmTx);
  });

  it("register new team", async () => {
    await program.methods
      .newTeam("wba")
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);
  });

  it("create todo", async () => {
    await program.methods
      .createTodo(title, content, 1, 1, seed)
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);
  });

  it("update todo title", async () => {
    await program.methods
      .updateTodo("updated", "", 0, 0)
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const updated = await program.account.todo.fetch(todo);
        console.log(updated);
      });
  });

  it("update todo content", async () => {
    await program.methods
      .updateTodo("", "also updated", 0, 0)
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const updated = await program.account.todo.fetch(todo);
        console.log(updated);
      });
  });

  it("update todo status", async () => {
    await program.methods
      .updateTodo("", "", 2, 0)
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const updated = await program.account.todo.fetch(todo);
        console.log(updated);
      });
  });

  it("update todo day", async () => {
    await program.methods
      .updateTodo("", "", 0, 7)
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const updated = await program.account.todo.fetch(todo);
        console.log(updated);
      });
  });

  it("done todo", async () => {
    await program.methods
      .doneTodo()
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const updated = await program.account.todo.fetch(todo);
        console.log(updated);
      });
  });

  it("delete todo", async () => {
    await program.methods
      .deleteTodo()
      .accounts({
        owner: owner.publicKey,
        doer,
        team,
        todo,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);
  });

  it("create invite", async () => {
    await program.methods
      .createInvite()
      .accounts({
        owner: owner.publicKey,
        doer: memberPda,
        team,
        invite,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);
  });

  it("accept invite", async () => {
    await program.methods
      .acceptInvite()
      .accounts({
        owner: member.publicKey,
        doer: memberPda,
        team,
        invite,
        systemProgram: SystemProgram.programId,
      })
      .signers([member])
      .rpc()
      .then(confirmTx);
  });
});

const confirmTx = async (signature: string) => {
  const latestBlockhash = await anchor
    .getProvider()
    .connection.getLatestBlockhash();
  await anchor
    .getProvider()
    .connection.confirmTransaction(
      {
        signature,
        ...latestBlockhash,
      },
      commitment
    )
    .then(() => {
      console.log("your transaction signature", signature);
    });
};
