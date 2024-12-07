export default () => ({
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    weatherApiKey: process.env.WEATHER_API_KEY,
    weatherApiUrl: process.env.WEATHER_API_URL,
    geocodingApiUrl: process.env.GEOCODING_API_URL,
});
