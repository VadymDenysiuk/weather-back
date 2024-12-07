import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './models/history.schema';
import { IWeather } from 'src/weather/interfaces';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(History.name)
        private userModel: Model<HistoryDocument>,
    ) {}

    async addHistory(userId: string, weather: IWeather): Promise<HistoryDocument[]> {
        const timestamp = new Date();

        const newHistory = {
            user_id: userId,
            weather,
            created_at: timestamp,
        };

        return this.userModel.insertMany([newHistory]);
    }
}
