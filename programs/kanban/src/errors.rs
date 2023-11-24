use anchor_lang::error_code;

#[error_code]
pub enum KanbanError {
    #[msg("Name Empty")]
    NameEmpty,
    #[msg("Name Too Long, Max 50 Characters")]
    NameTooLong,
    #[msg("Todo Title Empty")]
    TodoTitleEmpty,
    #[msg("Todo Title Too Long, Max 50 Characters")]
    TodoTitleTooLong,
    #[msg("Todo Content Empty")]
    TodoContentEmpty,
    #[msg("Todo Content Too Long, Max 280 Characters")]
    TodoContentTooLong,
    #[msg("Status Out Of Bounds, 0 to 2")]
    StatusOutOfBounds,
    #[msg("Week Day Out Of Bounds, 0 to 6")]
    WeekDayOutOfBounds,
}
