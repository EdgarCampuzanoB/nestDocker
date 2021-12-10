import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) {}

  @Get()
  getTuits(@Query() filterQuery): Tuit[] {
    const { searchTerm, orderBy } = filterQuery;
    return this.tuitService.getTuits();
  }
  @Get(':id')
  getTuit(@Param('id') id: string): Tuit {
    return this.tuitService.getTuit(id);
  }

  @Post('/nuevo-tuit')
  createTuit(@Body() message: CreateTuitDto): void {
    message instanceof CreateTuitDto
      ? console.log('true')
      : console.log('false');
    return this.tuitService.createTuit(message);
  }

  @Patch(':id')
  updateTuit(@Param('id') id: string, @Body() tuit: UpdateTuitDto): Tuit {
    return this.tuitService.updatetuit(id, tuit);
  }

  @Delete(':id')
  deleteTuit(@Param('id') id: string): string {
    this.tuitService.removeTuit(id);
    return `The tuit ${id} has been deleted`;
  }
}
