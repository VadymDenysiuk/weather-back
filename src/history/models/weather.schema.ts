import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Weather {
    @Prop({ type: Object })
    coord: {
        lon: number;
        lat: number;
    };

    @Prop({ type: Array })
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];

    @Prop()
    base: string;

    @Prop({ type: Object })
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };

    @Prop()
    visibility: number;

    @Prop({ type: Object })
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };

    @Prop({ type: Object })
    clouds: {
        all: number;
    };

    @Prop()
    dt: number;

    @Prop({ type: Object })
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };

    @Prop()
    timezone: number;

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    cod: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
