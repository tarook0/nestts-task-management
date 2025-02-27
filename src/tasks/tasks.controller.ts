import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { TasksStatus } from './tasks-status.enum';
import { GetTasksWithFilterDto } from './dto/filer-task-dto';
import { AuthGuard } from '@nestjs/passport';
// import { Getuser } from 'src/auth/get-user-decoratore';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user-decoratore';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger(`Tasks Controller `);
  constructor(private taskService: TasksService) {}
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }
  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksWithFilterDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      ` User ${user.userName}  retreving all tasks . Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.taskService.getTasks(filterDto, user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      ` User ${user.userName}  create a new task  . Data : ${JSON.stringify(createTaskDto)}`,
    );
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TasksStatusValidationPipe) status: TasksStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskById(id, status, user);
  }
}
