import { IsIn, IsOptional } from 'class-validator';
import { TasksStatus } from '../tasks.modle';

export class GetTasksWithFilterDto {
  @IsOptional()
  @IsIn([TasksStatus.DONE, TasksStatus.INPROGRESS, TasksStatus.OPEN])
  status: TasksStatus;
  @IsOptional()
  search: string;
}
