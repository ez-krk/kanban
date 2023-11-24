use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Doer {
    pub owner: Pubkey,
    pub team: Pubkey,
    pub name: String,
    pub created: u64,
    pub deleted: u64,
    pub done: u64,
    pub created_at: i64,
    pub bump: u8,
}

impl Doer {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH * 2 // owner, team
        + STRING_LENGTH_PREFIX
        + MAX_TITLE_LENGTH
        + 8 * 3 // created, deleted, done
        + TIMESTAMP_LENGTH // created_at
        + BUMP_LENGTH; // bump
}
