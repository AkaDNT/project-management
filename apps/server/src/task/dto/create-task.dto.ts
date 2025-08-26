import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string.' })
  @MaxLength(255, { message: 'Title must be at most 255 characters long.' })
  @IsNotEmpty({ message: 'Title is required and cannot be empty.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string.' })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Priority must be a string.' })
  priority?: string;

  @IsOptional()
  @IsString({ message: 'Tags must be a string.' })
  tags?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Start date must be a valid ISO 8601 date string (e.g., 2025-08-05).' },
  )
  startDate?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Due date must be a valid ISO 8601 date string (e.g., 2025-08-05).' },
  )
  dueDate?: string;

  @IsOptional()
  @IsInt({ message: 'Points must be an integer number.' })
  @Min(0, { message: 'Points must be a non-negative integer.' })
  points?: number;

  @IsInt({ message: 'Project ID must be an integer.' })
  @IsNotEmpty({ message: 'Project ID is required.' })
  projectId: number;

  @IsInt({ message: 'Author User ID must be an integer.' })
  @IsNotEmpty({ message: 'Author User ID is required.' })
  authorUserId: number;

  @IsOptional()
  @IsInt({ message: 'Assigned User ID must be an integer.' })
  assignedUserId?: number;
}
