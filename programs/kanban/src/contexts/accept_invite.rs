use crate::state::{Doer, Invite, Team};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AcceptInvite<'info> {
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
        mut,
        seeds = [b"team", team.owner.key().as_ref()],
        bump = team.bump,
    )]
    pub team: Account<'info, Team>,
    #[account(
        mut,
        close = owner,
        has_one = doer,
        seeds = [b"invite", team.owner.key().as_ref(), doer.key().as_ref()],
        bump = invite.bump,
    )]
    pub invite: Account<'info, Invite>,
    pub system_program: Program<'info, System>,
}

impl<'info> AcceptInvite<'info> {
    pub fn accept_invite(&mut self) -> Result<()> {
        let team = &mut self.team;
        team.doers += 1;

        let doer = &mut self.doer;
        doer.team = team.key();

        Ok(())
    }
}
