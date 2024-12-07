import { Body, Controller, Post } from '@nestjs/common';
import { HistoryDto } from './dto/history.dto';
import { HistoryService } from './history.service';
import { HistoryDocument } from './models/history.schema';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post('')
    async getHistory(@Body() dto: HistoryDto): Promise<HistoryDocument[]> {
        return this.historyService.getHistory(dto);
    }
}
