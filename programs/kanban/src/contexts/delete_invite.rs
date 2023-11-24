use crate::state::{Doer, Invite, Team};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
pub struct DeleteInvite<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        has_one = owner,
        close = owner,
        seeds = [b"invite", owner.key().as_ref(), invite.doer.as_ref()],
        bump = invite.bump,
    )]
    pub invite: Account<'info, Invite>,
    pub system_program: Program<'info, System>,
}

impl<'info> DeleteInvite<'info> {
    pub fn delete_invite(&mut self) -> Result<()> {
        Ok(())
    }
}
