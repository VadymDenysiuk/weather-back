import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { IWeather } from './interfaces';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class WeatherService {
    constructor(
        private readonly configService: ConfigService,
        private readonly historyService: HistoryService,
    ) {}

    private readonly apiKey = this.configService.get('weatherApiKey');
    private readonly weatherApiUrl = this.configService.get('weatherApiUrl');
    private readonly geocodingApiUrl = this.configService.get('geocodingApiUrl');

    private async getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
        try {
            const response = await axios.get(this.geocodingApiUrl, {
                params: {
                    q: city,
                    limit: 1,
                    appid: this.apiKey,
                },
            });

            const [location] = response.data;
            if (!location) {
                throw new Error(`City "${city}" not found`);
            }

            return { lat: location.lat, lon: location.lon };
        } catch (error) {
            throw new Error(`Failed to fetch coordinates: ${error.message}`);
        }
    }

    async getWeather(dto: WeatherDto): Promise<IWeather> {
        const { city, userId } = dto;

        const { lat, lon } = await this.getCoordinates(city);

        try {
            const response = await axios.get<IWeather>(this.weatherApiUrl, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric',
                },
            });

            this.historyService.addHistory(userId, response.data);

            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }
}
