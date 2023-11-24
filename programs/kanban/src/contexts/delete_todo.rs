use crate::state::{Doer, Team, Todo};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct DeleteTodo<'info> {
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
        close = owner,
        has_one = owner,
        seeds = [b"todo", team.key().as_ref(), owner.key().as_ref(), todo.seed.to_le_bytes().as_ref()],
        bump = todo.bump,
    )]
    pub todo: Account<'info, Todo>,
    pub system_program: Program<'info, System>,
}

impl<'info> DeleteTodo<'info> {
    pub fn delete_todo(&mut self) -> Result<()> {
        let doer = &mut self.doer;
        doer.deleted += 1;

        let team = &mut self.team;
        team.deleted += 1;

        Ok(())
    }
}
