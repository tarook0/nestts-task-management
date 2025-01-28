import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TasksStatus } from './tasks.modle';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksWithFilterDto } from './dto/filer-task-dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  // @Get()
  // getAllTasks(): Tasks[] {
  //   return this.taskService.getAllTasks();
  // }
  @Get()
  getAllTasksWithFilter(@Query(ValidationPipe) filterDto: GetTasksWithFilterDto): Tasks[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Tasks {
    return this.taskService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updatTask(
    @Param('id') id: string,
    @Body('status',TasksStatusValidationPipe) status: TasksStatus,
  ): Tasks[] {
    return this.taskService.updateTaskById(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.taskService.createTask(createTaskDto);
  }
}
