use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Todo {
    pub owner: Pubkey,
    pub team: Pubkey,
    pub id: u64,
    pub title: String,
    pub content: String,
    pub status: u8,
    pub day: u8,
    pub done: bool,
    pub created_at: i64,
    pub seed: u64,
    pub bump: u8,
}

impl Todo {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH * 2 // owner, team
        + 8 // form
        + STRING_LENGTH_PREFIX // title
        + MAX_TITLE_LENGTH // title
        + STRING_LENGTH_PREFIX // content
        + MAX_CONTENT_LENGTH
        + 1 * 3 // status, day, done
        + TIMESTAMP_LENGTH
        + BUMP_LENGTH; // bump
}
