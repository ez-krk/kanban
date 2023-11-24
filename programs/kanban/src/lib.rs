use anchor_lang::prelude::*;

mod constants;
mod contexts;
mod errors;
mod state;

use contexts::*;
declare_id!("WBAeGBvBarw39HZPfKjQnYKH57FcVJTmvGyDDSMwZwq");

#[program]
pub mod kanban {
    use super::*;

    pub fn new_doer(ctx: Context<NewDoer>, name: String) -> Result<()> {
        ctx.accounts.new_doer(&ctx.bumps, name)
    }

    pub fn new_team(ctx: Context<NewTeam>, name: String) -> Result<()> {
        ctx.accounts.new_team(&ctx.bumps, name)
    }

    pub fn create_todo(
        ctx: Context<CreateTodo>,
        title: String,
        content: String,
        status: u8,
        day: u8,
        seed: u64,
    ) -> Result<()> {
        ctx.accounts
            .create_todo(&ctx.bumps, title, content, status, day, seed)
    }

    pub fn delete_todo(ctx: Context<DeleteTodo>) -> Result<()> {
        ctx.accounts.delete_todo()
    }

    pub fn done_todo(ctx: Context<DoneTodo>) -> Result<()> {
        ctx.accounts.done_todo()
    }

    pub fn update_todo(
        ctx: Context<UpdateTodo>,
        title: String,
        content: String,
        status: u8,
        day: u8,
    ) -> Result<()> {
        ctx.accounts.update_todo(title, content, status, day)
    }

    pub fn create_invite(ctx: Context<CreateInvite>) -> Result<()> {
        ctx.accounts.create_invite(&ctx.bumps)
    }

    pub fn accept_invite(ctx: Context<AcceptInvite>) -> Result<()> {
        ctx.accounts.accept_invite()
    }
}
