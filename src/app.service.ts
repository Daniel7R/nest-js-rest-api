import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Client } from "pg";

import config from "./config";

@Injectable()
export class AppService {
    constructor(
        @Inject("TASKS") private tasks,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        @Inject("PG") private clientPg: Client,
    ) {}
    getHello(): string {
        // console.log(this.tasks);
        return `Hola mundo! ${this.configService.apiKey}`;
    }

    getTasks() {
        try {
            return new Promise((resolve, reject) => {
                this.clientPg.query("SELECT * FROM tasks", (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res.rows);
                });
            });
        } catch (e) {
            return new Error(e);
        }
    }
}
