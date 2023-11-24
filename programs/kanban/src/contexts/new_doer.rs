use crate::{errors::KanbanError, state::Doer};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct NewDoer<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        seeds = [b"doer", owner.key().as_ref()],
        bump,
        space = Doer::LEN
    )]
    pub doer: Account<'info, Doer>,
    pub system_program: Program<'info, System>,
}

impl<'info> NewDoer<'info> {
    pub fn new_doer(&mut self, bumps: &BTreeMap<String, u8>, name: String) -> Result<()> {
        require!(name.chars().count() > 0, KanbanError::NameEmpty);
        require!(name.chars().count() <= 50, KanbanError::NameTooLong);

        let doer = &mut self.doer;

        // pub owner: Pubkey,
        // pub team: Pubkey,
        // pub name: String,
        // pub created: u64,
        // pub deleted: u64,
        // pub done: u64,
        // pub created_at: i64,
        // pub bump: u8,

        doer.owner = self.owner.key();
        doer.name = name;
        doer.created = 0;
        doer.deleted = 0;
        doer.done = 0;
        doer.created_at = Clock::get()?.unix_timestamp;
        doer.bump = *bumps.get("doer").unwrap();

        Ok(())
    }
}
