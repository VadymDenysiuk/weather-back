import { IsNumber, IsString } from 'class-validator';

export class HistoryDto {
    @IsString()
    userId: string;

    @IsNumber()
    limit: number;
}
