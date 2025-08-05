import { IsString, IsOptional, IsDateString, Length, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'Project name must be a string.' })
  @Length(1, 255, {
    message: 'Project name must not be empty and must be at most 255 characters long.',
  })
  name: string;

  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required and cannot be empty.' })
  description: string;

  @IsDateString(
    {},
    { message: 'Start date must be a valid ISO 8601 date string (e.g., 2025-08-05).' },
  )
  @IsNotEmpty({ message: 'Start date is required and cannot be empty.' })
  startDate: string;

  @IsDateString(
    {},
    { message: 'End date must be a valid ISO 8601 date string (e.g., 2025-08-05).' },
  )
  @IsNotEmpty({ message: 'End date is required and cannot be empty.' })
  endDate: string;
}
