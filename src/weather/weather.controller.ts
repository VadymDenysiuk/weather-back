import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';
import { WeatherResponse } from './interfaces';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Post('')
    async getWeather(@Body() dto: WeatherDto): Promise<WeatherResponse> {
        return this.weatherService.getWeather(dto);
    }
}
