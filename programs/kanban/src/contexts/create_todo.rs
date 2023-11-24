use crate::{
    constants::{MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH},
    errors::KanbanError,
    state::{Doer, Team, Todo},
};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(title: String, content: String, status: u8, day: u8, seed: u64)]
pub struct CreateTodo<'info> {
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
        init,
        payer = owner,
        seeds = [b"todo", team.key().as_ref(), owner.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
        space = Todo::LEN
    )]
    pub todo: Account<'info, Todo>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateTodo<'info> {
    pub fn create_todo(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        title: String,
        content: String,
        status: u8,
        day: u8,
        seed: u64,
    ) -> Result<()> {
        require!(title.chars().count() > 0, KanbanError::TodoTitleEmpty);
        require!(
            title.chars().count() <= MAX_TITLE_LENGTH,
            KanbanError::TodoTitleTooLong
        );
        require!(content.chars().count() > 0, KanbanError::TodoContentEmpty);
        require!(
            content.chars().count() <= MAX_CONTENT_LENGTH,
            KanbanError::TodoContentTooLong
        );
        require!(status <= 3, KanbanError::StatusOutOfBounds);
        require!(status >= 1, KanbanError::StatusOutOfBounds);
        require!(day <= 7, KanbanError::WeekDayOutOfBounds);
        require!(day >= 1, KanbanError::WeekDayOutOfBounds);

        let doer = &mut self.doer;
        doer.created += 1;

        let team = &mut self.team;
        team.created += 1;
        team.todos += 1;

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
        // pub bump: u8,

        todo.owner = self.owner.key();
        todo.team = team.key();
        todo.id = team.todos;
        todo.title = title;
        todo.content = content;
        todo.status = status;
        todo.day = day;
        todo.done = false;
        todo.created_at = Clock::get().unwrap().unix_timestamp;
        todo.seed = seed;
        todo.bump = *bumps.get("todo").unwrap();

        Ok(())
    }
}
