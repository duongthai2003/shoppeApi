import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CurdService } from './curd.service';
import { ApiOperation } from '@nestjs/swagger';

import { paginationQuery } from './dto/paginationQuery.dto';

// @Controller('curd')
export class CurdController<model = any, CreateDto = any, UpdateDto = any> {
  constructor(protected readonly crudService: CurdService<model>) {}

  @Get('')
  @ApiOperation({ summary: 'list' })
  list(@Req() req, @Query() query: paginationQuery) {
    return this.crudService.getPaginationList(query.start, query.limit);
  }

  @Post('')
  @ApiOperation({ summary: 'create' })
  create(@Req() req, @Body() body: CreateDto) {
    return this.crudService.createNew(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update by id' })
  update(@Param('id') id: string, @Body() body: UpdateDto) {
    console.log('dddddd', { body, id });
    return this.crudService.updateById(id, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get by id' })
  getById(@Param('id') id: string) {
    return this.crudService.getById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'sof delete By Id' })
  deleteById(@Param('id') id: string) {
    return this.crudService.sofdeleteById({ _id: id });
  }
}
