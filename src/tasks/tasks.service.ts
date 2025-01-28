import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TasksStatus } from './tasks.modle';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksWithFilterDto } from './dto/filer-task-dto';
@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];
  getAllTasks(): Tasks[] {
    return this.tasks;
  }
  getTaskById(id: string): Tasks {
    const found = this.tasks.find((t) => t.id == id);
    if (!found) {
      throw new NotFoundException(`Task with Id ${id} has not found `);
    }
    return found;
  }
  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks.filter((t) => t.id !== found.id);
  }
  updateTaskById(id: string, status: TasksStatus): Tasks[] {
    this.tasks.find((t) => t.id == id).status = status;
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksWithFilterDto): Tasks[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;
    const task: Tasks = {
      id: uuidv4(),
      description,
      title,
      status: TasksStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
