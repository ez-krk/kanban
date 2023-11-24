use crate::state::{Doer, Invite, Team};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
pub struct CreateInvite<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [b"doer", doer.owner.key().as_ref()],
        bump = doer.bump,
    )]
    pub doer: Account<'info, Doer>,
    #[account(
        seeds = [b"team", owner.key().as_ref()],
        bump = team.bump,
    )]
    pub team: Account<'info, Team>,
    #[account(
        init,
        payer = owner,
        seeds = [b"invite", owner.key().as_ref(), doer.key().as_ref()],
        bump,
        space = Invite::LEN
    )]
    pub invite: Account<'info, Invite>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateInvite<'info> {
    pub fn create_invite(&mut self, bumps: &BTreeMap<String, u8>) -> Result<()> {
        let invite = &mut self.invite;

        // pub owner: Pubkey,
        // pub doer: Pubkey,
        // pub team: Pubkey,
        // pub name : String,
        // pub created_at: i64,
        // pub bump: u8,

        invite.owner = self.owner.key();
        invite.doer = self.doer.key();
        invite.team = self.team.key();
        invite.name = self.team.name.clone();
        invite.created_at = Clock::get()?.unix_timestamp;
        invite.bump = *bumps.get("invite").unwrap();

        Ok(())
    }
}
