use crate::{errors::KanbanError, state::{Team, Doer}};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct NewTeam<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        has_one = owner,
        seeds = [b"doer", owner.key().as_ref()],
        bump = doer.bump,
    )]
    pub doer: Account<'info, Doer>,
    #[account(
        init,
        payer = owner,
        seeds = [b"team", owner.key().as_ref()],
        bump,
        space = Team::LEN
    )]
    pub team: Account<'info, Team>,
    pub system_program: Program<'info, System>,
}

impl<'info> NewTeam<'info> {
    pub fn new_team(&mut self, bumps: &BTreeMap<String, u8>, name: String) -> Result<()> {
        require!(name.chars().count() <= 50, KanbanError::NameTooLong);

        let team = &mut self.team;

        // pub owner: Pubkey,
        // pub name: String,
        // pub todos: u64,
        // pub doers: u64,
        // pub created: u64,
        // pub deleted: u64,
        // pub done: u64,
        // pub created_at: i64,
        // pub bump: u8,

        team.owner = self.owner.key();
        team.name = name;
        team.todos = 0;
        team.created = 0;
        team.deleted = 0;
        team.doers = 1;
        team.done = 0;
        team.created_at = Clock::get()?.unix_timestamp;
        team.bump = *bumps.get("team").unwrap();

        let doer = &mut self.doer;
        doer.team = self.team.key();

        Ok(())
    }
}
