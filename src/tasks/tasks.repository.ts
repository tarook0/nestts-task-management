// import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './tasks.entity';
// import { CreateTaskDto } from './dto/create-task-dto';
// import { TasksStatus } from './tasks-status.enum';
// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {
    
//   async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     const { title, description } = createTaskDto;
//     const task = new Task();
//     task.title = title;
//     task.description = description;
//     task.status = TasksStatus.OPEN;
//     await task.save();
//     return task;
//   }
// }
