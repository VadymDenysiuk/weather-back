import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Weather } from './weather.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({ collection: 'history' })
export class History {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    user_id: string;

    @Prop()
    weather: Weather;

    @Prop({ default: () => new Date() })
    created_at: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
