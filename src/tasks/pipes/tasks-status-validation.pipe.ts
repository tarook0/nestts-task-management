import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TasksStatus } from '../tasks-status.enum';

export class TasksStatusValidationPipe implements PipeTransform {
  readonly allowstatus = [
    TasksStatus.DONE,
    TasksStatus.INPROGRESS,
    TasksStatus.OPEN,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValue(value)) {
      throw new BadRequestException(`${value} is invalid status `);
    }
    return value;
  }
  private isStatusValue(status: any) {
    const idx = this.allowstatus.indexOf(status);
    return idx !== -1;
  }
}
