use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Team {
    pub owner: Pubkey,
    pub name: String,
    pub todos: u64,
    pub doers: u64,
    pub created: u64,
    pub deleted: u64,
    pub done: u64,
    pub created_at: i64,
    pub bump: u8,
}

impl Team {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // owner
        + STRING_LENGTH_PREFIX
        + MAX_TITLE_LENGTH
        + 8 * 5 // todo, doers, done
        + TIMESTAMP_LENGTH // created_at
        + BUMP_LENGTH; // bump
}
