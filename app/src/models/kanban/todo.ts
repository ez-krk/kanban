import { PublicKey } from "@solana/web3.js";

// export interface Todo {
//   id: number;
//   title: string;
//   content: string;
//   status: Status;
//   day: WeekDay;
//   isDone: boolean;
// }

export interface Todo {
  pubkey: PublicKey;
  owner: PublicKey;
  team: PublicKey;
  id: number;
  title: string;
  content: string;
  status: Status;
  day: WeekDay;
  done: boolean;
  createdAt: number;
  bump: number;
}

export enum Status {
  Backlog,
  Active,
  Done,
}
export enum SolWeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Satuday,
  Sunday,
}

export enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Satuday,
  Sunday,
}
export enum WeekDayTodos {
  MonTodos = "MonTodos",
  TueTodos = "TueTodos",
  WedTodos = "WedTodos",
  ThuTodos = "ThuTodos",
  FriTodos = "FriTodos",
  SatTodos = "SatTodos",
  SunTodos = "SunTodos",
}

export enum TodosStatus {
  BacklogTodos = "BacklogTodos",
  ActiveTodos = "ActiveTodos",
  CompletedTodos = "CompletedTodos",
}

export enum TodosView {
  KanbanView = "KanbanView",
  WeeklyView = "WeeklyView",
}
