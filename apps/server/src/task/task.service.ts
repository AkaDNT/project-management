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
    if (Number.isNaN(projectId)) {
      return ApiResponse.error('projectId must be a valid number', 400, 'Bad Request');
    }

    try {
      const tasks = await this.prisma.task.findMany({
        where: { projectId },
        orderBy: { id: 'asc' },
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

  async findOne(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
          author: true,
          assignee: true,
          attachments: true,
          comments: true,
        },
      });

      if (!task) {
        return ApiResponse.error(`Task with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.success(task, 200, 'Task fetched successfully');
    } catch (error) {
      return ApiResponse.error(error, 500, error.message || 'Failed to fetch task');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          ...updateTaskDto,
          startDate: updateTaskDto.startDate ? new Date(updateTaskDto.startDate) : undefined,
          dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
        },
      });

      return ApiResponse.success(updatedTask, 200, 'Task updated successfully');
    } catch (error) {
      if (error?.code === 'P2025') {
        return ApiResponse.error(`Task with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.error(error, 500, error.message || 'Failed to update task');
    }
  }

  async updateTaskStatus(id: number, status: string) {
    if (!status?.trim()) {
      return ApiResponse.error('status is required', 400, 'Bad Request');
    }

    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: { status: status.trim() },
      });
      return ApiResponse.success(updatedTask, 200, 'Task status updated successfully');
    } catch (error) {
      if (error?.code === 'P2025') {
        return ApiResponse.error(`Task with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.error(error, 500, error.message || 'Failed to update task status');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });

      return ApiResponse.success({ id }, 200, 'Task deleted successfully');
    } catch (error) {
      if (error?.code === 'P2025') {
        return ApiResponse.error(`Task with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.error(error, 500, error.message || 'Failed to delete task');
    }
  }
}
