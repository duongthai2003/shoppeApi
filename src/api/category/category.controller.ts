import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurdController } from '../shares/curd/curd.controller';
import { Category } from 'src/libs/models/category/category.entity';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Category Managements')
@Controller('category')
export class CategoryController extends CurdController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(protected readonly categoryService: CategoryService) {
    super(categoryService);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiOperation({ summary: 'create category' })
  create(@Req() req, @Body() body: CreateCategoryDto) {
    if (req.user.type === 1) {
      return super.create(req, body);
    } else {
      throw new BadRequestException('is not admin');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update ' })
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return super.update(id, body);
  }
}
