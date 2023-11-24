use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Invite {
    pub owner: Pubkey,
    pub doer: Pubkey,
    pub team: Pubkey,
    pub name: String,
    pub created_at: i64,
    pub bump: u8,
}

impl Invite {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH * 3 // owner, doer, team
        + STRING_LENGTH_PREFIX
        + MAX_TITLE_LENGTH
        + TIMESTAMP_LENGTH // created_at
        + BUMP_LENGTH; // bump
}
