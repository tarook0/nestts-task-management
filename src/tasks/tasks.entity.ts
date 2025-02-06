import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TasksStatus } from './tasks-status.enum';
import { User } from 'src/auth/user.entity';
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TasksStatus;
  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;
  @Column()
  userId: number;
}
