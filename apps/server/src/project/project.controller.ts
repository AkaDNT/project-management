import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    const result = await this.projectService.create(createProjectDto);
    return res.status(result.statusCode).json(result);
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
