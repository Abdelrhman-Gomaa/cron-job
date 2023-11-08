import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogInput } from './input/create-log.input';
import { UpdateLogInput } from './input/update-log.input';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }

  @Post()
  create() { //@Body() input: CreateLogInput
    return this.logService.create();
  }

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateLogInput) {
    return this.logService.update(input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}
