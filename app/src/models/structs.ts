import { PublicKey } from "@solana/web3.js";

export type TODO_PDA = {
  // pub owner: Pubkey,
  // pub team: Pubkey,
  // pub id: u64,
  // pub title: String,
  // pub content: String,
  // pub status: u8,
  // pub day: u8,
  // pub done: bool,
  // pub created_at: i64,
  // pub bump: u8,

  owner: PublicKey;
  team: PublicKey;
  id: number;
  title: string;
  content: string;
  status: number;
  day: number;
  done: boolean;
  createdAt: number;
  bump: number;
};

export type DOER_PDA = {
  // pub owner: Pubkey,
  // pub team: Pubkey,
  // pub name: String,
  // pub created: u64,
  // pub deleted: u64,
  // pub done: u64,
  // pub created_at: i64,
  // pub bump: u8,

  owner: PublicKey;
  team: PublicKey;
  name: string;
  created: number;
  deleted: number;
  done: number;
  createdAt: number;
  bump: number;
};

export type TEAM_PDA = {
  // pub owner: Pubkey,
  // pub name: String,
  // pub todos: u64,
  // pub doers: u64,
  // pub created: u64,
  // pub deleted: u64,
  // pub done: u64,
  // pub created_at: i64,
  // pub bump: u8,

  pubkey: PublicKey;
  owner: PublicKey;
  team: PublicKey;
  name: string;
  todos: number;
  doers: number;
  created: number;
  deleted: number;
  done: number;
  createdAt: number;
  bump: number;
};

export type INVITE_PDA = {
  // pub owner: Pubkey,
  // pub doer: Pubkey,
  // pub team: Pubkey,
  // pub created_at: i64,
  // pub bump: u8,
  name: string;
  pubkey: PublicKey;
  owner: PublicKey;
  doer: PublicKey;
  team: PublicKey;
  createdAt: number;
  bump: number;
};
