import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
    return {
        database: {
            name: process.env.DATABASE,
            port: process.env.PORT,
        },
        apiKey: process.env.API_KEY,
    };
});