import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
    return {
        database: {
            name: process.env.DATABASE,
            port: process.env.PORT,
        },
        apiKey: process.env.API_KEY,
        postgres: {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
        },
    };
});
