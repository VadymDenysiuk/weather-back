import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { UserModule } from 'src/history/history.module';

@Module({
    controllers: [WeatherController],
    providers: [WeatherService],
    imports: [UserModule],
})
export class WeatherModule {}
