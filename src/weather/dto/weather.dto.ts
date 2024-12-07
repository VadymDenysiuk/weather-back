import { IsString } from 'class-validator';

export class WeatherDto {
    @IsString()
    city: string;
}
