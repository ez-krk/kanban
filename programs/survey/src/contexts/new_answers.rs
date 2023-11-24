use crate::{
    constants::*,
    errors::ErrorCode,
    state::{Answers, Questions},
};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(input: Vec<String>)]
pub struct NewAnswers<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [b"questions", questions.owner.as_ref(), questions.seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub questions: Account<'info, Questions>,
    #[account(
        init,
        payer = owner,
        seeds = [b"answers", questions.key().as_ref(), owner.key().as_ref()],
        bump,
        space = Answers::LEN + ((STRING_LENGTH_PREFIX + MAX_QUESTION_LENGTH) * input.len())
    )]
    pub answers: Account<'info, Answers>,
    pub system_program: Program<'info, System>,
}

impl<'info> NewAnswers<'info> {
    pub fn new_answers(&mut self, bumps: &BTreeMap<String, u8>, input: Vec<String>) -> Result<()> {
        let answers = &mut self.answers;
        answers.bump = *bumps.get("answers").unwrap();
        answers.owner = self.owner.key();
        answers.created_at = Clock::get().unwrap().unix_timestamp;
        answers.questions = self.questions.key();
        answers.answers = input;  
        let questions = &mut self.questions;
        questions.participants += 1;
        Ok(())
    }
}
