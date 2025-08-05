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
      return ApiResponse.success(newProject, 201);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
