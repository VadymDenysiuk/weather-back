import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './models/history.schema';

@Module({
    providers: [HistoryService],
    imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
    exports: [HistoryService],
})
export class UserModule {}
