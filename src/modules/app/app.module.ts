import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get('mongo_uri'),
                };
            },
        }),
        WeatherModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
