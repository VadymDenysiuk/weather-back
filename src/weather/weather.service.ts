import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

    private async getCoordinates(
        city: string,
    ): Promise<{ lat: number; lon: number; name: string }> {
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
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Not Found',
                        message: `City "${city}" not found`,
                        details: { city },
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            return { lat: location.lat, lon: location.lon, name: location.name };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new HttpException(
                    `Failed to fetch coordinates: ${error.response?.data?.message || error.message}`,
                    error.response?.status || HttpStatus.BAD_REQUEST,
                );
            }

            throw new HttpException(`Unexpected error: ${error.message}`, error.status);
        }
    }

    async getWeather(dto: WeatherDto): Promise<IWeather[]> {
        const { city, userId } = dto;

        const { lat, lon, name } = await this.getCoordinates(city);

        try {
            const response = await axios.get<IWeather>(this.weatherApiUrl, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric',
                },
            });

            const updatedData = { ...response.data, city: name };
            await this.historyService.addHistory(userId, updatedData);

            return [updatedData];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new HttpException(
                    `Failed to fetch weather data: ${error.response?.data?.message || error.message}`,
                    error.response?.status || HttpStatus.BAD_REQUEST,
                );
            }

            throw new HttpException(`Unexpected error: ${error.message}`, error.status);
        }
    }
}
