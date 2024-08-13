import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CurdController } from '../shares/curd/curd.controller';
import { Products } from 'src/libs/models/product/product.entity';
import { CreateProductDto } from './dto/create.dto';
import { paginationQuery } from '../shares/curd/dto/paginationQuery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Product Management')
@Controller('product')
export class ProductController extends CurdController<Products> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }

  @Post('create')
  @ApiOperation({ summary: 'create' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        categoryId: {
          type: 'string',
        },

        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req: any, file: any, callback: any) {
          const name = Date.now() + '_' + file.originalname;
          callback(null, name);
        },
      }),
      fileFilter: (req: any, file: any, callback: any) => {
        if (file.mimetype.match('image')) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  creates(@Req() req, @Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(body);
    return this.productService.create(body, file);
  }

  @Get('')
  @ApiOperation({ summary: 'list' })
  list(@Req() req, @Query() query: paginationQuery) {
    return this.productService.getPaginationList(query.start, query.limit);
  }
}
