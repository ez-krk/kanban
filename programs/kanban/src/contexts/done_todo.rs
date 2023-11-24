use crate::state::{Doer, Team, Todo};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct DoneTodo<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [b"doer", owner.key().as_ref()],
        bump = doer.bump,
    )]
    pub doer: Account<'info, Doer>,
    #[account(
        mut,
        seeds = [b"team", team.owner.as_ref()],
        bump = team.bump,
    )]
    pub team: Account<'info, Team>,
    #[account(
        mut,
        has_one = team,
        seeds = [b"todo", todo.team.key().as_ref(), todo.owner.key().as_ref(), todo.seed.to_le_bytes().as_ref()],
        bump = todo.bump,
    )]
    pub todo: Account<'info, Todo>,
    pub system_program: Program<'info, System>,
}

impl<'info> DoneTodo<'info> {
    pub fn done_todo(&mut self) -> Result<()> {
        let doer = &mut self.doer;
        doer.done += 1;

        let team = &mut self.team;
        team.done += 1;
        team.todos -= 1;

        let todo = &mut self.todo;
        todo.done = true;
        todo.status = 3;

        Ok(())
    }
}
