import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/apiResponse';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          ...createTaskDto,
          startDate: createTaskDto.startDate ? new Date(createTaskDto.startDate) : null,
          dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        },
      });
      return ApiResponse.success(task, 201, 'Task created successfully');
    } catch (error) {
      return ApiResponse.error(error, 500, error.message || 'Failed to create task');
    }
  }

  async findAll(projectId) {
    projectId = parseInt(projectId, 10);
    try {
      const tasks = await this.prisma.task.findMany({
        where: { projectId },
        include: {
          author: true,
          assignee: true,
          attachments: true,
          comments: true,
        },
      });
      return ApiResponse.success(tasks, 200, 'Tasks fetched successfully');
    } catch (error) {
      return ApiResponse.error(error, 500, error.message || 'Failed to fetch tasks');
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async updateTaskStatus(id: number, status: string) {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: { status },
      });
      return ApiResponse.success(updatedTask, 200, 'Task status updated successfully');
    } catch (error) {
      return ApiResponse.error(error, 500, error.message || 'Failed to update task status');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
