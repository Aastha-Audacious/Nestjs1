import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Test module')
@Controller('test')
export class TestController {
  @Get('/getAll')
  @ApiOperation({ summary: 'Get all the data' })
  @ApiResponse({
    status: 200,
    description: 'Get all data',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'This is unique id',
            example: '10'
          },
          name:{
            type: 'string',
            description: 'This is name',
            example: 'Naman'
          }
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  getAll(): string {
    return 'All data list';
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create new record' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 7,
          description: 'This is unique id',
        },
        name: {
          type: 'string',
          example: 'Aastha',
          description: 'This is the name',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Created Successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  create(): string {
    return 'saved...';
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update the record' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Enter unique id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 7,
          description: 'This is unique id',
        },
        name: {
          type: 'string',
          example: 'Aastha',
          description: 'This is the name',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Updated Successfully!',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  update(@Req() request: Request): string {
    console.log(request.body);
    return 'updated...';
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'Delete the record' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated Successfully!',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  delete(): string {
    return 'deleted...';
  }
}
