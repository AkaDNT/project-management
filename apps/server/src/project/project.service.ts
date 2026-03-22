import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/apiResponse';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const { description, endDate, name, startDate } = createProjectDto;
      const newProject = await this.prisma.project.create({
        data: {
          name,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      return ApiResponse.success(newProject, 201, 'Project created successfully');
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  async findAll() {
    try {
      const projects = await this.prisma.project.findMany({
        orderBy: { id: 'asc' },
      });
      return ApiResponse.success(projects, 200, 'Projects fetched successfully');
    } catch (err) {
      return ApiResponse.error(err.message, 500, 'Failed to fetch projects');
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
        include: {
          tasks: true,
          projectTeams: true,
        },
      });

      if (!project) {
        return ApiResponse.error(`Project with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.success(project, 200, 'Project fetched successfully');
    } catch (err) {
      return ApiResponse.error(err.message, 500, 'Failed to fetch project');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: { id },
        data: {
          ...updateProjectDto,
          startDate: updateProjectDto.startDate
            ? new Date(updateProjectDto.startDate)
            : undefined,
          endDate: updateProjectDto.endDate ? new Date(updateProjectDto.endDate) : undefined,
        },
      });

      return ApiResponse.success(updatedProject, 200, 'Project updated successfully');
    } catch (err) {
      if (err?.code === 'P2025') {
        return ApiResponse.error(`Project with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.error(err.message, 500, 'Failed to update project');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.project.delete({
        where: { id },
      });

      return ApiResponse.success({ id }, 200, 'Project deleted successfully');
    } catch (err) {
      if (err?.code === 'P2025') {
        return ApiResponse.error(`Project with id ${id} was not found`, 404, 'Not Found');
      }

      return ApiResponse.error(err.message, 500, 'Failed to delete project');
    }
  }
}
