use crate::{
    constants::{MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH},
    errors::KanbanError,
    state::{Doer, Team, Todo},
};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(title: String, content: String, status: u8, day: u8)]
pub struct UpdateTodo<'info> {
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
        has_one = owner,
        has_one = team,
        seeds = [b"todo", team.key().as_ref(), owner.key().as_ref(), todo.seed.to_le_bytes().as_ref()],
        bump = todo.bump,
    )]
    pub todo: Account<'info, Todo>,
    pub system_program: Program<'info, System>,
}

impl<'info> UpdateTodo<'info> {
    pub fn update_todo(
        &mut self,
        title: String,
        content: String,
        status: u8,
        day: u8,
    ) -> Result<()> {
        require!(
            title.chars().count() <= MAX_TITLE_LENGTH,
            KanbanError::TodoTitleTooLong
        );
        require!(
            content.chars().count() <= MAX_CONTENT_LENGTH,
            KanbanError::TodoContentTooLong
        );
        require!(status <= 3, KanbanError::StatusOutOfBounds);
        require!(day <= 7, KanbanError::WeekDayOutOfBounds);

        let todo = &mut self.todo;

        // pub owner: Pubkey,
        // pub team: Pubkey
        // pub id: u64,
        // pub title: String,
        // pub content: String,
        // pub status: u8,
        // pub day: u8,
        // pub done: bool,
        // pub created_at: i64,
        // pub seed: u64,
        // pub bump: u8,

        todo.owner = self.owner.key();
        match title.len() {
            1..=MAX_TITLE_LENGTH => {
                todo.title = title;
            }
            _ => (),
        }
        match content.len() {
            1..=MAX_CONTENT_LENGTH => {
                todo.content = content;
            }
            _ => (),
        }
        match status {
            1..=3 => todo.status = status,
            _ => (),
        }
        match day {
            1..=7 => todo.day = day,
            _ => (),
        }
        match status {
            1..=3 => todo.status = status,
            _ => (),
        }

        Ok(())
    }
}
